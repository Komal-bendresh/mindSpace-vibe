const mongoose = require('mongoose');

const connectDB = async () => {
   try {
     await mongoose.connect(process.env.MongoDB_URL,{
          useNewUrlParser: true,
          useUnifiedTopology: true,
     })
   } catch (error) {
    console.log("Error occued while connecting to database",error);
     process.exit(1);
   }
}


module.exports = connectDB;