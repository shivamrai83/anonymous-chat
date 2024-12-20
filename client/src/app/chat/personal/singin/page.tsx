"use client";
import React, { useEffect, useState, useContext, useRef } from 'react';
import { useRouter } from 'next/navigation';
import copy from "copy-to-clipboard";

import "../../../globals.css";
import socket from '../../../../socket';
import { AppContext } from '../../../context/AppContext';

const SingIn = () => {
  const { chatType, roomId, joinedViaLink } = useContext(AppContext);
  const textRef = useRef<HTMLInputElement>(null);

  const [userName, setUserName] = useState('');
  const [showCopy, setShowCopy] = useState(true);
  const [showLink, setShowLink] = useState(true);
  const [joinLink, setJoinLink] = useState('');

  const router = useRouter()
  console.log('personalChatSocketId', roomId )

  // refresh wala code
  useEffect(()=>{
  //   if(localStorage.getItem('userName')){
  //     socket.emit(`PERSONAL_NEW_USER`, { userName, socketID: socket.id });
  //   } else if(personalChatSocketId === null) {
  //     //not a valid link 
  //     console.log('not a valid link')
  //   } else{
  //   }
    socket.on('roomJoined', (room: string) => {
      console.log('Joined room:', room);
    });
    socket.on('roomError', (error: boolean) => {
      if(error){
        console.log("error happened******", error);
      }
    });
    if(joinedViaLink){
      setShowLink(false);
    }
  }, [])

  

  useEffect(()=>{
   setJoinLink(`${process.env.NEXT_PUBLIC_CLIENT_URL}/chat/personal/singin/${roomId}`);
  }, [])

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if(userName){
      localStorage.setItem('userName', userName);
      socket.emit('PERSONAL_NEW_USER', { userName, socketID: socket.id });
      router.push(`/chat/personal`, { scroll: false })
    }
  };
  const copyToClipboard = () => {
    socket.emit('joinRoom', roomId);
    if (textRef.current) {
      const copyText = textRef.current.value;
      console.log(copyText)
      const isCopy = copy(copyText);
      if (isCopy) {
        setShowCopy(false);
        setTimeout(() => {
          console.log('timeout')
          setShowLink(false);
        }, 1000);
      }
    }
  };
  

  return (
    <>
       {!showLink ? <div className="home__container">
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
          </div>
        :
        <div className="home__container">
          <h2 className="home__header">Copy the below link to invite for personal chat</h2>
            <input 
              type="text"
              disabled
              ref={textRef}
              value={joinLink}
              name="url"
              id="url"
              className="username__input"
            />
            {showCopy ? 
              <button className='home__cta' onClick={copyToClipboard}>Copy</button>
              : <h2>Successfully Copied...</h2>
            }
          </div>}
    </>
  );
};

export default SingIn;