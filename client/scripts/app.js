// YOUR CODE HERE:
//http://parse.sfm6.hackreactor.com/
//$(document).ready(function() {
  var app = {
  
    server: 'http://parse.sfm6.hackreactor.com/chatterbox/',
    friends: {},
    

    init: function() {
      // fetch();
    },

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
      
      var result = $.ajax({
        // This is the url you should use to communicate with the parse API server.
        url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages/',
        type: 'GET',
        
        contentType: 'application/json',
        success: function (data) {
          console.log('chatterbox: fetch sent', data.results);
          return data;
          
        },
        error: function (data) {
          // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
          console.error('chatterbox: Failed to send message', data);
        }
      });
      return result;
    },

    clearMessages: function(data) {
    // might need to remove JUST children note chats 
      $('#chats').empty();
    },

    renderMessage: function(message) {
      var $user = $('<div></div>');
      $user.text(message.username);
      $user.addClass('username');
      $user.data('username', message.username);
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

  app.init();

  $('.username').on('click', function() {
    var user = this.data('username');
    app.friends[user] = user;
  });
  
//});






// var message = {
//         username: 'Mel Brooks',
//         text: 'It\'s good to be the king',
//         roomname: 'lobby'
//       };

// // app.send(message);
// console.log(app.fetch());
  

