const mongoose = require('mongoose');

const connectToDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB host: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectToDb;
