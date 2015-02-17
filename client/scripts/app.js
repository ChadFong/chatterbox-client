var app = {
  server: 'https://api.parse.com/1/classes/chatterbox',
  init: function(){},

  rooms: {
    currentRoom: "lobby",
    availableRooms: {}
  },

  friends: {},

  send: function(message){
    $.ajax({
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function () {
        app.fetch();
      }
    });
  },

  fetch: function(){
    $.ajax({
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'GET',
      contentType: 'application/json',
      data: {
        order: "-createdAt",
        where: {
          roomname: app.rooms.currentRoom
        }
      },
      success: function(data){
        app.clearMessages();
        var results = data.results;
        for (var i = 0; i < results.length; i++){
          var newTime = moment(results[i].createdAt).format("MMM Do, h:mm a");
          var $newPost = $("<div class='chat'></div>");
          var $user = $("<span class='username'></span>");
          var $message = $("<span class='message'></span>");
          var $time = $("<span class='time'>" + newTime + "</span>");
          $user.text("@" + results[i].username + ": ");
          $user.attr("name",results[i].username);
          if(results[i].username in app.friends){
            $newPost.addClass('friend');
          }
          $message.text(results[i].text);
          $newPost.append($user).append($time);
          $newPost.append("<br>").append($message);
          $("#chats").append($newPost);
        }
      }
    });
  },

  clearMessages: function(){
    $("#chats").empty();
  },

  addMessage: function(message){
    this.send(message);
  },
  addRoom: function(roomName){
    app.rooms.availableRooms[roomName] = roomName;
    $("#roomSelect").append("<li>" + roomName + "</li>");
  }
};

$(document).ready(function(){

  $("#roomSelect").on('click', 'li', function(){
    app.rooms.currentRoom = $(this).text();
    $("#roomName").text(app.rooms.currentRoom);
    app.fetch();
  });

  $("#roomButton").click(function(){
    console.log("hi");
    app.addRoom($("#roomInput").val());
  });

  $("#messageButton").click(function(){
    var message = {
      'username': (window.location.search).replace('?username=',''),
      'text': $("#messageInput").val(),
      'roomname': app.rooms.currentRoom
    };
    app.addMessage(message);
  });

  $("#chats").on('click', '.username', function(){
    var name = $(this).attr('name');
    if(!(name in app.friends)){
      app.friends[name] = name;
      $("#friendsList").append("<li>"+name+"</li>");
    }
    app.fetch();
  });

  app.fetch();
  app.addRoom("lobby");
});

setInterval(app.fetch, 1000);
