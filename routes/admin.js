/**
 * @author Zahir Hadi Athallah <contactzsoft@gmail.com>
 * @license MIT
 * @app SekolahYuk
 */


const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const adminAuth = require("../middleware/adminAuth");
const admin = require("../services/admin");

router.get("/auth/details/all", auth, adminAuth, admin.getAllAuthTeacher);
router.get("/request/details/all", auth, adminAuth, admin.getAllReqTeacher);
router.delete("/remove/:id", auth, adminAuth, admin.removeTeacher);
router.post("/change/permission", auth, adminAuth, admin.updateTeacherPerm);
router.delete("/delete/media", auth, adminAuth, admin.deleteMedia);

module.exports = router;
