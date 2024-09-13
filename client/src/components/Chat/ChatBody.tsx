import React, { Key, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import "../../app/globals.css";
import socket from '../../socket';


type Messages = {
    text: String;
    id: String;
    name: String;
}

const ChatBody = (messages: {messages: Messages[]}) => {
  const router = useRouter();
  const [typingUser, setTypingUser] = useState('');

  const handleLeaveChat = () => {
    localStorage.removeItem('userName');
    socket.emit('disconnect', socket.id)
    router.push('/', { scroll: false })
    // window.location.reload();
  };
  useEffect(()=>{
    socket.on('typing', (data: string)=> setTypingUser(data))
  },[socket])
  
  return (
    <>
      <header className="chat__mainHeader">
        <p>Hangout with Colleagues</p>
        <button className="leaveChat__btn" onClick={handleLeaveChat}>
          LEAVE CHAT
        </button>
      </header>

      <div className="message__container">
        {messages.messages.map((message) =>
          message.name === localStorage.getItem('userName') ? (
            <div className="message__chats" key={message.id as Key}>
              <p className="sender__name">You</p>
              <div className="message__sender">
                <p>{message.text}</p>
              </div>
            </div>
          ) : (
            <div className="message__chats" key={message.id as Key}>
              <p>{message.name}</p>
              <div className="message__recipient">
                <p>{message.text}</p>
              </div>
            </div>
          )
        )}

        <div className="message__status">
          <p>{typingUser.includes(`${localStorage.getItem('userName')}`) ? '' : typingUser}</p>
        </div>
      </div>
    </>
  );
};

export default ChatBody;