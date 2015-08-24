module.exports = {
  "chat": {
    "sent": function(data){
      this.socket.emit('msg:recieved', data);
      this.socket.broadcast.emit('msg:recieved', data);
    }
  }
}