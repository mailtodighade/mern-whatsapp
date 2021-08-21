const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const messageSchema = Schema({
  message: {
    type: String,
  },
  name: {
    type: String,
  },
  timestamp: {
    type: String,
  },
  received: {
    type: Boolean,
  },
});

module.exports = mongoose.model('messagecontent', messageSchema);
