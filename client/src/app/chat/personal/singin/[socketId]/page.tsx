'use client';
import { useContext, useState } from 'react';
import { AppContext } from '@/app/context/AppContext';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import socket from '../../../../../socket';

function SocketID() {
  const [socketExist, setSocketExists] = useState(false);
  const { socketId } = useParams();
  const router = useRouter()
  const { setPersonalChatSocketId, personalChatSocketId } = useContext(AppContext);
  useEffect(() => {
    console.log('Socket Users 1', personalChatSocketId);
    console.log('Socket Users 2', personalChatSocketId);
    if(socketId){
      console.log('Socket Users 3', personalChatSocketId);
      socket.emit('PERSONAL_SOCKET_ID', {to: socketId, from: socket.id})
      setPersonalChatSocketId(socketId);
      router.push(`/chat/personal/singin`, { scroll: false })
      // if(!personalChatSocketId){
      // }
    // } else{
    //   setSocketExists(true);
    // }
  }},[socketId])
  return <div> {socketExist ? `Already room is occupied with 2 people use Group chat for multiple users` :`Loading... ${socketId}`}</div>;
}

export default SocketID;