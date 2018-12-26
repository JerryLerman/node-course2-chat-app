const path = require('path'); // Don't have to install
const http = require('http'); // Don't have to install
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

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
var io = socketIO(server); // Get the websocket server'
var users = new Users();

// Listen for a new connection. Each connection is another socket
io.on('connection', (socket) => {
  console.log('New user connected');

    socket.on('join', (params, callback) => {
      if (!isRealString(params.name) || !isRealString(params.room)) {
        return callback('Name and room name are required');
      } else {
        params.name = params.name.trim();
        params.room = params.room.trim();
        console.log(`\"${params.name}\" has joined \"${params.room}\"`);
        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        //socket.leave(params.room);
        socket.emit('newMessage',
            generateMessage('Admin','Welcome to the chat!'));
        // socket.emit('newMessage', {
        //   from: 'Admin',
        //   text: 'Welcome to the chat!',
        //   createdAt: new Date().getTime()
        // });
        socket.broadcast.to(params.room).emit('newMessage',
          generateMessage('Admin',`${params.name} has joined`));
        callback();
      }
    });

    //io.emit - Send message to everyone connected
    //socket.broadcast.emit - Send message to everyone connected to the socket server except the current user
    //socket.emit - Send message to one user
    //io.to(room name).emit - Same with broadcast
    //socket.broadcast.to(room).emit

  socket.on('createMessage', (message, callback) => {
    var user = users.getUser(socket.id);

if (user && isRealString(message.text)) {
    io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
}

    callback();
    //socket.emit sends a message to a single connection while
    // io.emit sends it to every single connection

    // Using boradcast we can send a message (emit) to everyone but one user
    // Send message to everyone other than this socket
    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });
  });

  socket.on('createLocationMessage', (coords) => {
    var user = users.getUser(socket.id);

    if (user) {
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
    }
  });

  socket.on('disconnect', () => {
    var user = users.removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
    }
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
