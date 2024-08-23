import React, { FormEventHandler, useState } from 'react';
import socketIO from 'socket.io-client';
import "../../app/globals.css";
// @ts-ignore
const socket = socketIO.connect('http://localhost:4000');

const ChatFooter = () => {
  const [message, setMessage] = useState('');

  const handleSendMessage: FormEventHandler<HTMLFormElement> = (e ) => {
    e.preventDefault();
    if (message.trim() && localStorage.getItem('userName')) {
      socket.emit('message', {
        text: message,
        name: localStorage.getItem('userName'),
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });
    }
    setMessage('');
  };


  return (
    <div className="chat__footer">
      <form className="form" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Write message"
          className="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="sendBtn">SEND</button>
      </form>
    </div>
  );
};

export default ChatFooter;