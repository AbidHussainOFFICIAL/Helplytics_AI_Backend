const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Connection Error: ${error.message}`);
    if (error.message.includes('DSDNS')) {
       console.error('Check MongoDB Atlas Network Access/IP Whitelist!');
    }
    process.exit(1);
  }
};

module.exports = connectDB;