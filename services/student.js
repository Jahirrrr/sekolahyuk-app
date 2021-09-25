/**
 * @author Zahir Hadi Athallah <contactzsoft@gmail.com>
 * @license MIT
 * @app SekolahYuk
 */


const { User } = require("../models/user");
const TestPaper = require("../models/testpaper");
const { sendMail } = require("./sendMail");
const ResponseSheet = require("../models/responseSheet");
const Response = require("../models/response");
const { validateStudent } = require("./validation");
const bcrypt = require("bcrypt");

const registerStudent = async (req, res) => {
  const { error } = validateStudent(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { email, password, link, testId } = req.body;

  const paper = await TestPaper.findOne({
    _id: testId,
    isRegistrationAvailable: true,
  });

  //console.log(paper);
  if (!paper)
    return res.status(422).send("Pendaftaran untuk test ini sudah ditutup");

  let student = await User.findOne({ email });
  if (!student) return res.status(401).send("Email dan sandi tydack valid");

  const validPassword = await bcrypt.compare(password, student.password);
  if (!validPassword) return res.status(401).send("Email dan sandi tydack valid");

  const check = await User.find({ email, testId: { $in: [testId] } });

  if (check.length !== 0)
    return res.status(422).send("Murid sudah pernah mendaftar");
  student.testId.push(testId);
  await student.save();

  sendMail(
    email,
    "Pendaftaran Berhasil",
    `Kamu telah berhasil terdaftar untuk melakukan test, test dimulai pada ${paper.startTime} dan mempunyai durasi ${paper.duration} menit<br><br>
     Klik tautan ini untuk masuk ke test  "${link}student/test?testid=${testId}&studentid=${student._id}"`
  );
  res.send("Berhasil terdaftar, periksa email Anda");
};

const getTestQuestions = async (req, res) => {
  const paper = await TestPaper.findById(req.body.id)
    .select(
      "pdf maxMarks questions duration isSnapshots startTime isAudioRec category"
    )
    .populate("questions")
    .populate({
      path: "questions",
      populate: {
        path: "options",

        select: {
          optionBody: 1,
        },
      },
    });

  if (!paper) return res.status(404).send("Test tydack ditemukan");
  res.send(paper);
};

const getStudent = async (req, res) => {
  const student = await User.findById(req.body.id);
  if (!student) return res.status(404).send("Murid tydack adaa");

  res.send(student);
};

const responseSheet = async (req, res) => {
  const { studentId, testId } = req.body;

  const student = await User.findOne({ _id: studentId });
  const paper = await TestPaper.findOne({
    _id: testId,
    isTestBegins: true,
    isTestConducted: false,
  });

  if (!student || !paper) return res.status(404).send("Request tydack valid");

  let responseSheet = await ResponseSheet.findOne({ studentId, testId })
    .select("responses")
    .populate({
      path: "responses",
      select: {
        chosenOption: 1,
      },
    });

  if (responseSheet) return res.send(responseSheet);
  let responses = null;
  let questions = null,
    pdf = null;
  if (paper.category === "PILIHANGANDA") {
    questions = paper.questions;

    responses = questions.map((id) => {
      return {
        questionId: id,
        chosenOption: [],
        studentId,
        testId,
      };
    });
    responses = await Response.insertMany(responses);
  }

  responseSheet = new ResponseSheet({
    testId,
    studentId,
    questions,
    responses,
    pdf,
  });
  await responseSheet.save();
  res.send("Test Dimulai");
};

const updateResponse = async (req, res) => {
  const { testId, studentId, questionId, chosenOption } = req.body;
  const paper = await TestPaper.findById(testId);
  const responseSheet = await ResponseSheet.findOne({
    testId,
    studentId,
    isCompleted: false,
  });

  if (!paper || !responseSheet) return res.status(404).send("Request tydack valid");

  const response = await Response.findOneAndUpdate(
    { questionId, studentId, testId },
    { chosenOption }
  );

  if (!response) return res.status(404).send("Pertanyaan tydack ada");

  res.send("Respon diupdate");
};

const endTest = async (req, res) => {
  const { testId, studentId } = req.body;
  const responseSheet = await ResponseSheet.findOneAndUpdate(
    { testId, studentId },
    { isCompleted: true }
  );
  if (!responseSheet) return res.status(404).send("Gagal untuk mengirim");
  res.send("Test Telah Terkirim, Silakan Beristirahat Dengan Tenang");
};

const getTestStartTime = async (req, res) => {
  //console.log(req.body.testId);
  const { testId } = req.body;
  const paper = await TestPaper.findById(testId).select("startTime");
  if (!paper) return res.status(404).send("Test tydack ditemukan");

  //console.log(paper);
  res.send(paper);
};

const getTestCategory = async (req, res) => {
  const { testId } = req.body;
  const paper = await TestPaper.findById(testId).select("category");
  if (!paper) return res.status(404).send("Test tydack ditemukan");

  res.send(paper.category);
};

const uploadPdfResponse = async (req, res) => {
  const { studentId, testId, pdf } = req.body;
  const student = await User.findOne({ _id: studentId });
  const paper = await TestPaper.findOne({
    _id: testId,
    isTestBegins: true,
    isTestConducted: false,
  });

  if (!student || !paper) return res.status(404).send("Request tydack valid");

  const responseSheet = await ResponseSheet.findOneAndUpdate(
    { testId, studentId },
    { pdf }
  );
  if (!responseSheet) return res.status(404).send("ResponseSheet tydack adaa");
  res.send("Respon diupdate");
};

const getResponsePdf = async (req, res) => {
  const { studentId, testId } = req.body;
  const responseSheet = await ResponseSheet.findOne({ studentId, testId });
  if (!responseSheet) return res.send("Not Attempt");

  res.send(responseSheet.pdf);
};

const getStudentAllTest = async (req, res) => {
  //Retreive all organization tests and group tests
  const testPaper = await User.findById(req.user._id)
    .select("testId group")
    .populate({
      path: "testId",
      select: {
        isTestConducted: 1,
        title: 1,
        duration: 1,
        category: 1,
        paperType: 1,
        startTime: 1,
        subject: 1,
      },
    })
    .populate({
      path: "group",
      select: {
        tests: 1,
      },
      populate: {
        path: "tests",
        select: {
          isTestConducted: 1,
          title: 1,
          duration: 1,
          category: 1,
          paperType: 1,
          startTime: 1,
          subject: 1,
        },
      },
    });
  if (!testPaper) return res.status(404).send("Test tydack ditemukan");

  let organisationtest = testPaper.testId.map((t) => t);

  if (testPaper.group.length) {
    let grouptest = testPaper.group.map((t) => t.tests);
    grouptest = [].concat(...grouptest);
    res.send([...grouptest, ...organisationtest]);
  } else res.send(organisationtest);
};

module.exports = {
  getResponsePdf,
  uploadPdfResponse,
  getTestCategory,
  getTestStartTime,
  updateResponse,
  endTest,
  responseSheet,
  getStudent,
  registerStudent,
  getTestQuestions,
  getStudentAllTest,
};
