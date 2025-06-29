const nodemailer = require("nodemailer");

const sendWelcomeEmail = async (email, name) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: `"MindSpace" <${process.env.SMTP_EMAIL}>`,
      to: email,
      subject: "Welcome to MindSpace 🎉",
      html: `
        <h2>Hi ${name},</h2>
        <p>Welcome to <strong>MindSpace</strong>! We're so excited to have you on board.</p>
        <p>You can now start tracking your mood, journaling with AI, and engaging with our anonymous community.</p>
        <br/>
        <p>Cheers,</p>
        <p><strong>The MindSpace Team</strong></p>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`Welcome email sent to ${email}`);
  } catch (error) {
    console.error("Error sending welcome email:", error.message);
  }
};

module.exports = sendWelcomeEmail;
