/*eslint-disable */
var Phaser = require('Phaser');

var Electron = function(options){
  Phaser.Sprite.call(this, options.game, options.x, options.y, options.key, options.frame);
};
Electron.prototype = Object.create(Phaser.Sprite.prototype);
Electron.prototype.constructor = Electron;

module.exports = function(options){
  var electron = new Electron(options);
  options.game.add.existing(electron);
  electron.anchor.set(0.5);

  return electron;
}
/*eslint-enable */
