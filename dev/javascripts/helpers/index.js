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