"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import "../globals.css";

import socket from '../../socket';

const Home = () => {
  const [userName, setUserName] = useState('');
  const router = useRouter()
   
  useEffect(()=>{
    if(localStorage.getItem('userName')){
      socket.emit('newUser', { userName, socketID: socket.id });
    }
  }, [])

  const handleSubmit = (e: any) => {
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