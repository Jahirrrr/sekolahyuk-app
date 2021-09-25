/**
 * @author Zahir Hadi Athallah <contactzsoft@gmail.com>
 * @license MIT
 * @app SekolahYuk
 */


const express = require("express");
const router = express.Router();
const result = require("../services/result");
const auth = require("../middleware/auth");
const teacherAuth = require("../middleware/teacherAuth");

router.post("/generateresult", auth, result.generateResult);
router.post("/generateresult/pdf", auth, result.hasilkanPdf);
router.post("/all/score", auth, result.dapatkanScore);
router.post("/edit/score", auth, teacherAuth, result.ubahScore);
router.post("/student/all", auth, result.dapatkanStudentResults);
router.post("/students/rank", auth, result.getPeringkat);
router.post("/download", auth, teacherAuth, result.download);

module.exports = router;
