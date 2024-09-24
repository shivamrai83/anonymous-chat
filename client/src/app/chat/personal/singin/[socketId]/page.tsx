'use client';
import { useContext } from 'react';
import { AppContext } from '@/app/context/AppContext';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

function UserDetails() {
  const { socketId } = useParams();
  const router = useRouter()
  const { setPersonalChatSocketId } = useContext(AppContext);

  useEffect(() => {
    if(socketId){
      setPersonalChatSocketId(socketId);
      router.push(`/chat/personal/singin`, { scroll: false })
    }
  },[socketId])
  return <div>Loading... {socketId}</div>;
}

export default UserDetails;