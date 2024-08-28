import React, { Key } from 'react';
import { useRouter } from 'next/navigation'
import "../../app/globals.css";


type Messages = {
    text: String;
    id: String;
    name: String;
}

const ChatBody = (messages: {messages: Messages[]}) => {
    const router = useRouter()

  const handleLeaveChat = () => {
    localStorage.removeItem('userName');
    router.push('/', { scroll: false })
    window.location.reload();
  };
  // console.log('mjjjj', messages);
  
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
          <p>Someone is typing...</p>
        </div>
      </div>
    </>
  );
};

export default ChatBody;