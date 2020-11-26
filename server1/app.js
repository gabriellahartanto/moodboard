const express = require('express');
const app = express();
const port = 3000;

const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log(`${socket.id} user connected`);
  socket.on('mouse', (data) => {
    socket.broadcast.emit('mouse', data);
  });
});

server.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

