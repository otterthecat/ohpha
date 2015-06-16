/*eslint-disable */
var Bulb = function(Phaser, options){

  Phaser.Sprite.call(this, options.game, options.x, options.y, options.key, options.frame);

  this.voltageDrop = 2;
  this.forwardCurrent = 0.02;

  this.emitter = options.game.add.emitter(options.x, options.y, 100);
  this.emitter.makeParticles(options.emitterAsset);
  this.emitter.gravity = 100;

  this.onShine = new Phaser.Signal();
  this.onExplode = new Phaser.Signal();
  this.onNoPower = new Phaser.Signal();
};
Bulb.prototype = Object.create(Phaser.Sprite.prototype);
Bulb.prototype.constructor = Bulb;

Bulb.prototype.consume = function(circuit){
  var minResistor = (circuit.voltage - this.voltageDrop) / this.forwardCurrent;
  if (circuit.resistance <  minResistor){
    this.explode();
  } else if (!circuit.poweredOn) {
    this.onNoPower.dispatch(this);
  } else {
    this.illuminate(minResistor / circuit.resistance);
  }
};

Bulb.prototype.illuminate = function(brightness){
  this.onShine.dispatch(brightness);
};

Bulb.prototype.explode = function(){
  this.emitter.start(true, 2000, null, 10);
  this.onExplode.dispatch(this);
};
/*eslint-enable */
