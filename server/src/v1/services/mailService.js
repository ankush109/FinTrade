const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODE_MAILER_USER,
    pass: process.env.NODE_MAILER_PASSWORD,
  },
});

// Define email options
const mailOptions = {
  from: "banerjeeankush184@gmail.com",
  subject: "Your daily expense report From FinTrade ",
  text: "Hello Mr Souvik Banerjee here is your expense report from may 1 to may 11th",
};

export const mailService = {
  async sendEmail(userEmailTo, pdfPath) {
    try {
      const info = await transporter.sendMail({
        ...mailOptions,
        to: userEmailTo,
        attachments: [
          {
            filename: "document.pdf",
            path: pdfPath,
            contentType: "application/pdf",
          },
        ],
      });
      console.log("Email sent: " + info.response);
      return info;
    } catch (error) {
      console.error("Error sending email:", error);
    }
  },
};
