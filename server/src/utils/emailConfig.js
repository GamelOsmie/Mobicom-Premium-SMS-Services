// create email transporter
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_HOST_USER, // generated ethereal user
    pass: process.env.EMAIL_HOST_PASSWORD, // generated ethereal password
  },
});

module.exports = transporter;
