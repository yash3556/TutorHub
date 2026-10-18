const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const TeacherProfile = require("../models/TeacherProfile");
const Request = require("../models/Request");
const StudentProfile = require("../models/StudentProfile");
const User = require("../models/User");

const safeUser = (user) => ({
  _id: user._id, fullName: user.fullName, email: user.email, phone: user.phone,
  role: user.role, avatarUrl: user.avatarUrl || "",
  emailVerified: Boolean(user.emailVerified), phoneVerified: Boolean(user.phoneVerified),
});

const publicTeacherProfile = (teacher) => ({
  _id: teacher._id,
  user: teacher.user ? {
    _id: teacher.user._id,
    fullName: teacher.user.fullName,
    avatarUrl: teacher.user.avatarUrl || "",
  } : null,
  availability: { teachingMode: teacher.availability?.teachingMode || "both" },
  bio: teacher.bio || "",
  location: teacher.location || "",
  headline: teacher.headline || "",
  subjects: teacher.subjects || [],
  experienceYears: teacher.experienceYears || 0,
  education: (teacher.education || []).map(({ degree, institution, year }) => ({ degree, institution, year })),
});

const getOrCreateStudentProfile = async (userId) => {
  let profile = await StudentProfile.findOne({ user: userId });
  if (!profile) profile = await StudentProfile.create({ user: userId, classLevel: "Not specified", subjects: [] });
  return profile;
};

exports.getStudentProfile = async (req, res, next) => {
  try {
    const [user, profile] = await Promise.all([
      User.findById(req.user._id).select("fullName email phone role avatarUrl emailVerified phoneVerified"),
      getOrCreateStudentProfile(req.user._id),
    ]);
    return res.json({ user: safeUser(user), profile });
  } catch (error) { next(error); }
};

exports.updateStudentInfo = async (req, res, next) => {
  try {
    const { fullName, email, phone, classLevel, board, subjects, bio, location, preferredTeachingMode, budget, seekingTutorFor, availability, preferences } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "Your account could not be found." });
    if (fullName !== undefined) {
      if (!String(fullName).trim()) return res.status(400).json({ message: "Full name is required." });
      user.fullName = String(fullName).trim().slice(0, 120);
    }
    if (phone !== undefined) {
      if (!String(phone).trim()) return res.status(400).json({ message: "Phone number is required." });
      user.phone = String(phone).trim().slice(0, 30);
    }
    if (email !== undefined) {
      const normalizedEmail = String(email).trim().toLowerCase();
      if (!/^\S+@\S+\.\S+$/.test(normalizedEmail)) return res.status(400).json({ message: "Enter a valid email address." });
      const existing = await User.findOne({ email: normalizedEmail, _id: { $ne: user._id } }).select("_id");
      if (existing) return res.status(409).json({ message: "That email address is already in use." });
      user.email = normalizedEmail;
    }
    await user.save();
    const profile = await getOrCreateStudentProfile(user._id);
    if (classLevel !== undefined) profile.classLevel = String(classLevel).trim().slice(0, 80);
    if (board !== undefined && ["CBSE", "ICSE", "State Board", "IB", "University"].includes(board)) profile.board = board;
    if (Array.isArray(subjects)) profile.subjects = [...new Set(subjects.map((item) => String(item).trim()).filter(Boolean))].slice(0, 15);
    for (const [key, max] of [["bio", 2000], ["location", 180], ["availability", 180]]) if (req.body[key] !== undefined) profile[key] = String(req.body[key] || "").trim().slice(0, max);
    if (preferredTeachingMode && ["online", "offline", "both"].includes(preferredTeachingMode)) profile.preferredTeachingMode = preferredTeachingMode;
    if (seekingTutorFor) profile.seekingTutorFor = seekingTutorFor;
    if (budget !== undefined && Number.isFinite(Number(budget)) && Number(budget) >= 0) profile.budget = Number(budget);
    if (preferences) {
      profile.preferences = profile.preferences || {};
      profile.preferences.notifications = { ...(profile.preferences.notifications?.toObject?.() || profile.preferences.notifications), ...(preferences.notifications || {}) };
      profile.preferences.privacy = { ...(profile.preferences.privacy?.toObject?.() || profile.preferences.privacy), ...(preferences.privacy || {}) };
    }
    await profile.save();
    return res.json({ message: "Student profile saved successfully.", user: safeUser(user), profile });
  } catch (error) { next(error); }
};

exports.updateStudentAvatar = async (req, res, next) => {
  try {
    const avatarData = String(req.body?.avatarData || "");
    const match = avatarData.match(/^data:image\/(png|jpeg|webp);base64,([A-Za-z0-9+/=]+)$/i);
    if (!match) return res.status(400).json({ message: "Upload a PNG, JPG, or WEBP image." });
    if (Buffer.byteLength(match[2], "base64") > 2 * 1024 * 1024) return res.status(400).json({ message: "Profile photo must be 2 MB or smaller." });
    const user = await User.findByIdAndUpdate(req.user._id, { avatarUrl: avatarData }, { new: true }).select("fullName email phone role avatarUrl emailVerified phoneVerified");
    return res.json({ message: "Profile photo updated.", user: safeUser(user) });
  } catch (error) { next(error); }
};

exports.updateStudentPassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id);
    if (!user || !currentPassword || !newPassword) return res.status(400).json({ message: "Current and new passwords are required." });
    if (newPassword.length < 6) return res.status(400).json({ message: "New password must be at least 6 characters." });
    if (!(await bcrypt.compare(currentPassword, user.password))) return res.status(400).json({ message: "Current password is incorrect." });
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    return res.json({ message: "Password updated successfully." });
  } catch (error) { next(error); }
};

exports.deleteStudentAccount = async (req, res, next) => {
  try {
    await Promise.all([StudentProfile.deleteOne({ user: req.user._id }), Request.deleteMany({ student: req.user._id }), User.deleteOne({ _id: req.user._id })]);
    return res.json({ message: "Student account deleted." });
  } catch (error) { next(error); }
};

exports.getAvailableTeachers = async (req, res, next) => {
  try {
    const { subject, teachingMode, search, page = 1, limit = 10 } = req.query;
    const pageNum = Math.max(parseInt(page, 10) || 1, 1);
    const pageSize = Math.min(Math.max(parseInt(limit, 10) || 10, 1), 50);
    const visibilityFilter = {
      $or: [
        { "preferences.privacy.visibility": { $in: ["public", "students"] } },
        { "preferences.privacy.visibility": { $exists: false } },
      ],
    };
    const filter = { $and: [visibilityFilter] };

    if (subject?.trim()) {
      filter.subjects = { $regex: String(subject).trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), $options: "i" };
    }
    if (teachingMode) filter["availability.teachingMode"] = { $in: [teachingMode, "both"] };
    if (search?.trim()) {
      const expression = new RegExp(String(search).trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
      filter.$and.push({ $or: [{ headline: expression }, { bio: expression }, { location: expression }, { subjects: expression }] });
    }

    const [teachers, total] = await Promise.all([
      TeacherProfile.find(filter)
        .select("_id user availability.teachingMode bio location headline subjects experienceYears education")
        .populate("user", "fullName avatarUrl")
        .sort({ createdAt: -1 })
        .skip((pageNum - 1) * pageSize)
        .limit(pageSize)
        .lean(),
      TeacherProfile.countDocuments(filter),
    ]);

    return res.json({ message: "Available tutors fetched.", teachers: teachers.map(publicTeacherProfile), total, page: pageNum, totalPages: Math.ceil(total / pageSize) });
  } catch (error) {
    next(error);
  }
};

exports.getTeacherDetails = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(404).json({ message: "Tutor not found." });
    const teacher = await TeacherProfile.findOne({
      _id: req.params.id,
      $or: [
        { "preferences.privacy.visibility": { $in: ["public", "students"] } },
        { "preferences.privacy.visibility": { $exists: false } },
      ],
    })
      .select("_id user availability.teachingMode bio location headline subjects experienceYears education")
      .populate("user", "fullName avatarUrl")
      .lean();
    if (!teacher) return res.status(404).json({ message: "Tutor not found." });
    return res.json({ teacher: publicTeacherProfile(teacher) });
  } catch (error) {
    next(error);
  }
};

exports.getStudentRequests = async (req, res, next) => {
  try {
    const requests = await Request.find({ student: req.user._id })
      .populate("teacher", "fullName avatarUrl")
      .sort({ createdAt: -1 })
      .lean();
    return res.json({ message: "Student requests fetched.", requests });
  } catch (error) {
    next(error);
  }
};