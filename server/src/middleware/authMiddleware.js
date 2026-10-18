const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.requireTeacher = async (req, res, next) => {
  try {
    const token = req.cookies?.token || req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ message: "Please log in to manage your profile." });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.id).select("fullName email phone role avatarUrl emailVerified phoneVerified");

    if (!user || user.role !== "teacher") {
      return res.status(403).json({ message: "Teacher access is required." });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Your session has expired. Please log in again." });
  }
};

exports.requireStudent = async (req, res, next) => {
  try {
    const token = req.cookies?.token || req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ message: "Please log in to find a tutor." });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.id).select("fullName email phone role avatarUrl emailVerified phoneVerified");

    if (!user || user.role !== "student") {
      return res.status(403).json({ message: "Student access is required." });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Your session has expired. Please log in again." });
  }
};
