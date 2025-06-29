const express = require("express");
const router = express.Router();

// Import controller functions
const {registerUser, loginUser, verifyOtp ,resendOtp ,logoutUser,unSubscribe} = require('../controllers/authController');


// Routes
router.post('/signup',registerUser)
router.post('/login', loginUser);        // Step 1: Login & send OTP
router.post('/verify-otp', verifyOtp);   // Step 2: Verify OTP & complete login
router.post("/resend-otp", resendOtp);
router.post('/logout', logoutUser);

router.get('/unsubscribe/:userId',unSubscribe )

router.get('/check-auth', (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(200).json({ authenticated: false });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({ authenticated: true });
  } catch (err) {
    res.status(200).json({ authenticated: false });
  }
});

module.exports = router;