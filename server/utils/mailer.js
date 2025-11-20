import nodemailer from "nodemailer";
import { MAIL_PASS, MAIL_USER } from "../config.js";

export const sendMail = async ({ to, subject, html, attachments = [] }) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: MAIL_USER,
      pass: MAIL_PASS
    }
  });

  return transporter.sendMail({
    from: `"Greenline Financials" <${MAIL_USER}>`,
    to,
    subject,
    html,
    attachments
  });
};
