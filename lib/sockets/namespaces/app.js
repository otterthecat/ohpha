var userCount = 0;

module.exports = {
  "/": {
    "connection": function(){
      userCount++;
      this.emit("connection:increment", userCount);
      this.broadcast.emit("connection:increment", userCount);
    },

    "disconnect": function(){
      userCount--;
      this.emit("connection:decrement", userCount);
      this.broadcast.emit("connection:decrement", userCount);
    },

    "toggler:clicked": function(){
      this.emit('codebender:toggle');
      this.broadcast.emit('codebender:toggle');
    }
  }
};