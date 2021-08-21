const mongoose = require('mongoose');
const config = require('config');

const url = config.get('mongoURI');

const connectDB = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log('database connected successfully.');
  } catch (err) {
    console.error(err.message);
    //exit with failure
    process.exit(1);
  }
};

module.exports = connectDB;
