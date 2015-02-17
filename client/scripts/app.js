var app = {
  server: 'https://api.parse.com/1/classes/chatterbox',
  init: function(){},

  rooms: {
    currentRoom: "lobby",
    availableRooms: {}
  },

  send: function(message){
    $.ajax({
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (a,b,c) {
        app.fetch();
      }
    })
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
        console.log(data)
        var results = data.results;
        var reg = /<script>/g
        for (var i = 0; i < results.length; i++){

          // Refactor posts selector
          var $newPost = $("<div></div>");
          $newPost.text(results[i].username + ": " + results[i].text);
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
    $("#roomSelect").append("<li class='blah'>" + roomName + "</li>")
    $(".blah").on("click", function(){
      app.rooms.currentRoom = $(this).text();
      app.fetch();
    });
    $(".blah").removeClass("blah");
  }
};

app.addRoom("lobby");
