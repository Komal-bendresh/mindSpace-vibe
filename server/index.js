const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database')
const cookieParser = require('cookie-parser');


dotenv.config();

const app = express();
const PORT = process.env.PORT; 

// Middlewares
app.use(express.json());
app.use(cookieParser());

const cors = require('cors');

const allowedOrigins = ['https://mind-space-vibe.vercel.app'];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, 
}));




const authRoutes = require('./routes/authRoutes');
const journalRoutes = require("./routes/journalRoutes");
const aiRoutes =  require("./routes/aiRoutes");
const chatRoutes =  require("./routes/chatRoutes");
const reviewRoutes = require("./routes/reviewRoutes")
const playlistRoutes= require("./routes/playlistRoutes");

app.use('/api/auth', authRoutes);
app.use("/api/journal", journalRoutes);
app.use("/api/ai",aiRoutes);
app.use("/api/chat",chatRoutes)
app.use("/api/reviews", reviewRoutes);
app.use("/api/play", playlistRoutes);

const adminRoutes = require("./routes/adminRoutes");
app.use("/api/admin", adminRoutes);



connectDB();

require("./cron/weeklyReminder");

app.get('/', (req, res) => {
  res.send('MindSpace backend is running ');
});


app.listen(PORT, () => {
  console.log(`Server is running on Port: ${PORT} `);
});