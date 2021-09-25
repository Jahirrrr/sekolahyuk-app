/**
 * @author Zahir Hadi Athallah <contactzsoft@gmail.com>
 * @license MIT
 * @app SekolahYuk
 */

const { Group } = require("../models/group");

const { User } = require("../models/user");
const TestPaper = require("../models/testpaper");
const { validateEditTest, validateCreateTest } = require("./validation");

const createEditTest = async (req, res) => {
  const {
    title,
    category,
    pdf,
    subject,
    duration,
    selectedQuestions,
    isSnapshots,
    isAudioRec,
    startTime,
    paperType,
    groupId,
    maxMarks,
  } = req.body;
  const _id = req.body._id || null;
  if (_id != null) {
    const { error } = validateEditTest(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const paper = await TestPaper.findOneAndUpdate(
      { _id },
      {
        title,
        category,
        pdf,
        questions: selectedQuestions,
        subject,
        duration,
        isSnapshots,
        startTime,
        isAudioRec,
        maxMarks,
      }
    );
    if (!paper) return res.status(404).send("Test tydack adaa");

    res.send("Berhasil diupdate");
  } else {
    const { error } = validateCreateTest(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let paper = new TestPaper({
      title,
      category,
      pdf,
      subject,
      questions: selectedQuestions,
      duration,
      isRegistrationAvailable:
        paperType === "GROUP" || paperType === "TUGAS" ? true : false,
      isSnapshots,
      startTime,
      paperType,
      isAudioRec,
      maxMarks,
    });

    paper = await paper.save();
    if (paperType === "GROUP" || paperType === "TUGAS") {
      const group = await Group.findById(groupId);
      if (!group) return res.status(404).send("Grup tydack ditemukan");
      group.tests.push(paper._id);
      await group.save();
    } else {
      const user = req.user;
      user.testId.push(paper._id);
      await user.save();
    }

    res.send(paper);
  }
};

const getDetailedTest = async (req, res) => {
  const paper = await TestPaper.findById(req.params.id)
    .populate("questions", "questionBody")
    .populate({
      path: "questions",
      populate: {
        path: "options",
        model: Options,
      },
    })
    .select("-pdf");
  if (!paper) res.status(404).send("Test tydack ada");
  res.send(paper);
};

const getTest = async (req, res) => {
  const paper = await TestPaper.findById(req.params.id).select("-pdf");
  if (!paper) res.status(404).send("Test tydack ada");
  res.send(paper);
};

const getAllTests = async (req, res) => {
  const testPaper = await User.findById(req.user._id)
    .select("testId group")
    .populate({
      path: "testId",
      match: {
        isTestConducted: false,
        paperType: { $not: { $regex: "TUGAS" } },
      },
      select: {
        pdf: 0,
      },
      populate: {
        path: "questions",
        populate: {
          path: "options",
        },
      },
    })
    .populate({
      path: "group",
      select: {
        tests: 1,
      },
      populate: {
        path: "tests",
        match: {
          isTestConducted: false,
          paperType: { $not: { $regex: "TUGAS" } },
        },
        select: {
          pdf: 0,
        },
        populate: {
          path: "questions",
          populate: {
            path: "options",
          },
        },
      },
    });

  if (!testPaper) return res.status(404).send("Tests Not Found");

  let organisationtest = testPaper.testId.map((t) => t);

  if (testPaper.group.length) {
    let grouptest = testPaper.group.map((t) => t.tests);
    grouptest = [].concat(...grouptest);
    res.send([...grouptest, ...organisationtest]);
  } else res.send(organisationtest);
};

const getAllAssignments = async (req, res) => {
  const testPaper = await User.findById(req.user._id)
    .select("testId group")
    .populate({
      path: "testId",
      match: {
        isTestConducted: false,
        paperType: { $regex: "TUGAS" },
      },
      select: {
        pdf: 0,
      },
      populate: {
        path: "questions",
        populate: {
          path: "options",
        },
      },
    })

    .populate({
      path: "group",
      select: {
        tests: 1,
      },
      populate: {
        path: "tests",
        match: {
          isTestConducted: false,
          paperType: { $regex: "TUGAS" },
        },
        select: {
          pdf: 0,
        },
        populate: {
          path: "questions",
          populate: {
            path: "options",
          },
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

const getAllTestsConducted = async (req, res) => {
  const testPaper = await User.findById(req.user._id)
    .select("testId group")
    .populate({
      path: "testId",
      match: {
        isTestConducted: true,
        paperType: { $not: { $regex: "TUGAS" } },
      },
      select: {
        pdf: 0,
      },
      populate: {
        path: "questions",
        populate: {
          path: "options",
        },
      },
    })

    .populate({
      path: "group",
      select: {
        tests: 1,
      },
      populate: {
        path: "tests",
        match: {
          isTestConducted: true,
          paperType: { $not: { $regex: "TUGAS" } },
        },
        select: {
          pdf: 0,
        },
        populate: {
          path: "questions",
          populate: {
            path: "options",
          },
        },
      },
    });

  if (!testPaper) return res.status(404).send("Test tydack ada");

  let organisationtest = testPaper.testId.map((t) => t);

  if (testPaper.group.length) {
    let grouptest = testPaper.group.map((t) => t.tests);
    grouptest = [].concat(...grouptest);
    organisationtest = [...grouptest, ...organisationtest];
  }
  //console.log(organisationtest);
  res.send(organisationtest);
};
const getAllAssignmentsConducted = async (req, res) => {
  const testPaper = await User.findById(req.user._id)
    .select("testId group")
    .populate({
      path: "testId",
      match: {
        isTestConducted: true,
        paperType: { $regex: "TUGAS" },
      },
      select: {
        pdf: 0,
      },
      populate: {
        path: "questions",
        populate: {
          path: "options",
        },
      },
    })

    .populate({
      path: "group",
      select: {
        tests: 1,
      },
      populate: {
        path: "tests",
        match: {
          isTestConducted: true,
          paperType: { $regex: "TUGAS" },
        },
        select: {
          pdf: 0,
        },
        populate: {
          path: "questions",
          populate: {
            path: "options",
          },
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

const deleteTest = async (req, res) => {
  const paper = await TestPaper.findById(req.body.id);
  if (!paper) {
    return res.status(404).send("Test tydack ada");
  }
  await paper.remove();
  res.send("Berhasil dihapus");
};

const beginTest = async (req, res) => {
  const paper = await TestPaper.findOneAndUpdate(
    { _id: req.body.id, isTestConducted: false },
    { isTestBegins: true, isRegistrationAvailable: false }
  );
  if (!paper) {
    return res.status(404).send("Gagal untuk memulai test");
  }

  res.send("Test Dimulai");
};

const endTest = async (req, res) => {
  const paper = await TestPaper.findOneAndUpdate(
    { _id: req.body.id, isTestBegins: 1 },
    {
      isTestBegins: false,
      isTestConducted: true,
    }
  );
  if (!paper) {
    return res.status(404).send("Gagal untuk mengakhriri test");
  }

  res.send("Test telah berakhir");
};

const checkTestStart = async (req, res) => {
  const { id } = req.body;
  const paper = await TestPaper.findById(id);
  if (!paper) res.status(404).send("Gagal mengirim");

  res.send(paper.isTestBegins);
};

const changeRegistrationStatus = async (req, res) => {
  const { id, status } = req.body;
  const paper = await TestPaper.findOneAndUpdate(
    {
      _id: id,
      isTestConducted: false,
      isTestBegins: false,
    },
    { isRegistrationAvailable: status }
  );
  if (!paper) {
    return res.status(404).send("Gagal mengganti status pendaftaran");
  }

  res.send("Berhasil mengganti status pendaftaran");
};

const getRegisteredStudents = async (req, res) => {
  const { testId } = req.body;
  const testPaper = await TestPaper.findById(testId).select("paperType");
  if (!testPaper) return res.status(404).send("Gagal Mengirim");

  //console.log(testPaper);
  let data = [];
  if (testPaper.paperType === "GROUP" || testPaper.paperType === "TUGAS") {
    data = await Group.findOne({ tests: { $in: [testId] } })
      .select("students")
      .populate({
        path: "students",
        select: {
          name: 1,
          email: 1,
        },
      });

    res.send(data.students);
  } else {
    data = await User.find({
      category: "STUDENT",
      testId: { $in: [testId] },
    }).select("name email");
    res.send(data);
  }
};

module.exports = {
  getAllAssignmentsConducted,
  getAllAssignments,
  getRegisteredStudents,
  createEditTest,
  getDetailedTest,
  getAllTests,
  deleteTest,
  beginTest,
  checkTestStart,
  changeRegistrationStatus,
  endTest,
  getAllTestsConducted,
  getTest,
};
