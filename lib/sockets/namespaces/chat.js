module.exports = {
  "chat": {
    "sent": function(data){
      this.emit('msg:recieved', data);
      this.broadcast.emit('msg:recieved', data);
    }
  }
}