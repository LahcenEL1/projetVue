
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://efrei:efrei@cluster0.ei6pprv.mongodb.net/?retryWrites=true&w=majority');
    console.log('MongoDB Connecté...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
