import "dotenv/config";
import nodemailer from "nodemailer";

console.log("MAIL USER:", process.env.EMAIL_USER);
console.log("MAIL PASS EXISTS:", !!process.env.EMAIL_PASS);
console.log("MAIL PASS LENGTH:", process.env.EMAIL_PASS?.length);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export default transporter;