const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const PORT = process.env.BACKEND_PORT;

const http = require('http').Server(app);
const cors = require('cors');

const socketIO = require('socket.io')(http, {
  cors: {
    origin: process.env.SOCKET_CLIENT
  }
});
app.use(cors());
let onlineUsers = [];
let personalOnlineUsers = [];

socketIO.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`, onlineUsers);
  //GLOBAL CHAT
  socket.on('GLOBAL_NEW_USER', (data) => {
    console.log('inside global user', data);
    if(Object.keys(data).length){
      if(!onlineUsers.some((user)=> user.socketID === data.socketID)){
        onlineUsers.push(data);
      };
    }
    socketIO.emit('GLOBAL_ONLINE_USERS', onlineUsers.map(user => user.userName));
  });

  socket.on('GLOBAL_TYPING', (data) => {
    socketIO.emit('GLOBAL_TYPING', data)
  })

  socket.on('GLOBAL_MESSAGE', (data) => {
    console.log('listen',data);
    socketIO.emit('messageResponse', data);
  });

  socket.on('GLOBAL_DISCONNECT_USER',(socketId)=>{
    onlineUsers = onlineUsers.filter((user) => user.socketID !== socketId)
    socketIO.emit('GLOBAL_ONLINE_USERS', onlineUsers.map(user => user.userName));
    console.log('🔥: A user disconnected', onlineUsers);
  })

  socket.on('disconnect', () => {
    personalOnlineUsers = personalOnlineUsers.filter((user) => user.socketID !== socket.id)
    socketIO.emit('GLOBAL_ONLINE_USERS', personalOnlineUsers.map(user => user.userName));
    console.log('🔥: A user disconnected', personalOnlineUsers);
  });

  //PERSONAL CHAT SOCKETS
  socket.on('PERSONAL_SOCKET_ID', (data) => {
    socketIO.emit('PERSONAL_SOCKETID_TO_CLIENT', data) //find a place to update this at client 
  })

  socket.on('PERSONAL_NEW_USER', (data) => {
    console.log('inside personal user', data);

    if(Object.keys(data).length){
      if(!personalOnlineUsers.some((user)=> user.socketID === data.socketID)){
        personalOnlineUsers.push(data);
      };
    }
    socketIO.emit('PERSONAL_ONLINE_USERS', personalOnlineUsers.map(user => user.userName));
  });

  socket.on('PERSONAL_TYPING', (data) => {
    socketIO.emit('PERSONAL_TYPING', data)
  })

  socket.on('PERSONAL_MESSAGE', (data) => {
    console.log('listen',data);
    socketIO.emit('messageResponse', data);
  });

  socket.on('PERSONAL_DISCONNECT_USER',(socketId)=>{
    personalOnlineUsers = personalOnlineUsers.filter((user) => user.socketID !== socketId)
    socketIO.emit('PERSONAL_ONLINE_USERS', personalOnlineUsers.map(user => user.userName));
    console.log('🔥: A user disconnected', personalOnlineUsers);
  })

});


http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});