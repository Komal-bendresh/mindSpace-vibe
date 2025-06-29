const JournalEntry = require("../models/journalModel");

// Get mood trend (last 7 or 30 days)
const getMoodTrends = async (req, res) => {
  const { range } = req.query; // '7' or '30'
  const days = parseInt(range) || 7;
  const fromDate = new Date();
  fromDate.setDate(fromDate.getDate() - days);

  try {
    const entries = await JournalEntry.find({
      user: req.user._id,
      createdAt: { $gte: fromDate }
    }).sort({ createdAt: 1 });

    const data = entries.map(entry => ({
      date: entry.createdAt.toISOString().slice(0, 10),
      mood: entry.mood
    }));

    res.json({ data });
  } catch (err) {
    res.status(500).json({ message: "Failed to get mood trends" });
  }
};

// Get emotion frequency (for pie chart)
const getEmotionFrequency = async (req, res) => {
  try {
    const entries = await JournalEntry.find({ user: req.user._id });
    const moodCount = {};

    entries.forEach(entry => {
      moodCount[entry.mood] = (moodCount[entry.mood] || 0) + 1;
    });

    res.json({ data: moodCount });
  } catch (err) {
    res.status(500).json({ message: "Failed to get emotion frequency" });
  }
};

// Get keywords from journals
const getJournalKeywords = async (req, res) => {
  try {
    const entries = await JournalEntry.find({ user: req.user._id });
    const text = entries.map(e => e.text || "").join(" ");

    const words = text
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .split(/\s+/)
      .filter(word => word.length > 3); // Ignore small/common words

    const freq = {};
    words.forEach(word => {
      freq[word] = (freq[word] || 0) + 1;
    });

    const keywordData = Object.keys(freq).map(word => ({
      text: word,
      value: freq[word],
    }));

    res.json({ keywords: keywordData });
  } catch (err) {
    res.status(500).json({ message: "Failed to get keywords" });
  }
};

module.exports = { getMoodTrends, getEmotionFrequency, getJournalKeywords };
