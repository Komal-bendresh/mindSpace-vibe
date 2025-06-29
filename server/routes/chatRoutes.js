const express = require("express");
const router = express.Router();
const { chatWithAI, getChatHistory, clearChatHistory, startNewChat } = require("../controllers/chatController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/chat/:id", authMiddleware, chatWithAI);
router.post("/", authMiddleware, startNewChat);
router.get("/chat-history", authMiddleware, getChatHistory);
router.delete("/chat-clear/:id", authMiddleware, clearChatHistory);

module.exports = router;