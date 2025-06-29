import axios from './axios';

export const signupUser = async (data) => {
  return await axios.post('/api/auth/signup', data);
};

export const verifyOtp = async (data) => {
  return await axios.post('/api/auth/verify-otp', data);
};

export const loginUser = async (data) => {
  return await axios.post('/api/auth/login', data);
};

export const createJournalEntry = async ({ mood, text ,title,playlistUrl}) => {
  const res = await axios.post(
    "/api/journal",
    { mood, text ,title,playlistUrl},
    { withCredentials: true } 
  );
  return res.data.entry;
};

export const getJournalEntries = async () => {
  const res = await axios.get("/api/journal/my-entries", {
    withCredentials: true, 
  });
  return res.data.entries;
};

export const deleteJournalEntry = async (id) => {
  return await axios.delete(`/api/journal/delete/${id}`);
};

export const updateJournalEntry = async (id, data) => {
  return await axios.put(`/api/journal/edit/${id}`, data);
};

export const analyzeJournalEntry = async (text) => {
  const res = await axios.post("/api/ai/analyze", { journalText: text });
  return res.data.analysis;
};

export const sendMessageToAI = async (chatId, message) => {
  const token = localStorage.getItem("token");
  const res = await axios.post(
    `/api/chat/chat/${chatId}`,
    { message },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data.reply;
};

export const getChatHistory = async () => {
  const token = localStorage.getItem("token");
  const res = await axios.get("/api/chat/chat-history", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const clearChatHistory = async (chatId) => {
  const token = localStorage.getItem("token");
  const res = await axios.delete(`/api/chat/chat-clear/${chatId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data.message;
};

export const startNewChat = async () => {
  const token = localStorage.getItem("token");
  const res = await axios.post("/api/chat", {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};


export const generatePlaylist = async (emotion) => {
  const token = localStorage.getItem("token");

  const res = await axios.post(
    "/api/play/playlist",
    { emotion },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};
