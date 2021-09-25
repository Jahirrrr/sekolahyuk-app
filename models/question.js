
/**
 * @author Zahir Hadi Athallah <contactzsoft@gmail.com>
 * @license MIT
 * @app SekolahYuk
 */


const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    questionBody: {
      type: String,
      required: true,
    },
    options: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Options",
        required: true,
      },
    ],
    subject: {
      type: String,
      required: true,
    },
    weightage: {
      type: Number,
      default: 1,
    },
    explaination: {
      type: String,
      default: "No explaination given",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
