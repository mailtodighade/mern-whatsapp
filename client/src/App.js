import React, { useEffect, useState } from 'react';
import Pusher from 'pusher-js';
import './App.css';
import Chat from './components/Chat';
import Sidebar from './components/Sidebar';
import instance from './axios';

/**
 * TODO:  get the configuration done for the pusher:
 * TODO: get the call from the axios to receive messages. 
 * FIXME: something we need to fix over here. 
 * ! --save is deprecated! 
 *? should this be allowed. ??? 

 * 
**/
function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    instance
      .get('/api/v1/message/sync')
      .then(response => {
        setMessages(response.data.data);
      })
      .catch(error => {
        console.error(error.message);
      });
  }, []);

  useEffect(() => {
    // Enable pusher logging - don't include this in production
    //Pusher.logToConsole = true;

    const pusher = new Pusher('12e438dcf55b80f09ffc', {
      cluster: 'ap2',
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', function (data) {
      setMessages([...messages, data]);
    });

    //? this is to unsubscribe the event.
    return () => {
      channel.unsubscribe();
    };
  }, [messages]);

  console.log('messages state is here: ', messages);

  return (
    <div className='app'>
      <div className='app__subdiv'></div>
      <div className='app__body'>
        <Sidebar />
        <Chat messages={messages} />
      </div>
    </div>
  );
}

export default App;
