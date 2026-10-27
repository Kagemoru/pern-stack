import { transporter } from "../config/nodemailer.js";

export async function sendPasswordResetCode(email, code) {
  const info = await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: email,
    subject: "PERN STACK - Password reset code",
    text: `Your password reset code is ${code}. It expires in 10 minutes.`,
  });

  console.log("Message sent:", info.messageId);
}
