/**
 * @author Zahir Hadi Athallah <contactzsoft@gmail.com>
 * @license MIT
 * @app SekolahYuk
 */


const mongoose = require("mongoose");

const subResultSchema = new mongoose.Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    required: true,
  },
  correctAnswer: {
    type: Array,
    required: true,
  },
  response: {
    type: Array,
    required: true,
  },
  explaination: {
    type: String,

    default: "tydack ada penjelasan",
  },
  weightage: {
    type: Number,
    required: true,
  },
  isCorrect: {
    type: Boolean,
    required: true,
  },
});

const SubResult = mongoose.model("SubResult", subResultSchema);
module.exports = SubResult;
