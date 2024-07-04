require('dotenv').config();

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB Database');
  } catch (err) {
    console.error(err);
    process.exit(1); // Ending process due to an error
  }
};

module.exports = connectDB;
