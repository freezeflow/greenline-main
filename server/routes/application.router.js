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
      // Basic validation
      if (!fullName || !email || !phone || !amount || !term) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      // Prepare attachments
      const attachments = Object.keys(req.files).map(key => ({
        filename: req.files[key][0].originalname,
        content: req.files[key][0].buffer
      }));

      await sendMail({
        to: process.env.MAIL_RECEIVE,
        subject: `New Loan Application - ${fullName}`,
        html: `
          <h2>New Loan Application</h2>
          <p><strong>Name:</strong> ${fullName}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Requested Amount:</strong> N$${amount}</p>
          <p><strong>Payment term:</strong></p>
          <p>${term} ${term > 1 ? "Months" : "Month"}</p>
        `,
        attachments
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

      await sendMail({
        to: process.env.MAIL_RECEIVE,
        subject: `From Greenline.com Contact`,
        html: `
          <h2>Contact</h2>
          <p><strong>Email:</strong> ${email}</p>
          <p>${body}</p>`
      });

      res.json({ success: true, message: "Application sent successfully" });

    } catch (error) {
      console.error("Email error:", error);
      res.status(500).json({ error: error.message });
    }
  }
);

export default applicationRouter;