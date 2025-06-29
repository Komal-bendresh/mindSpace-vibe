const express = require("express");
const router = express.Router();

const { generatePlaylist, getSavedPlaylists } = require("../controllers/playlistController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/playlist", authMiddleware, generatePlaylist);
router.get("/saved", authMiddleware, getSavedPlaylists);

module.exports = router;
