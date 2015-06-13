/*eslint-disable */
var Bulb = function(Phaser, options){

  Phaser.Sprite.call(this, options.game, options.x, options.y, options.key, options.frame);
  options.game.load.image('bulb', 'circuit-stuff/bulb.png');

  this.voltageDrop = 2;
  this.forwardCurrent = 0.02;

  this.onShine = new Phaser.Signal();
  this.onExplode = new Phaser.Signal();
  this.onNoPower = new Phaser.Signal();
};
Bulb.prototype = Object.create(Phaser.Sprite.prototype);
Bulb.prototype.constructor = Bulb;

Bulb.prototype.consume = function(circuit){
  var minResistor = (circuit.voltage - this.voltageDrop) / this.forwardCurrent;
  if (circuit.resistance <  minResistor){
    this.onExplode.dispatch(this);
  } else if (circuit.voltage === 0) {
    this.onNoPower.dispatch(this);
  } else {
    this.onShine.dispatch(minResistor / circuit.resistance);
  }
};

Bulb.prototype.illuminate = function(){
  console.log('placeholder for illumination action');
};

Bulb.prototype.explode = function(){
  console.log('placeholder for exploding action');
};
/*eslint-enable */
