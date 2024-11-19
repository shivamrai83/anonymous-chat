"use client";

import React, {useEffect, useState} from 'react';
import ChatBar from '../../../components/Chat/ChatBar';
import ChatBody from '../../../components/Chat/ChatBody';
import ChatFooter from '../../../components/Chat/ChatFooter';
import "../../globals.css";

import socket from '../../../socket';

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
      socket.on('GLOBAL_ONLINE_USERS', (data: any) => setActiveUsers(data));
    }, [socket, messages]);

    useEffect(()=>{
      console.log('socket changed.');
      
      socket.emit('GLOBAL_NEW_USER', []);
    },[socket])
    
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