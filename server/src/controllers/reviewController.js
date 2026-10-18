const Review = require("../models/Review");
const User = require("../models/User");


exports.getTeacherReviews = async (req, res, next) => {
  try {
    const { timeFilter } = req.query;
    const filter = { teacher: req.user._id };

    let dateFilter = {};
    if (timeFilter === "Last 30 days") {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      dateFilter = { createdAt: { $gte: thirtyDaysAgo } };
      filter.createdAt = dateFilter.createdAt;
    } else if (timeFilter === "Last 90 days") {
      const ninetyDaysAgo = new Date();
      ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
      dateFilter = { createdAt: { $gte: ninetyDaysAgo } };
      filter.createdAt = dateFilter.createdAt;
    }

    const reviews = await Review.find(filter)
      .populate("student", "fullName email avatarUrl")
      .sort({ createdAt: -1 })
      .lean();


    const ratingBreakdown = {
      "5 Stars": 0,
      "4 Stars": 0,
      "3 Stars": 0,
      "2 Stars": 0,
      "1 Star": 0,
    };

    let totalRating = 0;
    reviews.forEach((review) => {
      totalRating += review.rating;
      ratingBreakdown[`${Math.round(review.rating)} Star${Math.round(review.rating) !== 1 ? 's' : ''}`]++;
    });

    const averageRating = reviews.length > 0 ? (totalRating / reviews.length).toFixed(1) : 0;

    res.json({
      message: "Reviews fetched successfully",
      count: reviews.length,
      averageRating,
      ratingBreakdown,
      reviews,
    });
  } catch (error) {
    next(error);
  }
};


exports.getReviewDetails = async (req, res, next) => {
  try {
    const { id } = req.params;
    const review = await Review.findOne({ _id: id, teacher: req.user._id })
      .populate("student", "fullName email avatarUrl")
      .lean();

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.json({ message: "Review details", review });
  } catch (error) {
    next(error);
  }
};


exports.getReviewStats = async (req, res, next) => {
  try {
    const reviews = await Review.find({ teacher: req.user._id }).lean();

    if (reviews.length === 0) {
      return res.json({
        message: "Review statistics",
        stats: {
          totalReviews: 0,
          averageRating: 0,
          ratingDistribution: {},
        },
      });
    }

    let totalRating = 0;
    const ratingDistribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

    reviews.forEach((review) => {
      totalRating += review.rating;
      ratingDistribution[Math.round(review.rating)]++;
    });

    const averageRating = (totalRating / reviews.length).toFixed(1);

    res.json({
      message: "Review statistics",
      stats: {
        totalReviews: reviews.length,
        averageRating,
        ratingDistribution,
      },
    });
  } catch (error) {
    next(error);
  }
};
