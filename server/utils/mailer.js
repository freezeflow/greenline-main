import { Resend } from "resend";
import { RESEND_KEY, MAIL_FROM } from "../config.js";

const resend = new Resend(RESEND_KEY);

console.log("MAIL_FROM in PROD =", MAIL_FROM);

export async function sendMail({ to, subject, html, attachments = [] }) {
  return await resend.emails.send({
    from: MAIL_FROM,
    to,
    subject,
    html,
    attachments: attachments.map(file => ({
      filename: file.originalname,
      content: file.buffer
    })),
  });
}