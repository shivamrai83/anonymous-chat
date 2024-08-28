"use client";

import React, {useEffect, useState, useMemo} from 'react';
import ChatBar from '../../components/chat/ChatBar';
import ChatBody from '../../components/chat/ChatBody';
import ChatFooter from '../../components/chat/ChatFooter';
import "../globals.css";

import socket from '../../socket';

type Messages = {
    text: string;
    id: string;
    name: string;
}

const ChatPage = () => {
    const [messages, setMessages] = useState<Messages []>([]);
    const [activeUsers, setActiveUsers] = useState<string []>([]);
    
    useEffect(() => {
      console.log('Socket message response UseEffect', messages);
      socket.on('messageResponse', (data: any) => setMessages([...messages, data]));
      socket.on('Online-Users', (data: any) => setActiveUsers([...data]));
    }, [socket, messages]);

    useEffect(()=>{
      socket.emit('newUser', []);
    },[])
    
    return (
      <div className="chat">
        <ChatBar users={activeUsers} />
        <div className="chat__main">
          <ChatBody messages={messages} />
          <ChatFooter />
        </div>
      </div>
    );
  };

  export default ChatPage;