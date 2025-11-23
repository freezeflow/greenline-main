import express from "express";
import multer from "multer";
import rateLimit from "express-rate-limit";
import { sendMail } from "../utils/mailer.js";

const applicationRouter = express.Router();

// Memory storage for small files (PDFs)
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDF files are allowed"));
    }
    cb(null, true);
  }
});

// Rate limiter: max 3 submissions per 15 minutes per IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 3,
  message: { error: "Too many submissions, please try again later." }
});

applicationRouter.post(
  "/apply",
  limiter,
  upload.fields([
    { name: "idCopy", maxCount: 1 },
    { name: "bankstatement", maxCount: 1 },
    { name: "payslip", maxCount: 1 }
  ]),
  async (req, res) => {
    try {
      const { fullName, phone, email, amount, term } = req.body;

      if (!fullName || !email || !phone || !amount || !term) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const files = [
        ...(req.files?.idCopy || []),
        ...(req.files?.bankstatement || []),
        ...(req.files?.payslip || []),
      ];

      const html = `
        <h2>New Loan Application</h2>
        <p><strong>Name:</strong> ${req.body.fullName}</p>
        <p><strong>Email:</strong> ${req.body.email}</p>
        <p><strong>Phone:</strong> ${req.body.phone}</p>
        <p><strong>Amount:</strong> N$${req.body.amount}</p>
        <p><strong>Message:</strong> ${req.body.message}</p>
      `;

      await sendMail({
        to: process.env.MAIL_RECEIVE,
        subject: `New Loan Application from ${req.body.fullName}`,
        html,
        attachments: files
      });

      res.json({ success: true, message: "Application sent successfully" });

    } catch (error) {
      console.error("Email error:", error);
      res.status(500).json({ error: error.message });
    }
  }
);

applicationRouter.post(
  "/contact",
  limiter,
  async (req, res) => {
    try {
      const { email, body } = req.body;
      if (!email || !body) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const html = `
        <h2>Contact</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p>${body}</p>
      `;

      await sendMail({
        to: process.env.MAIL_RECEIVE,
        subject: `Contact from ${email}`,
        html
      });

      res.json({ success: true, message: "Message sent successfully" });

    } catch (error) {
      console.error("Email error:", error);
      res.status(500).json({ error: error.message });
    }
  }
);

export default applicationRouter;