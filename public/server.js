var express = require('express');
var app = express();

var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

let messages = [];
let history = 50

io.on('connection', (socket) => {

  for(let k in messages){
  socket.emit('chat message', messages[k])};

  socket.on('chat message', (msg) => {
    messages.push(msg);

    if(messages.length > history){
      messages.shift();
    }
    io.emit('chat message', msg);
    console.log(msg)
  });
});

http.listen(8000, () => {
  console.log('listening on *:8000');
});
