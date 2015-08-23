var socket = require('socket.io-client')();

var updateUserCount = function(count){
  document.querySelector("#user-count").innerHTML = 'Connected Users: ' + count;
};

socket.on('connection:increment', function(count){
  updateUserCount(count);
});

socket.on('connection:decrement', function(count){
  updateUserCount(count);
});

module.exports = socket;