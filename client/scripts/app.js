// YOUR CODE HERE:
//http://parse.sfm6.hackreactor.com/
var app = {
  
  server: 'http://parse.sfm6.hackreactor.com/chatterbox/',

  init: function() {},
  
  send: function(message) {
    var context = this;
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages/',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent', data);
      },
      error: function (error) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', error);
      }
    });
  },

  fetch: function() {
    var context = this;
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages/',
      type: 'GET',
      
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: fetch sent', data);
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });

  },

  clearMessages: function(data) {
  // might need to remove JUST children note chats 
    $('#chats').empty();
  },

  renderMessage: function(message) {
    var $user = $('<div></div>');
    $user.text(message.username);
    var $text = $('<div></div>');
    $text.text(message.text);
    var $message = $('<div class=message></div>');
    $user.appendTo($message);
    $text.appendTo($message);
    $message.data('roomName', message.roomname);
    
    $message.appendTo('#chats');
  },

  renderRoom: function(roomName) {
    var $chatRoom = $('<div></div>');
    $chatRoom.data('roomName', roomName);

    $chatRoom.appendTo('#roomSelect');
  }
};


// var message = {
//         username: 'Mel Brooks',
//         text: 'It\'s good to be the king',
//         roomname: 'lobby'
//       };

// app.send(message);
// app.fetch()

  

