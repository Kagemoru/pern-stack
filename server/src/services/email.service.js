import { readFile } from "node:fs/promises";
import { transporter } from "../config/nodemailer.js";

function getEmailTemplate() {
  return readFile(
    new URL("../templates/email.html", import.meta.url),
    "utf8",
  );
}

export async function sendPasswordResetCode(email, code) {
  const emailTemplate = await getEmailTemplate();
  const html = emailTemplate.replace("{{code}}", String(code));

  const info = await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: email,
    subject: "PERN STACK - Password reset code",
    text: `Your password reset code is ${code}. It expires in 10 minutes.`,
    html,
  });

  console.log("Message sent:", info.messageId);
}
