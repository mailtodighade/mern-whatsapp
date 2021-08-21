const express = require('express');
const Pusher = require('pusher');
const mongoose = require('mongoose');
const router = express.Router();
const Message = require('../../models/Message.js');

//checks weather database is connected or not.
const db = mongoose.connection;

//pusher configuration.
pusher = new Pusher({
  appId: '1201286',
  key: '12e438dcf55b80f09ffc',
  secret: '43f52e8ebce6fe486587',
  cluster: 'ap2',
  useTLS: true,
});

//?if db connected then it will fire this function.
db.once('open', () => {
  console.log('db is open and connected:');

  //?creates a instance of our collection.
  const msgCollection = db.collection('messagecontents');

  //this will watch of any change in the collection.
  const changeStream = msgCollection.watch();

  changeStream.on('change', change => {
    console.log('change in the collection: ', change);
    if (change.operationType === 'insert') {
      let messageDetails = change.fullDocument;

      console.log('message:', messageDetails);
      pusher.trigger('messages', 'inserted', {
        _id: messageDetails._id,
        message: messageDetails.message,
        name: messageDetails.name,
        received: messageDetails.received,
      });
    } else {
      console.log('something wrong with the pusher');
    }
  });
});

//@route:   GET '/'
//@desc: this route is to list the message from the whatsapp.
//@access: PRIVATE

router.get('/sync', async (req, res) => {
  try {
    let messages = await Message.find({});
    res.status(200).json({ data: messages, msg: 'received list of messages.' });
  } catch (error) {
    console.error(err.message);
    res.status(500).json({ data: null, msg: 'internal server error' });
  }
});

//@route:   POST '/message/new'
//@desc: this route is to save the message from the whats app.
//@access: PRIVATE

router.post('/new', async (req, res) => {
  const { message, name, timestamp, received } = req.body;

  try {
    const payload = { message, name, timestamp, received };

    console.log('payload::::::::::', payload);

    //create a instance of the schema model
    const newMessage = new Message(payload);
    let response = await newMessage.save();

    res.status(201).json({ data: response, msg: 'added message successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ data: null, msg: 'internal server error' });
  }
});

module.exports = router;
