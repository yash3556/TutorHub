const Request = require("../models/Request");
const User = require("../models/User");


exports.getTeacherRequests = async (req, res, next) => {
  try {
    const { status, sort } = req.query;
    const filter = { teacher: req.user._id };
    
    if (status && status !== "all") {
      filter.status = status;
    }

    let query = Request.find(filter)
      .populate("student", "fullName email phone avatarUrl")
      .lean();

    if (sort === "oldest") {
      query = query.sort({ createdAt: 1 });
    } else {
      query = query.sort({ createdAt: -1 });
    }

    const requests = await query;
    
    res.json({
      message: "Requests fetched successfully",
      count: requests.length,
      requests,
    });
  } catch (error) {
    next(error);
  }
};


exports.getRequestDetails = async (req, res, next) => {
  try {
    const { id } = req.params;
    const request = await Request.findOne({ _id: id, teacher: req.user._id })
      .populate("student", "fullName email phone avatarUrl")
      .lean();

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    res.json({ message: "Request details", request });
  } catch (error) {
    next(error);
  }
};


exports.updateRequestStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, message } = req.body;

    if (!["accepted", "declined", "completed", "cancelled"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const request = await Request.findOneAndUpdate(
      { _id: id, teacher: req.user._id },
      { status, message },
      { new: true, runValidators: true }
    )
      .populate("student", "fullName email phone avatarUrl");

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    res.json({ message: `Request ${status} successfully`, request });
  } catch (error) {
    next(error);
  }
};


exports.getRequestStats = async (req, res, next) => {
  try {
    const stats = {
      all: 0,
      pending: 0,
      accepted: 0,
      completed: 0,
      declined: 0,
    };

    for (const status of ["pending", "accepted", "completed", "declined"]) {
      const count = await Request.countDocuments({
        teacher: req.user._id,
        status,
      });
      stats[status] = count;
    }

    stats.all = Object.values(stats).reduce((a, b) => a + b, 0) - 
                (stats.pending + stats.accepted + stats.completed + stats.declined);
    stats.all = await Request.countDocuments({ teacher: req.user._id });

    res.json({ message: "Request statistics", stats });
  } catch (error) {
    next(error);
  }
};
