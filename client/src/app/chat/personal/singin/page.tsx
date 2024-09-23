"use client";
import React, { useEffect, useState, useContext, useRef, MutableRefObject } from 'react';
import { useRouter } from 'next/navigation';
import copy from "copy-to-clipboard";

import "../../../globals.css";
import socket from '../../../../socket';
import { AppContext } from '../../../context/AppContext';

const Home = () => {
  const { chatType } = useContext(AppContext);
  const textRef = useRef<HTMLInputElement>(null);

  const [userName, setUserName] = useState('');
  const [showCopy, setShowCopy] = useState(true);
  const router = useRouter()
   
  useEffect(()=>{
    if(localStorage.getItem('userName')){
      socket.emit(`${chatType.toUpperCase().replace('/', '')}_NEW_USER`, { userName, socketID: socket.id });
    }
  }, [])

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if(userName){
      localStorage.setItem('userName', userName);
      socket.emit(`PERSONAL_NEW_USER`, { userName, socketID: socket.id });
      router.push(`/chat/personal`, { scroll: false })
    }
  };
  const copyToClipboard = () => {
    if (textRef.current) {
      const copyText = textRef.current.value;
      console.log(copyText)
      const isCopy = copy(copyText);
      if (isCopy) {
        setShowCopy(false);
      }
    }
  };
  

  return (
    <>
      <div className="home__container">
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
        <button className="home__cta" onClick={handleSubmit}>SIGN IN</button>
        <h2 className="home__header">Copy the below link to invite for personal chat</h2>
        <input 
          type="text"
          disabled
          ref={textRef}
          value={'http://localhost:3000/chat/personal/singin'}
          name="url"
          id="url"
          className="username__input"
        />
        {showCopy ? 
          <button className='home__cta' onClick={copyToClipboard}>Copy</button>
          : <h2>Successfully Copied...</h2>}
      </div>
      {/* <div className="home__container"> */}
      {/* </div> */}
    </>
  );
};

export default Home;