module.exports = {
  "circuit": {
    "on": function(){
      this.socket.emit('power:on');
      this.socket.broadcast.emit('power:on');
    },

    "off": function(){
      this.socket.emit('power:off');
      this.socket.broadcast.emit('power:off');
    },

    "resistor:update": function(mode){
      if(mode === 'add'){
        this.socket.emit('resistor:added');
        this.socket.broadcast.emit('resistor:added');
      }
      else {
        this.socket.emit('resistor:removed');
        this.socket.broadcast.emit('resistor:removed');
      }
    }
  }
};