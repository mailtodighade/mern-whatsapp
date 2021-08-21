import React, { useState } from 'react';
import './Chat.css';
import { Avatar, IconButton, makeStyles, useStyles } from '@material-ui/core';
import EmojiEmotionsOutlinedIcon from '@material-ui/icons/EmojiEmotionsOutlined';
import instance from '../axios';
//icons
import SearchIcon from '@material-ui/icons/Search';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AttachFileOutlinedIcon from '@material-ui/icons/AttachFileOutlined';
import MicOutlinedIcon from '@material-ui/icons/MicOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import e from 'cors';

function Chat({ messages }) {
  const [textInput, setTextInput] = useState('');

  //  const classes = useStyles();

  function scrollWin() {
    window.scrollBy(0, 100);
  }

  const handleSubmit = e => {
    e.preventDefault();
    const payload = {
      name: 'neeraj',
      timestamp: new Date().toLocaleTimeString().substring(0, 5),
      message: textInput,
      received: false,
    };

    const body = JSON.stringify(payload);

    const config = {
      headers: {
        'content-type': 'application/json',
      },
    };

    instance
      .post('/api/v1/message/new', body, config)
      .then(response => console.log('response from the server: ', response))
      .catch(err => console.error(err.message));

    //? nullify the value of inputTest
    setTextInput('');

    //TODO: implement the auto scroll down functionality as soon as message appears
  };

  return (
    <div className={`chat`}>
      <div className={`chat__header`}>
        <Avatar src='https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50' />

        <div className='chat__headerInfo'>
          <h3>chat room</h3>
          <p>last seen..</p>
        </div>
        <div className='chat__headerRight'>
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className='chat__body'>
        {messages.map(message => {
          return (
            <React.Fragment key={message._id}>
              <p
                className={`chat__message ${
                  message.received ? 'chat__receiver' : ''
                }`}
              >
                <span className='chat__name'>{message.name}</span>
                {message.message}
                <span className='chat__timestamp'>{message.timestamp}</span>
              </p>
            </React.Fragment>
          );
        })}
      </div>
      <div className='chat__footer'>
        <IconButton>
          <EmojiEmotionsOutlinedIcon />
        </IconButton>
        <IconButton>
          <AttachFileOutlinedIcon />
        </IconButton>

        <div className='chat__searchContainer'>
          <form onSubmit={e => handleSubmit(e)}>
            <IconButton>
              <SearchOutlinedIcon />
            </IconButton>
            <input
              type='text'
              placeholder='write something'
              value={textInput}
              onChange={e => {
                setTextInput(e.target.value);
              }}
            />
          </form>
        </div>

        <IconButton>
          <MicOutlinedIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default Chat;
