var fs = require('fs'),
    namespaces = fs.readdirSync(__dirname + '/../namespaces/');

module.exports = function(io){
  namespaces.forEach(function(namespace){
    var obj = require(__dirname + '/../namespaces/' + namespace);
    for(var name in obj){
      io.of(name)
        .on('connection', function(socket){
          for(var event in obj[name]){
            socket.on(event, obj[name][event].bind(socket));
          }
        });
    }
  });

  return io;
};