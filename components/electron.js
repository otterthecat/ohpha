/*eslint-disable */
var Electron = function(Phaser, options){
  Phaser.Sprite.call(this, options.game, options.x, options.y, options.key, options.frame);
};
Electron.prototype = Object.create(Phaser.Sprite.prototype);
Electron.prototype.constructor = Electron;
/*eslint-enable */
