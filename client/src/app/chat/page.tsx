"use client";

import React, {useEffect, useState} from 'react';
import ChatBar from '../../components/chat/ChatBar';
import ChatBody from '../../components/chat/ChatBody';
import ChatFooter from '../../components/chat/ChatFooter';

import socketIO from 'socket.io-client';
const socket = socketIO.connect('http://localhost:4000');

const ChatPage = () => {
    const [messages, setMessages] = useState([]);
  
    useEffect(() => {
      socket.on('messageResponse', (data) => setMessages([...messages, data]));
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