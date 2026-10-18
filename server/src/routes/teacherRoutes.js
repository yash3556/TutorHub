const express = require("express");
const {
  getProfileSettings,
  updateAvailability,
  updateBankDetails,
  getAvailableStudents,
  updateTeacherInfo,
  getDashboardStats,
  updateAvatar,
  updateVerification,
  updatePassword,
  deleteTeacherAccount,
  getStudentDetails,
} = require("../controllers/teacherController");
const {
  getTeacherRequests,
  getRequestDetails,
  updateRequestStatus,
  getRequestStats,
} = require("../controllers/requestController");
const {
  getTeacherReviews,
  getReviewDetails,
  getReviewStats,
} = require("../controllers/reviewController");
const { requireTeacher } = require("../middleware/authMiddleware");

const router = express.Router();

// Profile routes
router.get("/profile", requireTeacher, getProfileSettings);
router.put("/profile/availability", requireTeacher, updateAvailability);
router.put("/profile/bank-details", requireTeacher, updateBankDetails);
router.put("/profile/info", requireTeacher, updateTeacherInfo);
router.post("/profile/avatar", requireTeacher, updateAvatar);
router.put("/profile/verification", requireTeacher, updateVerification);
router.put("/profile/password", requireTeacher, updatePassword);
router.delete("/profile", requireTeacher, deleteTeacherAccount);

// Students routes
router.get("/students", requireTeacher, getAvailableStudents);
router.get("/students/:id", requireTeacher, getStudentDetails);

// Requests routes
router.get("/requests", requireTeacher, getTeacherRequests);
router.get("/requests/:id", requireTeacher, getRequestDetails);
router.put("/requests/:id", requireTeacher, updateRequestStatus);
router.get("/requests-stats", requireTeacher, getRequestStats);

// Reviews routes
router.get("/reviews", requireTeacher, getTeacherReviews);
router.get("/reviews/:id", requireTeacher, getReviewDetails);
router.get("/reviews-stats", requireTeacher, getReviewStats);

// Dashboard stats
router.get("/dashboard-stats", requireTeacher, getDashboardStats);

module.exports = router;
