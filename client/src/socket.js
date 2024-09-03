"use client";

import socketIO from 'socket.io-client';

const socket = socketIO.connect(process.env.SOCKET_SERVER);
console.log("Socket Instance***", socket, process.env.SOCKET_SERVER);

export default socket;