/*eslint-disable */
var Phaser = require('Phaser');

var Resistor = function(options){
  Phaser.Sprite.call(this, options.game, options.x, options.y, options.key, options.frame);

  this.ohms = options.ohms || 160;
  this.watts = 0.125;
  this.tolerance = 0;
};
Resistor.prototype = Object.create(Phaser.Sprite.prototype);
Resistor.prototype.constructor = Resistor;

module.exports = function(options){
  var resistor = new Resistor(options);
  options.game.add.existing(resistor);
  resistor.anchor.set(0.5);

  return resistor;
};
/*eslint-enable */
