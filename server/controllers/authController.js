const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const OTP = require("../models/OTP");
const crypto = require("crypto");
const sendOtpEmail = require("../utils/sendOtp");
const generateOTP = require("../utils/generateOtp");
const sendWelcomeEmail = require("../utils/sendWelcomeEmail");
const PendingUser = require("../models/PendingUserModel")

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ userId: id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Register User and Sign up
const registerUser = async (req, res) => {
  const { name, email, password ,role } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
     const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists. Please login." });
    }

    const pending = await PendingUser.findOne({ email });
    if (pending) {
      await PendingUser.deleteOne({ email }); // cleanup previous pending if needed
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await PendingUser.create({ name, email, password: hashedPassword, role });

  const otpCode = crypto.randomInt(100000, 999999).toString();
  const hashedOtp = await bcrypt.hash(otpCode, 10);
    await OTP.create({ email, otp: hashedOtp });

    await sendOtpEmail(email, otpCode);

   

    return res.status(200).json({
      message: "OTP sent to your email. Please verify to complete signup.",
    });

  } catch (error) {
    console.error("Register error:", error.message);
    return res.status(500).json({ message: "Registration failed" });
  }
};


//Login

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400)
      .json({
         message: "Please enter email and password" 

      });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(404)
      .json({
       message: "User not found! Please Register First"

     });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401)
      .json({ 
      message: "Invalid credentials" 

    });

    //OTP verification check
    if (!user.verified) {
      return res.status(403)
      .json({ 
        message: "Please verify your email before login"

       });
    }

    const token = generateToken(user._id);
    
      // send welcome mail
    await sendWelcomeEmail(user.email, user.name);
   
    

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    }).status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        email: user.email,
      }
    });

  

    

  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500)
    .json({
       message: "error while login user"

     });
  }
};


//verify otp
const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }

    const pending = await PendingUser.findOne({ email });
    if (!pending) {
      return res.status(400).json({ message: "No signup request found for this email." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser && existingUser.verified) {
      return res.status(400).json({ message: "User already verified. Please login." });
    }

    const otpRecord = await OTP.findOne({ email }).sort({ createdAt: -1 });
    if (!otpRecord) {
      return res.status(400).json({ message: "OTP not found or expired" });
    }

    const otpAge = (Date.now() - otpRecord.createdAt) / 1000;
    if (otpAge > 300) {
      await OTP.deleteMany({ email });
      return res.status(400).json({ message: "OTP expired. Please request a new one." });
    }

    const isMatch = await bcrypt.compare(otp, otpRecord.otp);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    const user = await User.create({
      name: pending.name,
      email: pending.email,
      password: pending.password,
      role: pending.role,
      verified: true,
    });

    await OTP.deleteMany({ email });
    await PendingUser.deleteOne({ email });
    

    const token = generateToken(user._id);


      // send welcome mail
    await sendWelcomeEmail(user.email, user.name);
    
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    }).status(200).json({
      message: "User created and verified successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      }
    });

  } catch (error) {
    console.error("OTP verification error:", error.message);
    return res.status(500).json({ message: "OTP verification failed" });
  }
};



// resend otp
const resendOtp = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
       return res.status(404)
      .json({ 
      message: "User not found" 

    });

    // Purana OTP delete
    await OTP.deleteMany({ email });

    // Naya OTP generate karo
    const otpCode = generateOTP(); // 6-digit OTP

    const hashedOtp = await bcrypt.hash(otpCode, 10);
    const otpExpires = new Date(Date.now() + 5 * 60 * 1000); // 5 mins later

     await OTP.create({ email, otp: hashedOtp, expiresAt: otpExpires });
    console.log("OTP:", otpCode)
    // Send OTP Email
    await sendOtpEmail(email, otpCode);

    res.status(200).
    json({ 
      message: "OTP resent successfully"

     });

  } catch (error) {
    console.error("Resend OTP error:", error.message);
    res.status(500).json({
       message: "Error while resending OTP"

     });
  }
};


//logout user
const logoutUser = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
  });
  res.status(200).json({ message: "Logged out successfully" });
};



//unsubscribe from email

const unSubscribe = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { receiveEmails: false },
      { new: true }
    );

    if (!user) {
      return res.status(404).send("<h2>User not found.</h2>");
    }

    return res.send("<h2>You’ve been unsubscribed from reminder emails. 💌</h2>");
  } catch (err) {
    return res.status(500).send("<h2>Something went wrong. Try again later.</h2>");
  }
};


module.exports = {
  registerUser,
  loginUser,
  verifyOtp,
  resendOtp,
  logoutUser,
  unSubscribe
};