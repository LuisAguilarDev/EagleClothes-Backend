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

// send mail with defined transport object
// transporter.verify(() => {
//   console.log("ready email");
// });

// transporter.sendMail({
//   from: `"Eagle Clothes" <eagle.clothes.store@gmail.com>`,
//   to: "luisgerardo900@gmail.com",
//   subject: "Hello",
//   text: "confrim email",
//   html: "<h1>Hello World</h1>",
// });
