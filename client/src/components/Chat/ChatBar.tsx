import React, { useContext } from 'react';
import { AppContext } from '@/app/context/AppContext';
import "../../app/globals.css";

interface ChatBarProps {
  users: string[];
}

const ChatBar: React.FC<ChatBarProps> = ({ users }) => {
  const { chatType } = useContext(AppContext);

  return (
    <div className="chat__sidebar">
      <h2 className='chat__header'>{chatType.replace('/', '').toUpperCase() || 'Open'} CHAT</h2>

      <div>
        <h4 className="chat__header">ACTIVE USERS</h4>
        <div className="chat__users">
          {users.map((user, index) => (
            <h3 key={index}>{user}</h3>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatBar;
