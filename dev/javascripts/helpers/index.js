exports.dragStop = function(options){

  return function(sprite){
    if(sprite.x < options.x + 50 && sprite.x > options.x - 50 && sprite.y < options.y + 50 && sprite.y > options.y - 50){
      sprite.x = options.x;
      sprite.y = options.y;
      options.callback({
        "x": options.x,
        "y": options.y
      });
    }
  }
};


exports.doIfAligned = function(bulb, battery, resistor, callback){
  if(bulb.x === 200 && bulb.y === 240 && battery.x === 40 && battery.y === 155 && resistor.x === 150 && resistor.y === 20){
      console.log("THEY ARE ALL READY");
      callback();
  }
};