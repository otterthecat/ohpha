/*eslint-disable */
var Battery = function(Phaser, options){
  Phaser.Sprite.call(this, options.game, options.x, options.y, options.key, options.frame);

  this.volts = options.volts || 5;
  this.amps = options.amps || 0.3;
};
Battery.prototype = Object.create(Phaser.Sprite.prototype);
Battery.prototype.constructor = Battery;

module.exports = Battery;
/*eslint-enable */