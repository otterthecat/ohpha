var createWire = function(game){
  var wire = game.add.graphics(20, 100);

  wire.lineStyle(4, '#000', 1);
  wire.moveTo(0, 0);
  wire.lineTo(0, -80);
  wire.lineTo(280, -80);
  wire.lineTo(280, 200);
  wire.lineTo(100, 200);
  wire.lineTo(100, 0);
  wire.lineTo(40, 0);
};

module.exports = createWire;