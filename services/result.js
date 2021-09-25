/**
 * @author Zahir Hadi Athallah <contactzsoft@gmail.com>
 * @license MIT
 * @app SekolahYuk
 */


const ResponseSheet = require("../models/responseSheet");
const Result = require("../models/result");
const SubResult = require("../models/subResult");
const TestPaper = require("../models/testpaper");
const { generateExcel } = require("./generateExcel");
const generateResult = async (req, res) => {
  const { studentId, testId } = req.body;

  const result = await Result.findOne({ testId, studentId }).populate(
    "subResult"
  );
  if (result) return res.send(result);

  const responseSheet = await ResponseSheet.findOne({
    studentId,
    testId,
    isCompleted: true,
  })
    .populate("questions responses")
    .populate({
      path: "questions",
      populate: {
        path: "options",
      },
    });

  if (!responseSheet) return res.send("Not Attempt");
  const ansMap = ["A", "B", "C", "D", "E"];
  const { questions, responses } = responseSheet;

  let score = 0;
  const subResults = questions.map((q, i) => {
    const res = responses[i].chosenOption;
    const jawabanBenar = [];
    const response = [];
    q.options.map((o, j) => {
      if (o.isAnswer) {
        jawabanBenar.push(ansMap[j]);
      }
      for (let k = 0; k < res.length; ++k) {
        if (String(res[k]) === String(o._id)) {
          response.push(ansMap[j]);
        }
      }
    });
    const l1 = jawabanBenar.length;
    const l2 = response.length;
    let isCorrect = false;
    if (l1 === l2) {
      let count = 0;
      for (const p of jawabanBenar) {
        for (const q of response) {
          if (p === q) {
            count++;
            break;
          }
        }
      }
      if (count === l1) {
        isCorrect = true;
        score += q.weightage;
      }
    }
    const subresult = {
      questionId: q._id,
      weightage: q.weightage,
      jawabanBenar,
      response,
      explaination: q.explaination,
      isCorrect,
    };
    return subresult;
  });
  const subResult = await SubResult.insertMany(subResults);
  const resultdata = new Result({
    testId,
    studentId,
    responseSheet,
    subResult,
    score,
  });
  await resultdata.save();
  res.send(resultdata);
};

const dapatkanStudentResults = async (req, res) => {
  const { studentId } = req.body;

  const results = await Result.find({ studentId })
    .select("score testId")
    .populate({
      path: "testId",
      select: {
        title: 1,
        subject: 1,
        paperType: 1,
        startTime: 1,
        maxMarks: 1,
      },
    });

  res.send(results);
};

const hasilkanPdf = async (req, res) => {
  const { studentId, testId } = req.body;

  const result = await Result.findOne({ testId, studentId });
  if (result) return res.send(result);
  const responseSheet = null;
  const subResult = [];
  const score = -1;

  const resultdata = new Result({
    testId,
    studentId,
    responseSheet,
    subResult,
    score,
  });
  await resultdata.save();
};

const dapatkanScore = async (req, res) => {
  const { testId } = req.body;
  const result = await Result.find({ testId }).select(
    "score studentId maxMarks"
  );

  res.send(result);
};

const ubahScore = async (req, res) => {
  const { testId, studentId, score } = req.body;
  const result = await Result.findOneAndUpdate(
    { testId, studentId },
    { score }
  );
  if (!result) return res.status(404).send("Hasil tydack ditemukan");
  res.send("Berhasil diubah");
};

const download = async (req, res) => {
  const { testId } = req.body;

  const paper = await TestPaper.find({ _id: testId, isTestConducted: true });
  if (!paper) return res.status(404).send("tydack ditemukan");

  const workbook = await generateExcel(testId);

  var buff = await workbook.xlsx.writeBuffer();
  const str = buff.toString("base64");

  res.send(str);
};

const getPeringkat = async (req, res) => {
  const { testId } = req.body;
  const peringkaT = await Result.find({ testId })
    .select("studentId score")
    .sort("-score")
    .populate({
      path: "studentId",
      select: {
        name: 1,
        email: 1,
      },
    });

  res.send(peringkaT);
};

module.exports = {
  download,
  generateResult,
  hasilkanPdf,
  dapatkanStudentResults,
  dapatkanScore,
  ubahScore,
  getPeringkat,
};
