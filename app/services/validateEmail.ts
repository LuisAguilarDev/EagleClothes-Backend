import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config({ path: "./../../.env" });

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER, // generated ethereal user
    pass: process.env.EMAIL_PASS_APLICATION, // generated ethereal password
  },
});
