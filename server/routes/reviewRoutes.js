const express = require("express");
const router = express.Router();
const { addReview, getAllReviews } = require("../controllers/reviewController");
const authMiddleware = require("../middleware/authMiddleware");


router.post("/", authMiddleware, addReview);
router.get("/", getAllReviews);

module.exports = router;
