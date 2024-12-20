"use client";

import React, {useEffect, useState, FormEventHandler, ChangeEvent, useContext} from 'react';
import { useRouter } from 'next/navigation'

import ChatBar from '../../../components/Chat/ChatBar';
import ChatBody from '../../../components/Chat/ChatBody';
import ChatFooter from '../../../components/Chat/ChatFooter';
import { AppContext } from '@/app/context/AppContext';
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
    const [textMessage, setTextMessage] = useState<string>('');
    const [timer, setTimer] = useState<ReturnType<typeof setTimeout> | null>(null);
    const { setPersonalChatSocketId } = useContext(AppContext);
    const router = useRouter();
    
    useEffect(() => {
      console.log('Socket message response UseEffect', messages);
      socket.on('messageResponse', (data: any) => setMessages([...messages, data]));
      socket.on('PERSONAL_ONLINE_USERS', (data: any) => setActiveUsers(data));
    }, [socket, messages]);

    useEffect(()=>{   
      socket.emit('PERSONAL_NEW_USER', []);
    },[socket])
    
    // chat body func
    const handleLeaveChat = () => {
      localStorage.removeItem('userName');
      socket.emit('PERSONAL_DISCONNECT_USER', socket.id)
      router.push('/', { scroll: false })
    };

    // chat footer funcTION
    const handleSendMessage: FormEventHandler<HTMLFormElement> = (e ) => {
      e.preventDefault();
      if (textMessage.trim() && localStorage.getItem('userName')) {
        socket.emit('PERSONAL_MESSAGE', {
          text: textMessage,
          name: localStorage.getItem('userName'),
          id: `${socket.id}${Math.random()}`,
          socketID: socket.id,
        });
      }
      setTextMessage('');
    };
  
   const handleOnchange = (e: ChangeEvent<HTMLInputElement>) => {
    socket.emit('PERSONAL_TYPING',  `${localStorage.getItem('userName') || 'Someone'} is typing`)
    if(timer) clearTimeout(timer);
    const timeout = setTimeout(() => {
      socket.emit('PERSONAL_TYPING', '')
    }, 1000)
    setTimer(timeout);
    setTextMessage(e.target.value);
   };
   console.log('active', activeUsers);
    return (
      <div className="chat">
        <ChatBar users={activeUsers} />
        <div className="chat__main">
          <ChatBody messages={messages} handleLeaveChat={handleLeaveChat} chatType='PERSONAL'/>
          <ChatFooter handleOnchange={handleOnchange} handleSendMessage={handleSendMessage} textMessage={textMessage}/>
        </div>
      </div>
    );
  };

  export default ChatPage;