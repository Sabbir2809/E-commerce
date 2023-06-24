// Dependencies
const mongoose = require('mongoose');

// MongoDB Connection
const connectDB = async (options = {}) => {
  try {
    // connect
    await mongoose.connect(process.env.MONGODB_URL, options);
    console.log(`Connect to MongoDB is Successfully`);
    // event
    mongoose.connection.on('error', (error) => {
      console.error('Database Connection Error: ', error.message);
    });
  } catch (error) {
    console.error('Could Not Connect to MongoDB: ', error.message);
  }
};

// exports
module.exports = connectDB;
