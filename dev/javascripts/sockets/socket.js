var socket = require('socket.io-client')();

var updateUserCount = function(count){
  document.querySelector("#user-count").innerHTML = count;
};

socket.on('connection:increment', function(count){
  updateUserCount(count);
});

socket.on('connection:decrement', function(count){
  updateUserCount(count);
});

socket.on('pullup:update', function(data){
  console.log("PULLUP DATA ", data);
});

module.exports = socket;