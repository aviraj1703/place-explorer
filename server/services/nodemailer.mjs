import nodemailer from "nodemailer";
import "dotenv/config";

const email = process.env.EMAIL;
const password = process.env.EMAIL_PASSWORD;

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  requireTLS: true,
  auth: {
    user: email,
    pass: password,
  },
});

export const sendEmail = async (recipient, message) => {
  try {
    let info = await transporter.sendMail({
      from: email,
      to: recipient,
      subject: message.subject,
      html: message.text,
    });
    return true;
  } catch (err) {
    console.log("error", err);
    return false;
  }
};
