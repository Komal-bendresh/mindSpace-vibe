const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  role: String,
  content: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

const chatSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  sessionName: String, // "Chat 1", "Chat 2", etc.
  messages: [messageSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Chat", chatSchema);
