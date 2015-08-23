module.exports = {
  "circuit": {
    "on": function(){
      this.emit('power:on');
      this.broadcast.emit('power:on');
    },

    "off": function(){
      this.emit('power:off');
      this.broadcast.emit('power:off');
    },

    "resistor:update": function(mode){
      if(mode === 'add'){
        this.emit('resistor:added');
        this.broadcast.emit('resistor:added');
      }
      else {
        this.emit('resistor:removed');
        this.broadcast.emit('resistor:removed');
      }
    }
  }
};