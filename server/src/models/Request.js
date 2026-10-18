const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
      index: true,
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
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
    description: {
      type: String,
      trim: true,
      default: "",
    },
    preferredTeachingMode: {
      type: String,
      enum: ["online", "offline", "both"],
      required: true,
    },
    preferredTime: {
      type: String,
      trim: true,
      default: "",
    },
    budget: {
      type: Number,
      required: true,
    },
    duration: {
      type: String,
      trim: true,
      default: "",
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "declined", "completed", "cancelled"],
      default: "pending",
      index: true,
    },
    message: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Request", requestSchema);
