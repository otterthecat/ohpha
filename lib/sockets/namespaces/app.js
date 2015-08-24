var userCount = 0;

module.exports = {
  "/": {
    "connection": function(){
      userCount++;
      this.socket.emit("connection:increment", userCount);
      this.socket.broadcast.emit("connection:increment", userCount);
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