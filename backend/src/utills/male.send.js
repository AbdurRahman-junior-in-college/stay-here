import nodemailer from "nodemailer";
import * as fs from "node:fs";

export const sendEmail = async (to, subject, text, pdfFilePath) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ar6808325@gmail.com",
      pass: "mgpe dciy avcf widz",
    },
  });

  let mailOption = {
    from: "ar6808325@gmail.com",
    to: "abdra5679@gmail.com",
    subject: subject,
    text: text,
    attachments: [
      {
        filename: "Booking_information.pdf",
        path: pdfFilePath,
      },
    ],
  };

  try {
   
    // await transporter.sendEmail(mailOption)
    // await transporter.sendMail(mailOption);
    console.log("Email send Successfully");
  } catch (error) {
    console.log(error);
  } finally {
    fs.unlinkSync(pdfFilePath);
  }
};
