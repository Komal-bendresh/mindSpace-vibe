const express = require("express");
const router = express.Router();


const { analyzeMood } = require("../controllers/aiController");
const authMiddleware  = require("../middleware/authMiddleware");



router.post("/analyze", authMiddleware, analyzeMood);

module.exports = router;
