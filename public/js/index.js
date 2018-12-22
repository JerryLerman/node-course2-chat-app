var socket = io(); // open web socket between client and server


// For compatibility with all browsers, use regular funcations
socket.on('connect', function () {
  console.log('Connected to server');

  // socket.emit('createMessage', {
  //   from: 'Alex',
  //   text: 'Mr. Watson--come here--I want to see you.'
  // });


});

// socket.on('connect', () => {
//   console.log('Connected to server');
// });

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
  console.log('newMessage', message);
  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit',function (event) {
  event.preventDefault(); //Stop browser default behavior (refresh and adding something to URL)
  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function (data) {

  });
});
