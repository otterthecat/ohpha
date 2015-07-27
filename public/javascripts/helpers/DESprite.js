var DESprite = function(Phaser, options){

  var applyProtos = function(obj, methods){
    for(method in methods){
      if(!obj.prototype.hasOwnProperty(method)){
        obj.prototype[method] = methods[method];
      }
    }
  };

  var extended = function(){
    Phaser.Sprite.call(this, options.game, options.x, options.y, options.key, options.frame);

      options.init();
  };
  extended.prototype = Object.create(Phaser.Sprite.prototype);
  extended.prototype.constructor = extended;

  extended.prototype.loadAssets = function(assets){
    for(asset in assets) {
      game.load.image(asset, assets[asset]);
    }
  }


  applyProtos(extended, options.methods);

  return extended;
};