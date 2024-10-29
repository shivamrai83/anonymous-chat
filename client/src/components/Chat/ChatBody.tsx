import React, { Key, useEffect, useState } from 'react';
import "../../app/globals.css";
import socket from '../../socket';


type Messages = {
  text: String;
  id: String;
  name: String;
}
interface ChatBodyProps {
  messages: Messages[];
  handleLeaveChat: (event: React.MouseEvent<HTMLButtonElement>) => void;
  chatType: string;
}

const ChatBody: React.FC<ChatBodyProps> = (props) => {
  const [typingUser, setTypingUser] = useState<string>('');
  const [userName, setUserName] = useState<string>('');

  useEffect(()=>{
      //client side render to set local storage
    setUserName(localStorage.getItem('userName') || '');
    socket.on(`${props.chatType}_TYPING`, (data: string)=> setTypingUser(data))
  },[socket])
  
  return (
    <>
      <header className="chat__mainHeader">
        <p className='chat__header'>Hangout with Colleagues</p>
        <button className="leaveChat__btn" onClick={props.handleLeaveChat}>
          LEAVE CHAT
        </button>
      </header>

      <div className="message__container">
        {props.messages.map((message) =>
          message.name === localStorage.getItem('userName') ? (
            <div className="message__chats" key={message.id as Key}>
              <p className="sender__name_you">You</p>
              <div className="message__sender">
                <p>{message.text}</p>
              </div>
            </div>
          ) : (
            <div className="message__chats" key={message.id as Key}>
              <p className='sender__name_other'>{message.name}</p>
              <div className="message__recipient">
                <p>{message.text}</p>
              </div>
            </div>
          )
        )}

        <div className="message__status">
          <p>{typingUser.includes(userName) ? '' : typingUser}</p>
        </div>
      </div>
    </>
  );
};

export default ChatBody;