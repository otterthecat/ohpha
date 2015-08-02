/*eslint-disable */
var Resistor = function(Phaser, options){
  Phaser.Sprite.call(this, options.game, options.x, options.y, options.key, options.frame);

  this.ohms = options.ohms || 160;
  this.watts = 0.125;
  this.tolerance = 0;
};
Resistor.prototype = Object.create(Phaser.Sprite.prototype);
Resistor.prototype.constructor = Resistor;

module.exports = Resistor;
/*eslint-enable */
