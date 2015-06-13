/*eslint-disable */
var Circuit = function(Phaser){
  Phaser.Signal.call(this);
  this.batteries = [];
  this.resistors = [];
  this.isOn = false;

  this.circuit_on = new Phaser.Signal();
  this.circuit_off = new Phaser.Signal();
  this.circuit_add_batery = new Phaser.Signal();
  this.circuit_add_resistor = new Phaser.Signal();
  this.circuit_set_resistance = new Phaser.Signal();
};
Circuit.prototype = Object.create(Phaser.Signal.prototype);
Circuit.prototype.constructor = Circuit;

Circuit.prototype.turnOn = function(){
    this.isOn = true;
    this.circuit_on.dispatch(this);
    return this;
};

Circuit.prototype.turnOff = function(){
  this.isOn = false;
  this.circuit_off.dispatch(this);
  return this;
};

Circuit.prototype.addBattery = function(battery){
  this.batteries.push(battery);
  this.circuit_add_batery.dispatch(this);
  return this;
};

Circuit.prototype.getVoltage = function(){
  var totalVoltage = 0;
  this.batteries.forEach(function(battery){
    totalVoltage += battery.volts;
  });

  return this.isOn ? totalVoltage : 0;
};

Circuit.prototype.addResistor = function(resistor){
  this.resistors.push(resistor);
  this.circuit_add_resistor.dispatch(this);
  return this;
};

Circuit.prototype.setResistance = function(value){
  this.resistors = [{
    'ohms': value
  }];
  this.circuit_set_resistance.dispatch(this.getStats());
};

Circuit.prototype.getResistance = function(){
  var totalResistance = 0;
  this.resistors.forEach(function(resistor){
    totalResistance += resistor.ohms;
  });
  return totalResistance;
};

Circuit.prototype.getCurrent = function(){
  return this.getVoltage() / this.getResistance();
};

Circuit.prototype.getWatts = function(){
  return this.getVoltage() * this.getCurrent();
};

Circuit.prototype.getStats = function(){
  return {
    'poweredOn': this.isOn,
    'batteries': this.batteries,
    'resistors': this.resistors,
    'voltage': this.getVoltage(),
    'resistance': this.getResistance(),
    'current': this.getCurrent(),
    'watts': this.getWatts()
  };
};

/*eslint-enable */
