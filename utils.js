const nodemailer = require("nodemailer");

// Create a Nodemailer transporter using Gmail and App Password
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODE_MAILER_EMAIL,
    pass: process.env.NODE_MAILER_PASSWORD,
  },
});

/**
 * Sends an email using the provided options
 * @param {Object} mailOptions - Email options such as 'to', 'subject', 'html', 'text'
 * @returns {Promise<void>}
 */
const sendEmail = async (mailOptions) => {
  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully.");
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Email sending failed");
  }
};

module.exports = {
  sendEmail,
};
