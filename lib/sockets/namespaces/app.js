var EventSource = require('eventsource');
var config = require(__dirname +'/../../config/config');
var userCount = 0;
var url = 'https://api.particle.io/v1/devices/' + config.pullup_board.id;
url += '/events?access_token=' + config.pullup_board.token;

var es = new EventSource(url, {
  "rejectUnauthorized": false
});

module.exports = {
  "/": {
    "connection": function(){
      userCount++;
      this.socket.emit("connection:increment", userCount);
      this.socket.broadcast.emit("connection:increment", userCount);

      es.addEventListener('wired', function(event){
        this.socket.emit('pullup:update', event.data);
      }.bind(this));
    },

    "disconnect": function(){
      userCount--;
      this.socket.emit("connection:decrement", userCount);
      this.socket.broadcast.emit("connection:decrement", userCount);
    },

    "toggler:clicked": function(){
      this.socket.emit('codebender:toggle');
      this.socket.broadcast.emit('codebender:toggle');
    }
  }
};