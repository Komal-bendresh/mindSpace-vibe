
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Journal = require("../models/journalModel");

const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

// Get all users
router.get("/users", auth, admin, async (req, res) => {
  const users = await User.find({}, "-password"); // exclude password
  res.json(users);
});

// Delete a user
router.delete("/delete-user/:id", auth, admin, async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json({ message: "User deleted successfully" });
});

// Platform stats
router.get("/stats", auth, admin, async (req, res) => {
  const totalUsers = await User.countDocuments();
  const totalEntries = await Journal.countDocuments();

  const avgMoodData = await Journal.aggregate([
    { $group: { _id: null, avgMood: { $avg: "$mood" } } }
  ]);
  const moodAverage = avgMoodData[0]?.avgMood?.toFixed(2) || 0;

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const activeLast7Days = await User.countDocuments({ lastEntryDate: { $gte: oneWeekAgo } });

  res.json({ totalUsers, totalEntries, moodAverage, activeLast7Days });
});

module.exports = router;
