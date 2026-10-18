const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const TeacherProfile = require("../models/TeacherProfile");
const StudentProfile = require("../models/StudentProfile");
const Request = require("../models/Request");
const Review = require("../models/Review");
const User = require("../models/User");

const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const defaultAvailability = () => ({
  timezone: "Asia/Kolkata",
  teachingMode: "both",
  weeklySchedule: weekDays.map((day) => ({ day, enabled: false, slots: [] })),
});

const getOrCreateProfile = async (userId) => {
  let profile = await TeacherProfile.findOne({ user: userId });
  if (!profile) profile = await TeacherProfile.create({ user: userId, availability: defaultAvailability() });
  return profile;
};

const safeUser = (user) => ({
  _id: user._id,
  fullName: user.fullName,
  email: user.email,
  phone: user.phone,
  role: user.role,
  avatarUrl: user.avatarUrl || "",
  emailVerified: Boolean(user.emailVerified),
  phoneVerified: Boolean(user.phoneVerified),
});

const cleanStringArray = (value, maxItems = 15) => Array.isArray(value)
  ? [...new Set(value.map((item) => String(item || "").trim()).filter(Boolean))].slice(0, maxItems)
  : undefined;

const normalizeEducation = (value) => {
  if (!Array.isArray(value)) return undefined;
  return value.slice(0, 10).map((entry) => ({
    degree: String(entry?.degree || "").trim().slice(0, 120),
    institution: String(entry?.institution || "").trim().slice(0, 160),
    year: String(entry?.year || "").trim().slice(0, 12),
  })).filter((entry) => entry.degree || entry.institution || entry.year);
};

exports.getProfileSettings = async (req, res, next) => {
  try {
    const [user, profile] = await Promise.all([
      User.findById(req.user._id).select("fullName email phone role avatarUrl emailVerified phoneVerified"),
      getOrCreateProfile(req.user._id),
    ]);
    return res.json({ user: safeUser(user), profile });
  } catch (error) {
    next(error);
  }
};

exports.updateTeacherInfo = async (req, res, next) => {
  try {
    const { fullName, email, phone, bio, location, headline, subjects, experienceYears, education, preferences } = req.body;
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
      if (user.email !== normalizedEmail) user.emailVerified = false;
      user.email = normalizedEmail;
    }
    await user.save();

    const profile = await getOrCreateProfile(user._id);
    if (bio !== undefined) profile.bio = String(bio || "").trim().slice(0, 2000);
    if (location !== undefined) profile.location = String(location || "").trim().slice(0, 180);
    if (headline !== undefined) profile.headline = String(headline || "").trim().slice(0, 160);
    const cleanedSubjects = cleanStringArray(subjects);
    if (cleanedSubjects) profile.subjects = cleanedSubjects;
    if (experienceYears !== undefined) {
      const years = Number(experienceYears);
      if (!Number.isFinite(years) || years < 0 || years > 100) return res.status(400).json({ message: "Experience must be between 0 and 100 years." });
      profile.experienceYears = years;
    }
    const cleanedEducation = normalizeEducation(education);
    if (cleanedEducation) profile.education = cleanedEducation;
    if (preferences !== undefined) {
      if (!profile.preferences) profile.preferences = {};
      if (!profile.preferences.notifications) profile.preferences.notifications = {};
      if (!profile.preferences.privacy) profile.preferences.privacy = {};
      const { notifications, privacy } = preferences || {};
      if (notifications) for (const key of ["requests", "messages", "reminders", "promotions"]) if (typeof notifications[key] === "boolean") profile.preferences.notifications[key] = notifications[key];
      if (privacy) {
        for (const key of ["showPhone", "showEmail"]) if (typeof privacy[key] === "boolean") profile.preferences.privacy[key] = privacy[key];
        if (privacy.visibility !== undefined) {
          if (!["public", "students", "private"].includes(privacy.visibility)) return res.status(400).json({ message: "Choose a valid profile visibility." });
          profile.preferences.privacy.visibility = privacy.visibility;
        }
      }
    }
    await profile.save();
    return res.json({ message: "Profile saved successfully.", user: safeUser(user), profile });
  } catch (error) {
    next(error);
  }
};

exports.updateAvatar = async (req, res, next) => {
  try {
    const avatarData = String(req.body?.avatarData || "");
    const match = avatarData.match(/^data:image\/(png|jpeg|webp);base64,([A-Za-z0-9+/=]+)$/i);
    if (!match) return res.status(400).json({ message: "Upload a PNG, JPG, or WEBP image." });
    if (Buffer.byteLength(match[2], "base64") > 2 * 1024 * 1024) return res.status(400).json({ message: "Profile photo must be 2 MB or smaller." });
    const user = await User.findByIdAndUpdate(req.user._id, { avatarUrl: avatarData }, { new: true, runValidators: true }).select("fullName email phone role avatarUrl emailVerified phoneVerified");
    return res.json({ message: "Profile photo updated.", user: safeUser(user) });
  } catch (error) {
    next(error);
  }
};

exports.updateAvailability = async (req, res, next) => {
  try {
    const { timezone, teachingMode, weeklySchedule } = req.body;
    if (!Array.isArray(weeklySchedule) || weeklySchedule.length !== 7) return res.status(400).json({ message: "Availability must include all seven days." });
    const hasExpectedDays = weekDays.every((day) => weeklySchedule.some((entry) => entry.day === day));
    const slotsAreValid = weeklySchedule.every((entry) => typeof entry.enabled === "boolean" && Array.isArray(entry.slots) && entry.slots.every((slot) => /^([01]\d|2[0-3]):[0-5]\d$/.test(slot.start) && /^([01]\d|2[0-3]):[0-5]\d$/.test(slot.end) && slot.start < slot.end));
    if (!hasExpectedDays || !slotsAreValid || !["online", "offline", "both"].includes(teachingMode)) return res.status(400).json({ message: "Please provide valid availability details." });
    const profile = await getOrCreateProfile(req.user._id);
    profile.availability = { timezone: timezone || "Asia/Kolkata", teachingMode, weeklySchedule };
    await profile.save();
    return res.json({ message: "Availability saved successfully.", availability: profile.availability });
  } catch (error) {
    next(error);
  }
};

exports.updateBankDetails = async (req, res, next) => {
  try {
    const { accountHolderName, bankName, accountNumber, ifscCode, accountType, upiId } = req.body;
    const cleanedAccountNumber = String(accountNumber || "").replace(/[\s-]/g, "");
    const cleanedIfsc = String(ifscCode || "").trim().toUpperCase();
    if (!accountHolderName?.trim() || !bankName?.trim() || !/^\d{9,18}$/.test(cleanedAccountNumber)) return res.status(400).json({ message: "Enter a valid account holder, bank, and account number." });
    if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(cleanedIfsc)) return res.status(400).json({ message: "Enter a valid 11-character IFSC code." });
    if (!["savings", "current"].includes(accountType)) return res.status(400).json({ message: "Choose a valid account type." });
    const profile = await getOrCreateProfile(req.user._id);
    profile.bankDetails = { accountHolderName: accountHolderName.trim(), bankName: bankName.trim(), accountNumber: cleanedAccountNumber, ifscCode: cleanedIfsc, accountType, upiId: String(upiId || "").trim().toLowerCase() };
    await profile.save();
    return res.json({ message: "Bank details saved successfully.", bankDetails: profile.bankDetails });
  } catch (error) {
    next(error);
  }
};

exports.updateVerification = async (req, res, next) => {
  try {
    const { identity, address } = req.body || {};
    const profile = await getOrCreateProfile(req.user._id);
    if (!profile.verification) profile.verification = {};
    const updateDocument = (kind, data) => {
      if (!data) return null;
      if (!profile.verification[kind]) profile.verification[kind] = { status: "not_submitted", documentType: "", documentNumber: "" };
      const documentType = String(data.documentType || "").trim();
      const documentNumber = String(data.documentNumber || "").trim();
      if (!documentType || !documentNumber) return "Select a document type and enter its number.";
      if (documentNumber.length < 4 || documentNumber.length > 50) return "Enter a valid document number.";
      if (profile.verification[kind].status !== "verified") profile.verification[kind] = { documentType, documentNumber, status: "pending", submittedAt: new Date() };
      return null;
    };
    const validationError = updateDocument("identity", identity) || updateDocument("address", address);
    if (validationError) return res.status(400).json({ message: validationError });
    if (!identity && !address) return res.status(400).json({ message: "Submit identity or address verification details." });
    await profile.save();
    return res.json({ message: "Verification details submitted for review.", verification: profile.verification });
  } catch (error) {
    next(error);
  }
};

exports.updatePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body || {};
    if (!currentPassword || !newPassword) return res.status(400).json({ message: "Enter your current and new password." });
    if (String(newPassword).length < 6) return res.status(400).json({ message: "New password must be at least 6 characters." });
    const user = await User.findById(req.user._id);
    if (!user || !(await bcrypt.compare(currentPassword, user.password))) return res.status(400).json({ message: "Your current password is incorrect." });
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    return res.json({ message: "Password updated successfully." });
  } catch (error) {
    next(error);
  }
};

exports.deleteTeacherAccount = async (req, res, next) => {
  try {
    const userId = req.user._id;
    await Promise.all([TeacherProfile.deleteOne({ user: userId }), Request.deleteMany({ teacher: userId }), Review.deleteMany({ teacher: userId })]);
    await User.deleteOne({ _id: userId });
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });
    return res.json({ message: "Tutor account deleted." });
  } catch (error) {
    next(error);
  }
};

exports.getAvailableStudents = async (req, res, next) => {
  try {
    const { classLevel, subject, board, page = 1, limit = 10, search, minBudget, maxBudget, availability, preferredTeachingMode } = req.query;
    const pageNum = Math.max(parseInt(page, 10) || 1, 1);
    const pageSize = Math.min(Math.max(parseInt(limit, 10) || 10, 1), 50);
    const filter = {};
    if (classLevel) filter.classLevel = classLevel;
    if (board) filter.board = board;
    if (subject) filter.subjects = { $regex: `^${String(subject).replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, $options: "i" };
    if (availability) filter.availability = { $regex: String(availability), $options: "i" };
    if (preferredTeachingMode) filter.preferredTeachingMode = preferredTeachingMode;
    const budget = {};
    if (minBudget !== undefined && minBudget !== "" && Number.isFinite(Number(minBudget))) budget.$gte = Number(minBudget);
    if (maxBudget !== undefined && maxBudget !== "" && Number.isFinite(Number(maxBudget))) budget.$lte = Number(maxBudget);
    if (Object.keys(budget).length) filter.budget = budget;
    if (search?.trim()) {
      const expression = new RegExp(String(search).trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
      const matchingUsers = await User.find({ role: "student", fullName: expression }).select("_id").lean();
      filter.$or = [{ classLevel: expression }, { subjects: expression }, ...(matchingUsers.length ? [{ user: { $in: matchingUsers.map((user) => user._id) } }] : [])];
    }
    const [students, total] = await Promise.all([
      StudentProfile.find(filter).populate("user", "fullName email phone avatarUrl").sort({ createdAt: -1 }).skip((pageNum - 1) * pageSize).limit(pageSize).lean(),
      StudentProfile.countDocuments(filter),
    ]);
    return res.json({ message: "Available students fetched.", count: students.length, total, page: pageNum, totalPages: Math.ceil(total / pageSize), students });
  } catch (error) {
    next(error);
  }
};

exports.getStudentDetails = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(404).json({ message: "Student not found." });
    const student = await StudentProfile.findById(req.params.id).populate("user", "fullName email phone avatarUrl").lean();
    if (!student) return res.status(404).json({ message: "Student not found." });
    return res.json({ student });
  } catch (error) {
    next(error);
  }
};

exports.getDashboardStats = async (req, res, next) => {
  try {
    const teacherId = req.user._id;
    const [totalRequests, pendingRequests, acceptedRequests, completedRequests, activeStudents, profile, rating] = await Promise.all([
      Request.countDocuments({ teacher: teacherId }),
      Request.countDocuments({ teacher: teacherId, status: "pending" }),
      Request.countDocuments({ teacher: teacherId, status: "accepted" }),
      Request.countDocuments({ teacher: teacherId, status: "completed" }),
      Request.distinct("student", { teacher: teacherId, status: { $in: ["accepted", "completed"] } }),
      getOrCreateProfile(teacherId),
      Review.aggregate([{ $match: { teacher: teacherId } }, { $group: { _id: null, average: { $avg: "$rating" }, count: { $sum: 1 } } }]),
    ]);
    return res.json({ message: "Dashboard stats fetched.", stats: { totalRequests, pendingRequests, acceptedRequests, completedRequests, activeStudents: activeStudents.length, subjects: profile.subjects.length, averageRating: rating[0]?.average ? Number(rating[0].average.toFixed(1)) : 0, reviewCount: rating[0]?.count || 0 } });
  } catch (error) {
    next(error);
  }
};
