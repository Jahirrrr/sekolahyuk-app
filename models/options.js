/**
 * @author Zahir Hadi Athallah <contactzsoft@gmail.com>
 * @license MIT
 * @app SekolahYuk
 */

const mongoose = require("mongoose");
//particular option in a question
const optionSchema = new mongoose.Schema({
  optionBody: {
    type: String,
    required: true,
  },
  isAnswer: {
    type: Boolean,
    default: false,
  },
});
const Options = mongoose.model("Options", optionSchema);
module.exports = Options;
