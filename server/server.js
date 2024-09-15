const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const PORT = process.env.BACKEND_PORT;

//New imports
const http = require('http').Server(app);
const cors = require('cors');

const socketIO = require('socket.io')(http, {
  cors: {
      origin: process.env.SOCKET_CLIENT
  }
});
let onlineUsers = [];
//Add this before the app.get() block
socketIO.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`, onlineUsers);

  socket.on('newUser', (data) => {
    console.log('inside new User', data)
    if(Object.keys(data).length){
      console.log('inside new User Object.keys(data).length',Object.keys(data).length, data)
      if(!onlineUsers.some((user)=> user.socketID === data.socketID)){
        console.log('inside new User if', data)
        onlineUsers.push(data);
      };
    }
    socketIO.emit('Online-Users', onlineUsers.map(user => user.userName));
  });

  socket.on('typing', (data) => {
    socketIO.emit('typing', data)
  })

  socket.on('message', (data) => {
    console.log('listen',data);
    socketIO.emit('messageResponse', data);
  });

  socket.on('Disconnect-User',(socketId)=>{
    onlineUsers = onlineUsers.filter((user) => user.socketID !== socketId)
    socketIO.emit('Online-Users', onlineUsers.map(user => user.userName));
    console.log('🔥: A user disconnected', onlineUsers);
  })


  socket.on('disconnect', () => {
    onlineUsers = onlineUsers.filter((user) => user.socketID !== socket.id)
    socketIO.emit('Online-Users', onlineUsers.map(user => user.userName));
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