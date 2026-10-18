const mongoose = require("mongoose");

const studentProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
      unique: true,
      index: true,
    },
    classLevel: {
      type: String,
      required: true,
      trim: true,
    },
    board: {
      type: String,
      enum: ["CBSE", "ICSE", "State Board", "IB", "University"],
      default: "CBSE",
    },
    subjects: {
      type: [String],
      required: true,
    },
    bio: {
      type: String,
      trim: true,
      default: "",
    },
    location: {
      type: String,
      trim: true,
      default: "",
    },
    preferredTeachingMode: {
      type: String,
      enum: ["online", "offline", "both"],
      default: "both",
    },
    budget: {
      type: Number,
      default: 0,
    },
    seekingTutorFor: {
      type: String,
      enum: ["exam prep", "concept clarity", "homework help", "competitive exam", "regular tuition"],
      default: "regular tuition",
    },
    availability: {
      type: String,
      default: "",
    },
    profileImageUrl: {
      type: String,
      default: "",
    },
    preferences: {
      notifications: {
        requests: { type: Boolean, default: true },
        reminders: { type: Boolean, default: true },
      },
      privacy: {
        showPhone: { type: Boolean, default: false },
        showEmail: { type: Boolean, default: false },
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("StudentProfile", studentProfileSchema);
