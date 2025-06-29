const JournalEntry = require("../models/journalModel");
const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");

const {
  createJournalEntry,
  getUserJournalEntries,
  editJournalEntry,
  deleteJournalEntry,
  getEntriesByDate
} = require("../controllers/journalController");

const authMiddleware = require("../middleware/authMiddleware");

router.use(authMiddleware); 

// Protected Routes
router.post("/", authMiddleware, createJournalEntry);
router.get("/my-entries", authMiddleware, getUserJournalEntries);
router.put("/edit/:id", authMiddleware, editJournalEntry);
router.delete("/delete/:id", authMiddleware, deleteJournalEntry);
router.get("/by-date/:date", authMiddleware, getEntriesByDate);



router.post(
  "/upload",
  authMiddleware,
  upload.fields([{ name: "image" }, { name: "audio" }]),
  (req, res) => {
    const files = req.files;
    res.status(200).json({
      imageUrl: files?.image?.[0]?.path || "",
      audioUrl: files?.audio?.[0]?.path || "",
    });
  }
);



module.exports = router;
