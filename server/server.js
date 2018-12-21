const path = require('path'); // Don't have to install
const http = require('http'); // Don't have to install
const express = require('express');
const socketIO = require('socket.io');

//Instead of -dirname + '/../public'
// This results in \public instead of server\..\public
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);

// Integrating socket.io with our application gives us:
//  access to a route that accepts incoming websocket connections
//  access to a javascript library that makes it easy to work with socket.io
 // http://localhost:3000/socket.io/socket.io.js
var io = socketIO(server); // Get the websocket server

// Listen for a new connection. Each connection is another socket
io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage', {
    from: 'Admin',
    text: 'Welcome to the chat!',
    createdAt: new Date().getTime()
  });

  socket.broadcast.emit('newMessage', {
    from: 'Admin',
    text: 'A new user has entered the chat!',
    createdAt: new Date().getTime()
  });

  socket.on('createMessage', (message) => {
    console.log('createMessage',message)
    //socket.emit sends a message to a single connection while
    // io.emit sends it to every single connection
    // io.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });

    // Using boradcast we can send a message (emit) to everyone but one user
    // Send message to everyone other than this socket
    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

app.use(express.static(publicPath)); // Default HTML directory

//index.html is default so don't need to do this
// app.get('/', (req,res) => {
//   return res.status(200).sendFile("index.html", {root: publicPath});
// });

// We are now using the http server instead of the app server
//app.listen(port, () => {
server.listen(port, () => {
  console.log(`Started on port ${port}`);
});
