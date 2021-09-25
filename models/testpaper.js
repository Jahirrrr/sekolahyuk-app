/**
 * @author Zahir Hadi Athallah <contactzsoft@gmail.com>
 * @license MIT
 * @app SekolahYuk
 */


const mongoose = require("mongoose");

const testSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
      },
    ],
    pdf: {
      type: String,
    },
    subject: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    isTestBegins: {
      type: Boolean,

      default: false,
    },

    isRegistrationAvailable: {
      type: Boolean,

      default: false,
    },
    isTestConducted: {
      type: Boolean,

      default: false,
    },

    isSnapshots: {
      type: Boolean,
      default: false,
    },
    paperType: {
      type: String,
      required: true,
    },
    isAudioRec: {
      type: Boolean,
      default: false,
    },
    startTime: {
      type: Date,
      required: true,
    },
    maxMarks: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

const TestPaper = mongoose.model("TestPaper", testSchema);
module.exports = TestPaper;
