module.exports = {
  "sent": function(data){
    this.emit('msg:recieved', data);
    this.broadcast.emit('msg:recieved', data);
  }
}