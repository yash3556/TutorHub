const express = require("express");
const { sendContactMessage } = require("../controllers/contactController");

const router = express.Router();
const windowMs = 15 * 60 * 1000;
const maxSubmissions = 5;
const submissionsByIp = new Map();

router.post("/", (req, res, next) => {
  const now = Date.now();
  const ip = req.ip || req.socket.remoteAddress || "unknown";
  const current = submissionsByIp.get(ip);
  if (!current || current.resetAt <= now) {
    if (!current && submissionsByIp.size >= 1000) {
      for (const [key, entry] of submissionsByIp) {
        if (entry.resetAt <= now) submissionsByIp.delete(key);
      }
      if (submissionsByIp.size >= 1000) {
        return res.status(503).json({ message: "Contact form is temporarily busy. Please try again later." });
      }
    }
    submissionsByIp.set(ip, { count: 1, resetAt: now + windowMs });
    return next();
  }
  if (current.count >= maxSubmissions) {
    res.set("Retry-After", String(Math.ceil((current.resetAt - now) / 1000)));
    return res.status(429).json({ message: "Too many messages sent. Please try again later." });
  }
  current.count += 1;
  return next();
}, sendContactMessage);

module.exports = router;
