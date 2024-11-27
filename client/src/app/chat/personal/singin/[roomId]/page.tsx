'use client';
import { useContext, useState } from 'react';
import { AppContext } from '@/app/context/AppContext';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import socket from '../../../../../socket';

function SocketID() {
  const { roomId } = useParams();
  const router = useRouter()
  const { setRoomId, socketExist, setSocketExists, setJoinedViaLink } = useContext(AppContext);
  
  useEffect(() => {
    if(roomId){
      socket.emit('joinRoom', roomId);
      setRoomId(roomId);
      setJoinedViaLink(true);
      router.push(`/chat/personal/singin`, { scroll: false })
  }},[roomId])
  useEffect(() => {

  }, [])
  return <div> {socketExist ? `Already room is occupied with 2 people use Group chat for multiple users` :`Loading... ${roomId}`}</div>;
}

export default SocketID;