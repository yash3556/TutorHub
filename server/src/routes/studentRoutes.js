const express = require("express");
const { getAvailableTeachers, getTeacherDetails, getStudentRequests, getStudentProfile, updateStudentInfo, updateStudentAvatar, updateStudentPassword, deleteStudentAccount } = require("../controllers/studentController");
const { requireStudent } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/teachers", requireStudent, getAvailableTeachers);
router.get("/teachers/:id", requireStudent, getTeacherDetails);
router.get("/requests", requireStudent, getStudentRequests);
router.get("/profile", requireStudent, getStudentProfile);
router.put("/profile/info", requireStudent, updateStudentInfo);
router.post("/profile/avatar", requireStudent, updateStudentAvatar);
router.put("/profile/password", requireStudent, updateStudentPassword);
router.delete("/profile", requireStudent, deleteStudentAccount);

module.exports = router;