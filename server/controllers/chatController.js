const axios = require("axios");
const Chat = require("../models/chatModel");
require("dotenv").config();

const chatWithAI = async (req, res) => {
  const { message } = req.body;
  const chatId = req.params.id;
  if (!message) return res.status(401).json({ message: "Message required" });

  try {
    let chat = await Chat.findById(chatId);
    const today = new Date().toDateString();

    if (!chat) {
      chat = await Chat.create({
        user: req.user._id,
        messages: [],
        sessionName: `Chat 1`,
        lastDate: today,
        dailyCount: 0,
      });
    }

    if (chat.lastDate !== today) {
      chat.lastDate = today;
      chat.dailyCount = 0;
    }

    const cleanedMessages = chat.messages.map((m) => ({
      role: m.role,
      content: m.content,
    }));

    const groqMessages = [
      {
        role: "system",
        content: `You are a kind and caring mental health assistant. 
Speak like a supportive friend. Be empathetic, warm, and conversational. 
Always remember what the user has previously said and respond naturally.
Detect the user's language and respond in the same style (e.g., Hinglish in Latin script).
Always directly acknowledge the user's *most recent message*. 
Do NOT skip or ignore their last statement.
Avoid giving generic or unrelated responses.
Use Hindi words in English letters (like "main thik hoon") and never full Hindi script.`,
      },
      ...cleanedMessages,
      { role: "user", content: message },
    ];

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama3-70b-8192",
        messages: groqMessages,
        max_tokens: 150,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        timeout: 5000,
      }
    );

    const reply = response.data.choices[0].message?.content;

    chat.messages.push(
      { role: "user", content: message, date: new Date() },
      { role: "assistant", content: reply, date: new Date() }
    );

    chat.dailyCount += 1;
    await chat.save();

    return res.status(200).json({ reply });
  } catch (err) {
    console.error("Chat Error:", err);
    return res.status(500).json({ message: "Chat failed internally." });
  }
};

const getChatHistory = async (req, res) => {
  try {
    const chats = await Chat.find({ user: req.user._id }).sort({ createdAt: -1 });
    return res.status(200).json(chats);
  } catch (err) {
    console.error("Get Chat Error:", err.message);
    return res.status(500).json({ message: "Failed to load chat history" });
  }
};

const clearChatHistory = async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id);
    if (!chat || chat.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: "Chat not found" });
    }

    chat.messages = [];
    chat.dailyCount = 0;
    chat.lastDate = new Date().toDateString();

    await chat.save();
    return res.status(200).json({ message: "Chat cleared" });
  } catch (err) {
    return res.status(500).json({ message: "Failed to clear chat" });
  }
};

const startNewChat = async (req, res) => {
  try {
    const chatCount = await Chat.countDocuments({ user: req.user._id });
    const newChat = await Chat.create({
      user: req.user._id,
      messages: [],
      sessionName: `Chat ${chatCount + 1}`,
    });
    res.status(201).json(newChat);
  } catch (err) {
    res.status(500).json({ message: "Failed to start new chat" });
  }
};

module.exports = { chatWithAI, getChatHistory, clearChatHistory, startNewChat };