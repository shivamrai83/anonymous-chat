import React from 'react';
import "../../app/globals.css";

// Define the type for the props
interface ChatBarProps {
  users: string[];
}

const ChatBar: React.FC<ChatBarProps> = ({ users }) => {
  return (
    <div className="chat__sidebar">
      <h2>Open Chat</h2>

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
