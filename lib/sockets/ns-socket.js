var Io = require('socket.io'),
  addNamespace = require(__dirname + '/helpers/addNamespace'),
  config = require(__dirname + '/../config/config');


module.exports = function(server){
  var io = Io.listen(4000);
  return addNamespace(io);
};