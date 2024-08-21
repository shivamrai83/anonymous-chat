"use client";

import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import styles from "./page.module.css";

// Create the socket instance once
const socket = io('http://localhost:3001'); // Replace with your server URL

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    console.log('useEffect listen');

    const handleMessage = (message) => {
      console.log('inside socket', message);
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    socket.on('chat message', handleMessage);

    return () => {
      socket.off('chat message', handleMessage);
    };
  }, []);

  const sendMessage = () => {
    console.log('send');
    socket.emit('chat message', newMessage);
    setNewMessage('');
  };

  console.log(messages);

  return (
    <main className={styles.main}>
      <div>
        <h1>Real-Time Chat</h1>
        <div>
          {messages.map((message, index) => (
            <div key={index}>{message}</div>
          ))}
        </div>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </main>
  );
}
