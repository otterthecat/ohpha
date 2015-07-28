var socket = io.connect();
setTimeout(function(){
  socket.emit('foobar', 'blah');
}, 3000);