const nodemailer = require("nodemailer");

const sendMail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "mail51.lwspanel.com",
    port: process.env.SMTP_PORT || 587,
    service: process.env.SMPT_SERVICE || "mail51.lwspanel.com",
    auth: {
      user: "thomas@jklconsulting.online",
      pass: "Thomas@0000",
    },
  });

  const mailOptions = {
    from: "thomas@jklconsulting.online",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendMail;
