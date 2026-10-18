const nodemailer = require("nodemailer");

const recipient = "yashkush660@gmail.com";
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

exports.sendContactMessage = async (req, res, next) => {
  const { fullName, email, phone = "", subject, message, website = "" } = req.body || {};

  if (website) return res.status(200).json({ message: "Thanks for contacting TutorHub." });

  const cleanName = typeof fullName === "string" ? fullName.trim() : "";
  const cleanEmail = typeof email === "string" ? email.trim().toLowerCase() : "";
  const cleanPhone = typeof phone === "string" ? phone.trim() : "";
  const cleanSubject = typeof subject === "string" ? subject.trim().replace(/[\r\n]+/g, " ") : "";
  const cleanMessage = typeof message === "string" ? message.trim().replace(/\0/g, "") : "";

  if (!cleanName || !cleanEmail || !cleanSubject || !cleanMessage) {
    return res.status(400).json({ message: "Name, email, subject, and message are required." });
  }
  if (cleanName.length > 120 || cleanEmail.length > 254 || cleanPhone.length > 30 || cleanSubject.length > 150 || cleanMessage.length > 5000) {
    return res.status(400).json({ message: "One or more fields exceed the maximum allowed length." });
  }
  if (!emailPattern.test(cleanEmail)) {
    return res.status(400).json({ message: "Enter a valid email address." });
  }

  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const port = Number(process.env.SMTP_PORT || 587);
  const from = process.env.SMTP_FROM || user;
  if (!host || !user || !pass || !from || !Number.isInteger(port) || port < 1 || port > 65535) {
    return res.status(503).json({
      message: "We couldn't send your message because email delivery is not configured yet. Please email yashkush660@gmail.com directly.",
    });
  }

  const transport = nodemailer.createTransport({
    host,
    port,
    secure: process.env.SMTP_SECURE === "true" || (process.env.SMTP_SECURE !== "false" && port === 465),
    auth: { user, pass },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  });

  try {
    await transport.sendMail({
      from,
      to: recipient,
      replyTo: cleanEmail,
      subject: `[TutorHub feedback] ${cleanSubject}`,
      text: [
        `Name: ${cleanName}`,
        `Email: ${cleanEmail}`,
        `Phone: ${cleanPhone || "Not provided"}`,
        "",
        cleanMessage,
      ].join("\n"),
    });
    return res.status(200).json({ message: "Thanks for your feedback. Your message has been sent." });
  } catch (error) {
    return next(error);
  }
};
