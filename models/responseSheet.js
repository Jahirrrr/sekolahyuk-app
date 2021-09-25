/**
 * @author Zahir Hadi Athallah <contactzsoft@gmail.com>
 * @license MIT
 * @app SekolahYuk
 */


const mongoose = require("mongoose");

const responseSheetSchema = new mongoose.Schema({
  testId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TestPaper",
    required: true,
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },
  ],
  responses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Response",
      required: true,
    },
  ],
  pdf: {
    type: String,
  },
  //True when student submit the test
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

const ResponseSheet = mongoose.model("ResponseSheet", responseSheetSchema);

module.exports = ResponseSheet;
