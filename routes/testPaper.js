/**
 * @author Zahir Hadi Athallah <contactzsoft@gmail.com>
 * @license MIT
 * @app SekolahYuk
 */


const auth = require("../middleware/auth");
const teacherAuth = require("../middleware/teacherAuth");
const express = require("express");
const router = express.Router();

const test = require("../services/testpaper");

router.post("/create", auth, teacherAuth, test.createEditTest);
router.get("/details/all", auth, teacherAuth, test.getAllTests);
router.get(
  "/assignment/details/all",
  auth,
  teacherAuth,
  test.getAllAssignments
);
router.get(
  "/conducted/details/all",
  auth,
  teacherAuth,
  test.getAllTestsConducted
);
router.get(
  "/assignment/conducted/details/all",
  auth,
  teacherAuth,
  test.getAllAssignmentsConducted
);
router.get("/details/:id", auth, teacherAuth, test.getDetailedTest);
router.get("/get/:id", auth, teacherAuth, test.getTest);
router.post("/delete", auth, teacherAuth, test.deleteTest);
router.post("/begin", auth, teacherAuth, test.beginTest);
router.post("/end", auth, teacherAuth, test.endTest);
router.post("/check-test-start", test.checkTestStart);
router.post(
  "/change-registration-status",
  auth,
  teacherAuth,
  test.changeRegistrationStatus
);
router.post("/students/all", auth, teacherAuth, test.getRegisteredStudents);

module.exports = router;
