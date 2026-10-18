const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
      index: true,
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    request: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Request",
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    classInfo: {
      type: String,
      trim: true,
      default: "",
    },
    isAnonymous: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
