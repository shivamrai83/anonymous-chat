// // server/server.js
// const http = require('http');
// const server = http.createServer((req, res) => {
//   // Handle HTTP requests if needed
// });

// const { Server } = require('socket.io');
// const io = new Server(server, {
//     cors: {
//       origin: "http://localhost:3000", // Update with your client app's URL
//       methods: ["GET", "POST"],
//     },
//   });
  
// io.on('connection', (socket) => {
//   console.log('A user connected');
  
//   // Handle chat messages
//   socket.on('chat message', (message) => {
//     io.emit('chat message', message); // Broadcast the message to all connected clients
//   });

//   socket.on('disconnect', () => {
//     console.log('A user disconnected');
//   });
// });

// server.listen(3001, () => {
//   console.log('WebSocket server listening on port 3001');
// });

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

//Add this before the app.get() block
socketIO.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
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