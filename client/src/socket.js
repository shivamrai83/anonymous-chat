"use client";

import socketIO from 'socket.io-client';

const socket = socketIO.connect(process.env.NEXT_PUBLIC_SOCKET_SERVER);
console.log("Socket Instance", socket);

export default socket;