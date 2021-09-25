/**
 * @author Zahir Hadi Athallah <contactzsoft@gmail.com>
 * @license MIT
 * @app SekolahYuk
 */


const express = require("express");
const router = express.Router();
const audio = require("../services/audio");
const teacherAuth = require("../middleware/teacherAuth");
const auth = require("../middleware/auth");

router.post("/upload", auth, audio.uploadAudio);
router.post("/get/all", auth, teacherAuth, audio.getAudio);

module.exports = router;
