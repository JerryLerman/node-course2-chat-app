var socket = io(); // open web socket between client and server

function scrollToBottom() {
  // Selectors
  var messages = jQuery('#messages');
  var newMessage = messages.children('li:last-child');
  // Heights
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight(); // Next to last item

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }
};

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

// Using Mustache. It lets you inject values

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

// Mustache is allowing dynamic valuues to get inserted
socket.on('newMessage', function (message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  // Fetch the template from the html
  var template = jQuery('#message-template').html();
  // Fill the template (1st arg) with the data (2nd arg)
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });
  //Put the rendered output back into the html
  jQuery('#messages').append(html);
  scrollToBottom();
  // var li = jQuery('<li></li>');
  // li.text(`${message.from} ${formattedTime}: ${message.text}`);
  //
  // jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#location-message-template').html();
  var html = Mustache.render(template, {
    url: message.url,
    from: message.from,
    createdAt: formattedTime
  });
  jQuery('#messages').append(html);
  scrollToBottom();
});



// socket.on('newLocationMessage', function (message) {
//   var formattedTime = moment(message.createdAt).format('h:mm a');
//   var li = jQuery('<li></li>');
//   var a = jQuery('<a target="_blank">My current location</a>');
//
//   li.text(`${message.from} ${formattedTime}: `);
//   a.attr('href', message.url);
//   li.append(a);
//
//   jQuery('#messages').append(li);
// });

jQuery('#message-form').on('submit',function (event) {
  event.preventDefault(); //Stop browser default behavior (refresh and adding something to URL)

  var messageTextbox = jQuery('[name=message]');

  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.val()
  }, function (data) {
    messageTextbox.val('')
  });
});

var locationButton = jQuery('#send-location');
// jQuery('#send-location').on
locationButton.on('click', function () {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser');
  }

  locationButton.attr('disabled','disabled').text('Sending location....');

  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fetch location.');
  });
});
