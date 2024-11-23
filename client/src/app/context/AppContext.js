"use client"
import { v4 as uuidv4 } from 'uuid';
import React, { createContext, useState } from 'react';
const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [chatType, setChatType] = useState('');
    const [roomId, setRoomId] = useState(uuidv4());
    const [joinedViaLink, setJoinedViaLink] = useState(false);
    const [socketExist, setSocketExists] = useState(false);

  return (
    <AppContext.Provider 
      value={
        { chatType, 
          setChatType,
          roomId,
          setRoomId,
          socketExist,
          setSocketExists,
          joinedViaLink,
          setJoinedViaLink,
        }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
