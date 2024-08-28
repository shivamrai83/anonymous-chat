const express = require('express');
const app = express();
const PORT = 4000;

//New imports
const http = require('http').Server(app);
const cors = require('cors');

const socketIO = require('socket.io')(http, {
  cors: {
      origin: "http://localhost:3000"
  }
});
let onlineUsers = [];
//Add this before the app.get() block
socketIO.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`, onlineUsers);

  socket.on('newUser', (data) => {
    if(Object.keys(data).length){
      if(!onlineUsers.some((user)=> user.socketID === data.socketID)){
        onlineUsers.push(data);
      };
    }
    socketIO.emit('Online-Users', onlineUsers.map(user => user.userName));
  });

  socket.on('message', (data) => {
    console.log('listen',data);
    socketIO.emit('messageResponse', data);
  });


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