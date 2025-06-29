const Review = require("../models/reviewModel");

//  Add or update review
const addReview = async (req, res) => {
  const { rating, comment } = req.body;

  if (!rating) 
    return res.status(400)
    .json({ 
        message: "Rating is required"
     });

  try {
    const review = await Review.findOneAndUpdate(
      { user: req.user._id },
      { rating, comment },
      { upsert: true, new: true }
    );

    res.status(200).
    json({ 
        message: "Review saved", 
        review 
    });

  } catch (err) {
    res.status(500).json({
         message: "Failed to save review" 
        });
  }
};

//  Get all reviews
const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
                                .populate("user", "email");

    res.status(200).
    json({ reviews });

  } catch (err) {
    res.status(500).json({ 
        message: "Failed to fetch reviews" 
    });
  }
};

module.exports = { addReview, getAllReviews };
