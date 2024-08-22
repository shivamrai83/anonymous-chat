"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'

import socketIO from 'socket.io-client';
const socket = socketIO.connect('http://localhost:4000');
 
const Home = () => {
  const [userName, setUserName] = useState('');
  const router = useRouter()
   
  
  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('userName', userName);
    socket.emit('newUser', { userName, socketID: socket.id });
    router.push('/chat', { scroll: false })
  };
  return (
    <form className="home__container" onSubmit={handleSubmit}>
      <h2 className="home__header">Sign in to Open Chat</h2>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        minLength={6}
        name="username"
        id="username"
        className="username__input"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <button className="home__cta">SIGN IN</button>
    </form>
  );
};

export default Home;