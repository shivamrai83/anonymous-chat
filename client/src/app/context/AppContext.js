"use client"
import React, { createContext, useState } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [chatType, setChatType] = useState('');

  return (
    <AppContext.Provider value={{ chatType, setChatType }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
