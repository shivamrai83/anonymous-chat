"use client";

import React, {useEffect, useState} from 'react';
import ChatBar from '../../components/chat/ChatBar';
import ChatBody from '../../components/chat/ChatBody';
import ChatFooter from '../../components/chat/ChatFooter';
import "../globals.css";


import socketIO from 'socket.io-client';
// @ts-ignore
const socket = socketIO.connect('http://localhost:4000');

type Messages = {
    text: String;
    id: String;
    name: String;
}

const ChatPage = () => {
    const [messages, setMessages] = useState<Messages []>([]);
    
    useEffect(() => {
        console.log('Socket message response UseEffect', messages);
      socket.on('messageResponse', (data: any) => setMessages([...messages, data]));
    }, [socket, messages]);
  
    return (
      <div className="chat">
        <ChatBar />
        <div className="chat__main">
          <ChatBody messages={messages} />
          <ChatFooter />
        </div>
      </div>
    );
  };

  export default ChatPage;