"use client";

import socketIO from 'socket.io-client';

const socket = socketIO.connect('http://localhost:4000');
console.log("Socket Instance***", socket);

export default socket;