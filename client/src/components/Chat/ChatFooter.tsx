import React, { FormEventHandler, ChangeEvent, useState } from 'react';
import "../../app/globals.css";
import socket from '../../socket';

const ChatFooter = () => {
  const [message, setMessage] = useState<string>('');
  const [timer, setTimer] = useState<number | null>(null);

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

 const handleOnchange = (e: ChangeEvent<HTMLInputElement>) => {
  socket.emit('typing',  `${localStorage.getItem('userName') || 'Someone'} is typing`)
  clearTimeout(timer);
  const timeout = setTimeout(() => {
    socket.emit('typing', '')
  }, 1000)
  setTimer(timeout);
  setMessage(e.target.value);
 };

  return (
    <div className="chat__footer">
      <form className="form" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Write message"
          className="message"
          value={message}
          onChange={handleOnchange}
        />
        <button className="sendBtn">SEND</button>
      </form>
    </div>
  );
};

export default ChatFooter;