const mongoose = require('mongoose');

const pendingUserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: String,
  createdAt: { type: Date, default: Date.now, expires: 600 }, // Expires in 10 minutes
});

module.exports = mongoose.model('PendingUser', pendingUserSchema);
