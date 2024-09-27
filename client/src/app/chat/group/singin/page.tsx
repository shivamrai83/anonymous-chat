"use client";
import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/navigation'
import "../../../globals.css";

import socket from '../../../../socket';
import { AppContext } from '../../../context/AppContext';

const Home = () => {
  const { chatType } = React.useContext(AppContext);

  const [userName, setUserName] = useState('');
  const router = useRouter()
   
  useEffect(()=>{
    if(localStorage.getItem('userName')){
      socket.emit(`${chatType.toUpperCase().replace('/', '')}_NEW_USER`, { userName, socketID: socket.id });
    }
  }, [])

  const handleSubmit = (e: any) => {
    e.preventDefault();
    localStorage.setItem('userName', userName);
    socket.emit(`${chatType.toUpperCase().replace('/', '')}_NEW_USER`, { userName, socketID: socket.id });
    router.push(`/chat${chatType}`, { scroll: false })
  };

  return (
    <>
      <form className="home__container" onSubmit={handleSubmit}>
        <h2 className="home__header">Sign in to {chatType.replace('/', '')} Chat</h2>
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
    </>
  );
};

export default Home;