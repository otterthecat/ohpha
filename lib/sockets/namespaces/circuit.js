module.exports = {
  "on": function(){
    this.broadcast.emit('power:on');
  },

  "off": function(){
    this.broadcast.emit('power:off');
  },

  "resistor:update": function(mode){
    if(mode === 'add'){
      this.broadcast.emit('resistor:added');
    }
    else {
      this.broadcast.emit('resistor:removed');
    }
  }
};