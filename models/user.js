/**
 * @author Zahir Hadi Athallah <contactzsoft@gmail.com>
 * @license MIT
 * @app SekolahYuk
 */


const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    //admin,teacher or student
    category: {
      type: String,
      required: true,
    },
    teacherPerm: {
      type: Boolean,
      default: false,
    },
    group: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Group",
      },
    ],
    testId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TestPaper",
      },
    ],
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

const User = mongoose.model("User", userSchema);

module.exports = {
  User,
};
