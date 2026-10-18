const mongoose = require("mongoose");

const timeSlotSchema = new mongoose.Schema(
  {
    start: { type: String, required: true, trim: true },
    end: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const availabilityDaySchema = new mongoose.Schema(
  {
    day: {
      type: String,
      required: true,
      enum: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
    },
    enabled: { type: Boolean, default: false },
    slots: { type: [timeSlotSchema], default: [] },
  },
  { _id: false }
);

const teacherProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
      unique: true,
      index: true,
    },
    availability: {
      timezone: { type: String, default: "Asia/Kolkata" },
      teachingMode: {
        type: String,
        enum: ["online", "offline", "both"],
        default: "both",
      },
      weeklySchedule: { type: [availabilityDaySchema], default: [] },
    },
    bankDetails: {
      accountHolderName: { type: String, trim: true, default: "" },
      bankName: { type: String, trim: true, default: "" },
      accountNumber: { type: String, trim: true, default: "" },
      ifscCode: { type: String, trim: true, uppercase: true, default: "" },
      accountType: {
        type: String,
        enum: ["savings", "current"],
        default: "savings",
      },
      upiId: { type: String, trim: true, lowercase: true, default: "" },
    },
    bio: { type: String, trim: true, default: "" },
    location: { type: String, trim: true, default: "" },
    headline: { type: String, trim: true, default: "" },
    subjects: { type: [String], default: [] },
    experienceYears: { type: Number, min: 0, max: 100, default: 0 },
    education: {
      type: [{
        degree: { type: String, trim: true, default: "" },
        institution: { type: String, trim: true, default: "" },
        year: { type: String, trim: true, default: "" },
      }],
      default: [],
    },
    preferences: {
      notifications: {
        requests: { type: Boolean, default: true },
        messages: { type: Boolean, default: true },
        reminders: { type: Boolean, default: true },
        promotions: { type: Boolean, default: false },
      },
      privacy: {
        showPhone: { type: Boolean, default: false },
        showEmail: { type: Boolean, default: false },
        visibility: { type: String, enum: ["public", "students", "private"], default: "public" },
      },
    },
    verification: {
      identity: {
        status: { type: String, enum: ["not_submitted", "pending", "verified", "rejected"], default: "not_submitted" },
        documentType: { type: String, default: "" },
        documentNumber: { type: String, default: "" },
        submittedAt: { type: Date, default: null },
      },
      address: {
        status: { type: String, enum: ["not_submitted", "pending", "verified", "rejected"], default: "not_submitted" },
        documentType: { type: String, default: "" },
        documentNumber: { type: String, default: "" },
        submittedAt: { type: Date, default: null },
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TeacherProfile", teacherProfileSchema);
