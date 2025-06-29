
const JournalEntry = require("../models/journalModel");
const User = require("../models/User");

const createJournalEntry = async (req, res) => {
  try {
   
    const { title ,mood, text, emotion, imageUrl, audioUrl , analysis, playlistUrl } = req.body;
    const userId = req.user._id;
    

    // Save journal entry
    const newEntry = await JournalEntry.create({
      user: userId,
      mood,
      title,
      text,
      emotion,
      imageUrl,
      audioUrl,
      analysis, 
       playlistUrl,     
    });

    
    // STREAK LOGIC
    const user = await User.findById(userId);
    const today = new Date().setHours(0, 0, 0, 0);
    const lastDate = user.lastEntryDate
      ? new Date(user.lastEntryDate).setHours(0, 0, 0, 0)
      : null;

    if (!lastDate || today - lastDate > 86400000 * 1.5) {
      // More than 1.5 days passed → reset streak
      user.streak = 1;
    } else if (today - lastDate === 86400000) {
      // Exactly 1 day difference → increase streak
      user.streak += 1;
    } // else → same day, no change

    user.lastEntryDate = new Date();

    // BADGE LOGIC
    const badgeMap = {
      3: "🗓 3-Day Streak",
      7: "🔥 7-Day Streak",
      14: "💪 14-Day Champion",
      30: "🏆 30-Day Consistency King/Queen",
    };

    if (badgeMap[user.streak] && !user.badges.includes(badgeMap[user.streak])) {
      user.badges.push(badgeMap[user.streak]);
    }
   
   const todayStr = new Date().toDateString();
const isSameDay = user.journalLimit?.lastUsed?.toDateString() === todayStr;

user.journalLimit = {
  count: isSameDay ? user.journalLimit.count + 1 : 1,
  lastUsed: new Date(),
};

    await user.save();

    return res.status(201).json({
      message: "Journal entry created",
      entry: newEntry,
      streak: user.streak,
      badges: user.badges,
    });
  } catch (error) {
    console.error("Error in createJournalEntry:", error);
    res.status(500).json({ error: "Server error" });
  }
};


//  Get all journal entries of logged-in user
const getUserJournalEntries = async (req, res) => {
  try {
    const entries = await JournalEntry.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({ entries });
  } catch (err) {
    console.error("Fetch Journal Error:", err.message);
    res.status(500).json({ message: "Error fetching journal entries." });
  }
};


// edit journal
const editJournalEntry = async (req, res) => {
  const { id } = req.params;
  const { title, text, mood, imageUrl, audioUrl ,analysis, playlistUrl} = req.body;

  try {
    const updated = await JournalEntry.findOneAndUpdate(
      { _id: id, user: req.user._id },
      { title, text, mood, imageUrl, audioUrl, analysis, playlistUrl},
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Entry not found" });

    res.status(200).json({ message: "Entry updated", entry: updated });
  } catch (err) {
    res.status(500).json({
        error,
        message: "Error occured while updating Entry "
     });
  }
};


//DELETE
const deleteJournalEntry = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await JournalEntry.findOneAndDelete({
      _id: id,
      user: req.user._id,
    });

    if (!deleted) return res.status(404).json({ message: "Entry not found" });

    res.status(200).json({ message: "Entry deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
};


// get entries by date
const getEntriesByDate = async (req, res) => {
  const { date } = req.params;

  try {
    const start = new Date(date);
    const end = new Date(start);
    end.setDate(end.getDate() + 1); // next day

    const entries = await JournalEntry.find({
      user: req.user._id,
      createdAt: { $gte: start, $lt: end },
    }).sort({ createdAt: -1 });

    res.status(200).json({ entries });
  } catch (err) {
    res.status(500).json({ message: "Failed to get entries by date" });
  }
};


module.exports = {
  createJournalEntry,
  getUserJournalEntries,
  editJournalEntry,
  deleteJournalEntry,
  getEntriesByDate
};
