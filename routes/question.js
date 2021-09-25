/**
 * @author Zahir Hadi Athallah <contactzsoft@gmail.com>
 * @license MIT
 * @app SekolahYuk
 */


const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();
const questions = require("../services/questions");
const teacherAuth = require("../middleware/teacherAuth");

router.post("/create", auth, teacherAuth, questions.createQuestion);
router.get("/details/all", auth, teacherAuth, questions.getAllQuestions);
router.get("/details/:id", auth, teacherAuth, questions.getSingleQuestion);
router.delete("/delete/:id", auth, teacherAuth, questions.deleteQuestion);

module.exports = router;
