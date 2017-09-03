// YOUR CODE HERE:
//http://parse.sfm6.hackreactor.com/
//$(document).ready(function() {
var app = {

  server: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages/',
  friends: {},
  chatrooms: {},  
  currentRoom: 'room1',
//username: window.location.search.split('=')[1];
  //username: 'team7',
  
  init: function() {
    
    app.fetch();
    console.log(app.chatrooms)
    if (!/(&|\?)username=/.test(window.location.search)) {
      var newSearch = window.location.search;
      if (newSearch !== '' & newSearch !== '?') {
        newSearch += '&';
      }
      newSearch += 'username=' + (prompt('What is your name?') || 'anonymous');
      window.location.search = newSearch;
    }
    app.currentRoom = 'lobby';
    app.chatrooms['lobby'] = 'lobby';
 
    //setTimeout(app.fetch, 2000);
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
      data: {order: '-createdAt'},
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: fetch sent', data.results);
        $.each(data.results, function(i, data) {
          app.renderMessage(data.username, data.text, data.roomname);
          if (!app.chatrooms.hasOwnProperty(data.roomname)) {
            $('select').append($('<option>', {
              value: data.roomname,
              text: data.roomname
            }));
          }
          app.chatrooms[data.roomname] = data.roomname;
        });
        
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

  renderMessage: function(username, text, roomname) {
    var $user = $('<div></div>');
    $user.text(username);
    $user.addClass('username');
    $user.data('username', username);
    var $text = $('<div></div>');
    $text.text(`${text}`);
    var $message = $('<div class=message></div>');
    $user.appendTo($message);
    $text.appendTo($message);
    $message.attr('roomName', roomname);
    $message.appendTo('#chats');
  },

  renderRoom: function(roomName) {
    
    var room = roomName;
    app.currentRoom = roomName; 
     $('.chatroom').children().hide();
    //console.log($('.chatroom').children());

    var $showThis = $('.chatroom').children();
    $.each($showThis, function(i, value) { 
     
      if ($(value).attr('roomname') === roomName) {
        console.log($(value).attr('roomname') );
        $(value).show();
      }
      // if (value.data('roomname') === roomName) {
      //   value.show();
      // }  
    });
    // $('.chatroom').children().forEach(function(child) {
    //   //console.log($(child));
    //   if ($(child).data('roomname') === roomName) {
    //     $(child).show();
    //   }
    // });
  },

  handleUserNameClick: function(user) {
    var friend = $('<div></div>');
    console.log(friend);
    $(friend).text(user);
    console.log($(friend))
    if (!app.friends.hasOwnProperty(user)) {
      $(friend).appendTo('.friendsList');

    }
    app.friends[user] = user;
  },
  
  handleSubmit: function(text) {
    
    var message = {
      username: window.location.search.split('=')[1],
      text: text,
      roomname: app.currentRoom
    };
    console.log(message);
    app.send(message);    
  }
};

app.init();

// $(document).ready(function() {
//   $('.username').on('click', function() {
//     var user = this.data('username');
//     app.handleUserNameClick(user);
//     console.log('friend added');
//   });
// });

$(document).on('click', '.username', function() {
  var user = $(this).data('username');
  app.handleUserNameClick(user);
});

$(document).on('click', '.enterButton', function() {
  var text = document.getElementById('enterMessage').value;
  app.handleSubmit(text);
});

$(document).on('click', '.createRoomButton', function() {
  var newRoom = document.getElementById('createRoom').value;
  if (!app.chatrooms[newRoom]) {
    $('select').append($('<option>', {
      value: newRoom,
      text: newRoom
    }));
       
  }
  app.chatrooms[newRoom] = newRoom;
});

$(document).on('change', 'select', function() {
  var room = this.value;
  app.renderRoom(room);
});


//});

// var message = {
//   username: 'blue82',
//   text: 'Turn up the AC',
//   roomname: 'lobby'
// };
// app.send(message);
//console.log(app.fetch());
  

