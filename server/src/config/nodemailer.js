import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const testNodeMailConnection = async () => {
  try {
    await transporter.verify();
    console.log("Connected to nodemailer successfully...");
  } catch (error) {
    console.error("Connection to nodemailer failed:", error);
  }
};

export const CloseNodeMailConnection = async () => {
  try {
    transporter.close();
    console.log("Nodemailer closed.");
  } catch (error) {
    console.error("Failed to close Nodemailer:", error);
    throw error;
  }
};

