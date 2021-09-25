/**
 * @author Zahir Hadi Athallah <contactzsoft@gmail.com>
 * @license MIT
 * @app SekolahYuk
 */


const Question = require("../models/question");
const Options = require("../models/options");

const { validateQuestionCreate } = require("./validation");

const createQuestion = async (req, res) => {
  const { error } = validateQuestionCreate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const {
    questionBody,
    options: option,
    subject,
    weightage,
    explaination,
  } = req.body;

  const op = await Options.insertMany(option);

  const rightAnswers = [];

  op.map((o) => {
    if (o.isAnswer) rightAnswers.push(o._id);
  });
  let data = new Question({
    questionBody,
    explaination,
    subject,
    options: op,
    createdBy: req.user._id,
    weightage,
    rightAnswers,
  });
  data = await data.save();
  res.send(data);
};

const deleteQuestion = async (req, res) => {
  const ques = await Question.findOneAndUpdate(
    { _id: req.params.id, isDeleted: false },
    { isDeleted: true }
  );
  if (!ques) {
    return res.status(404).send("Pertanyaan tydack ada");
  }

  res.send("Berhasil dihapus");
};

const getAllQuestions = async (req, res) => {
  const allques = await Question.find({
    createdBy: req.user._id,
    isDeleted: false,
  })
    .populate("options")
    .sort("-createdAt")
    .select("-createdAt");
  res.send(allques);
};

const getSingleQuestion = async (req, res) => {
  const ques = await Question.find({
    _id: req.params.id,
    isDeleted: false,
  }).populate("options");

  if (!ques) {
    return res.status(404).send("Pertanyaan tydack dapat ditemukan");
  }
  res.send(ques);
};

module.exports = {
  createQuestion,
  deleteQuestion,
  getAllQuestions,
  getSingleQuestion,
};
