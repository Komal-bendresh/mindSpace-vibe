const nodemailer = require("nodemailer");

const sendOTPEmail = async (email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: `"MindSpace Support" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Your OTP Verification Code",
      html: `
        <p>Your OTP code is <strong>${otp}</strong></p>
        <p>This OTP is valid for 5 minutes.</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ OTP sent to email:", email);
     console.log("OTP is:", otp);
  } catch (err) {
    console.error(" Failed to send OTP email:", err);
    throw new Error("Could not send OTP");
  }
};

module.exports = sendOTPEmail;
