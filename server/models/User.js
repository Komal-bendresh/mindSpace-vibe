const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name :{
        type:String,
        required: [true, "Name is required"],
    },
    email:{
        type:String,
        required: [true, "Email is required"],
         unique: true,
    },
    password:{
        type:String,
        required: [true, "Password is required"],
    },
    role:{
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    verified: {
      type: Boolean,
      default: false
    },
    receiveEmails: {
     type: Boolean,
     default: true,
    },
    streak: {
     type: Number,
     default: 0,
    },
    lastEntryDate: {
     type: Date,
    default: null,
    } ,
    badges: [String],

    playlistLimit: {
      count: { 
        type: Number, 
        default: 0 
      },
      lastUsed: { type: Date },
    },
    savedPlaylists:
     [{ url: String, 
      mood: String,
       date: Date }],
    isPremium: {
      type: Boolean,
      default: false,
    },



},
  { timestamps: true }
)

module.exports = mongoose.model("User", userSchema);