/**
 * @author Zahir Hadi Athallah <contactzsoft@gmail.com>
 * @license MIT
 * @app SekolahYuk
 */


const express = require("express");
const auth = require("../middleware/auth");
const teacherAuth = require("../middleware/teacherAuth");
const {
  createGroup,
  getAllGroup,
  joinGroup,
  getStudentsDidalamGroup,
  getTestPaperDidalamGroup,
} = require("../services/group");

const router = express.Router();

router.get("/allgroup", auth, getAllGroup);
router.post("/create-group", auth, teacherAuth, createGroup);
router.post("/join-group", auth, joinGroup);
router.post("/students", auth, getStudentsDidalamGroup);
router.post("/tests", auth, getTestPaperDidalamGroup);

module.exports = router;
