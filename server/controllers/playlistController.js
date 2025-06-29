const User = require("../models/User");

const playlistMap = {
  happy: "https://open.spotify.com/playlist/37i9dQZF1DXdPec7aLTmlC",
  sad: "https://open.spotify.com/playlist/37i9dQZF1DWVrtsSlLKzro",
  angry: "https://open.spotify.com/playlist/37i9dQZF1DWZUAeYvs88zc",
  relaxed: "https://open.spotify.com/playlist/37i9dQZF1DX3Ogo9pFvBkY",
  neutral: "https://open.spotify.com/playlist/37i9dQZF1DWU0ScTcjJBdj",
};

const generatePlaylist = async (req, res) => {
  try {
    const { emotion } = req.body;
    const user = await User.findById(req.user._id);

    const mood = emotion?.toLowerCase() || "neutral";
    const playlistUrl = playlistMap[mood] || playlistMap["neutral"];

    // Save generated playlist
    if (user) {
      user.savedPlaylists.push({
        url: playlistUrl,
        mood,
        date: new Date(),
      });
      await user.save();
    }

    res.status(200).json({
      success: true,
      playlist: playlistUrl,
      message: `Here's your ${mood} playlist 🎵`,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to generate playlist",
    });
  }
};

const getSavedPlaylists = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).json({
      success: true,
      playlists: user.savedPlaylists.reverse(), // Newest first
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching saved playlists" });
  }
};

module.exports = { generatePlaylist, getSavedPlaylists };
