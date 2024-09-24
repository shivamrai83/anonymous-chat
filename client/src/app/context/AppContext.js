"use client"
import React, { createContext, useState } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [chatType, setChatType] = useState('');
    const [personalChatSocketId, setPersonalChatSocketId] = useState(null);

  return (
    <AppContext.Provider 
      value={
        { chatType, 
          setChatType,
          personalChatSocketId,
          setPersonalChatSocketId,
        }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
