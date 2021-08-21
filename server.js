const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./config/db');

//connect db
connectDB();

//port definition
const PORT = process.env.PORT || 5000;

//MIDDLEWARE

//PARSE JSON BODIES
app.use(express.json({ extended: false }));

//CORS SETUP
//this will set the headers automatically
app.use(cors());

//IF CORS PACKAGE NOT INSTALLED.
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Headers', '*');
//   next();
// });

//defining Routes
app.use('/api/v1/message', require('./routes/api/messages'));

app.listen(PORT, () => {
  console.log(`server is listening to port${PORT}`);
});
