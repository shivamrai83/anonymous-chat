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
let onlineUsers = [];

socketIO.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`, onlineUsers);
  //GLOBAL CHAT
  socket.on('GLOBAL_NEW_USER', (data) => {
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

  //PERSONAL CHAT
  socket.on('PERSONAL_NEW_USER', (data) => {
    if(Object.keys(data).length){
      if(!onlineUsers.some((user)=> user.socketID === data.socketID)){
        onlineUsers.push(data);
      };
    }
    socketIO.emit('PERSONAL_ONLINE_USERS', onlineUsers.map(user => user.userName));
  });

  socket.on('PERSONAL_TYPING', (data) => {
    socketIO.emit('PERSONAL_TYPING', data)
  })

  socket.on('PERSONAL_MESSAGE', (data) => {
    console.log('listen',data);
    socketIO.emit('messageResponse', data);
  });

  socket.on('PERSONAL_DISCONNECT_USER',(socketId)=>{
    onlineUsers = onlineUsers.filter((user) => user.socketID !== socketId)
    socketIO.emit('PERSONAL_ONLINE_USERS', onlineUsers.map(user => user.userName));
    console.log('🔥: A user disconnected', onlineUsers);
  })

  socket.on('disconnect', () => {
    onlineUsers = onlineUsers.filter((user) => user.socketID !== socket.id)
    socketIO.emit('PERSONAL_ONLINE_USERS', onlineUsers.map(user => user.userName));
    console.log('🔥: A user disconnected', onlineUsers);
  });
});

app.use(cors());

app.get('/api', (req, res) => {
  res.json({
    message: 'Hello world',
  });
});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});