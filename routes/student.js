/**
 * @author Zahir Hadi Athallah <contactzsoft@gmail.com>
 * @license MIT
 * @app SekolahYuk
 */


const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const student = require("../services/student");

router.post("/register", student.registerStudent);
router.post("/questions", auth, student.getTestQuestions);
router.post("/responseSheet", auth, student.responseSheet);
router.post("/updateResponse", auth, student.updateResponse);
router.post("/endTest", auth, student.endTest);
router.post("/details", auth, student.getStudent);
router.post("/test/start-time", auth, student.getTestStartTime);
router.post("/test/category", auth, student.getTestCategory);
router.post("/pdf/upload", auth, student.uploadPdfResponse);
router.post("/responseSheet/pdf", auth, student.getResponsePdf);
router.get("/alltest", auth, student.getStudentAllTest);

module.exports = router;
