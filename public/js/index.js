var socket = io(); // open web socket between client and server


// For compatibility with all browsers, use regular funcations
socket.on('connect', function () {
  console.log('Connected to server');

  socket.emit('createMessage', {
    from: 'Alex',
    text: 'Mr. Watson--come here--I want to see you.'
  });
});

// socket.on('connect', () => {
//   console.log('Connected to server');
// });

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
  console.log('newMessage', message);
});
