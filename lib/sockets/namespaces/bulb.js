var particle = require(__dirname + '/../../particle');

module.exports = {
  "bulb": {
    "shine": function(brightness){
      var adjustedBrightness = Math.round(255 * brightness);
      particle('bulb', adjustedBrightness, function(e, r, b){
        if(e){
          console.log(e);
          this.io.of('/').emit('foo', e);
          return;
        }
        console.log(b);
        this.io.of('/').emit('foo', b);
      }.bind(this));
    },

    "off": function(){
      particle('bulb', '-1', function(err, res, body){
        if(err){
          console.log(err);
          return;
        }
        console.log(body);
      });
    },

    "explode": function(){
      particle('bulb', '-1', function(err, res, body){
        if(err){
          conosle.log(err);
          return;
        }
        console.log(body);
      });
    },

    "drag": function(coords){
      this.socket.broadcast.emit('dragged', coords);
    },

    "drag:battery": function(coords){
      this.socket.broadcast.emit('dragged:battery', coords);
    },

    "drag:resistor": function(coords){
      this.socket.broadcast.emit('dragged:resistor', coords);
    },

    "snap:bulb": function(data){
      this.socket.broadcast.emit('snapped:bulb', data);
    },

    "snap:battery": function(data){
      this.socket.broadcast.emit('snapped:battery', data);
    },

    "snap:resistor": function(data){
      this.socket.broadcast.emit('snapped:resistor', data);
    },
  }
};