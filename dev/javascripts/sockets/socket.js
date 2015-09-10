var socket = require('socket.io-client')();

window.addEventListener('beforeunload', function(){
  socket.close();
});

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
  var pullupResult = document.querySelector('.circuit-result');
  pullupResult.innerHTML = JSON.parse(data).data === 'true' ? "Connected!" : "Please complete Circuit";
});

module.exports = socket;