/**
 * @author Zahir Hadi Athallah <contactzsoft@gmail.com>
 * @license MIT
 * @app SekolahYuk
 */


const express = require("express");
const router = express.Router();
const snapshots = require("../services/snapshots");
const teacherAuth = require("../middleware/teacherAuth");
const auth = require("../middleware/auth");

router.post("/upload", auth, snapshots.uploadImage);
router.post("/get/all", auth, teacherAuth, snapshots.getImages);

module.exports = router;
