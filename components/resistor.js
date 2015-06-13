/*eslint-disable */
var Resistor = function(Phaser, options){
  Phaser.Sprite.call(this, options.game, options.x, options.y, options.key, options.frame);
  options.game.load.image('resistor', 'circuit-stuff/resistor.png');
  this.ohms = options.ohms || 330;
  this.watts = 0.125;
  this.tolerance = 0;
};
Resistor.prototype = Object.create(Phaser.Sprite.prototype);
Resistor.prototype.constructor = Resistor;

/*eslint-enable */
