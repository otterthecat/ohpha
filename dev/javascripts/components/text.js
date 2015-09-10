/*eslint-disable */
var Phaser = require('Phaser');

var Text = function(options){
  return options.game.add.text(options.x, options.y, options.text);
};

module.exports = function(options){
  return new Text(options);
}
/*eslint-enable */
