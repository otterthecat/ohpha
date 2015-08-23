module.exports = function(io, name, events){
  io.of(name)
    .on('connection', function(socket){
      for(item in events){
        socket.on(item, events[item].bind(socket))
      }
    });

  return io;
};