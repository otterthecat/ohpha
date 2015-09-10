/*eslint-disable */
var Phaser = require('Phaser');

var Battery = function(options){
  Phaser.Sprite.call(this, options.game, options.x, options.y, options.key, options.frame);

  this.volts = options.volts || 5;
  this.amps = options.amps || 0.3;
};
Battery.prototype = Object.create(Phaser.Sprite.prototype);
Battery.prototype.constructor = Battery;

module.exports = function(options){
  var battery = new Battery(options);
  options.game.add.existing(battery);
  battery.anchor.set(0.5);

  battery.inputEnabled = true;
  battery.input.enableDrag();

  return battery;
}
/*eslint-enable */