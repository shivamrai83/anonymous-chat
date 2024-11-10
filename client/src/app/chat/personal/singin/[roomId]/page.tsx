'use client';
import { useContext, useState } from 'react';
import { AppContext } from '@/app/context/AppContext';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import socket from '../../../../../socket';

function SocketID() {
  const { roomId } = useParams();
  const router = useRouter()
  const { setRoomId, socketExist, setSocketExists } = useContext(AppContext);
  
  useEffect(() => {
    console.log('Socket Users 1', roomId);
    console.log('Socket Users 2', roomId);
    if(roomId){
      console.log('Socket Users 3', roomId);
      socket.emit('joinRoom', roomId);
      setRoomId(roomId);
      router.push(`/chat/personal/singin`, { scroll: false })
      // if(!personalChatSocketId){
      // }
      // } else{
      //   setSocketExists(true);
      // }
  }},[roomId])
  useEffect(() => {

  }, [])
  return <div> {socketExist ? `Already room is occupied with 2 people use Group chat for multiple users` :`Loading... ${roomId}`}</div>;
}

export default SocketID;