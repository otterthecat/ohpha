var Phaser = require('Phaser');
var Txt = require('../../components/text');
var Bulb = require('../../components/bulb');

module.exports = function(game){
  game.physics.startSystem(Phaser.Physics.ARCADE);

  createWire(game);
  createFirstElec();
  createSecondElec();
  createBattery();
  createResistor();
  createBulb();

  var button = game.add.button(700, 150, 'button', togglePower);
  button.anchor.set(0.5);

  var textVoltage = Txt({
    'game': game,
    'x': game.world.centerX,
    'y': 330,
    'text': "Voltage is: 0"
  });

  var textResistance = Txt({
    'game': game,
    'x': game.world.centerX,
    'y': 360,
    'text': "Resistance is: 0"
  });

  var textCurrent = Txt({
    'game': game,
    'x': game.world.centerX,
    'y': 300,
    'text': 'Current is: 0'
  });

  var textWatts = Txt({
    'game': game,
    'x': game.world.centerX,
    'y': 390,
    'text': 'Watts is: 0'
  });

  bulb.onExplode.add(function(){
    textCurrent.setText('Bulb is overloaded!');
    textVoltage.setText('Bulb is overloaded');
    textResistance.setText('Bulb is overloaded');
    textWatts.setText('Bulb is overloaded');
    bulbSocket.emit('explode');
  });
  bulb.onShine.add(function(brightness){
    var stats = circuit.getStats();
    textCurrent.setText('Current is: ' + parseFloat(stats.current).toFixed(2));
    textVoltage.setText("Voltage is: " + parseFloat(stats.voltage).toFixed(2));
    textResistance.setText("Resistance is: " + parseFloat(stats.resistance).toFixed(2));
    textWatts.setText('Watts is: ' + parseFloat(stats.watts).toFixed(2));
    bulbSocket.emit('shine', brightness);
  });
  bulb.onNoPower.add(function(){
    textCurrent.setText('Current is: 0');
    textVoltage.setText("Voltage is: 0");
    textResistance.setText("Resistance is: 0");
    textWatts.setText('Watts is: 0');
    bulbSocket.emit('off');
  });

  circuit = Circuit();
  circuit.addBattery(nineVolt)
    .addResistor(resistor)
    .circuit_on.add(function(){
      bulb.consume(circuit.getStats());
    });
  circuit.circuit_off.add(function(){
    bulb.consume(circuit.getStats());
  });
  circuit.circuit_add_resistor.add(function(){
      if(circuit.isOn){
        circuit.turnOn();
      }

    var newSpeed = electronSpeed * circuit.resistors.length;
    electronTween2.updateTweenData('duration', newSpeed, -1);
    electronTween1.updateTweenData('duration', newSpeed, -1);
  });
  circuit.circuit_remove_resistor.add(function(){
    if(circuit.isOn){
      circuit.turnOn();
    }

    var newSpeed = electronSpeed * circuit.resistors.length;
    electronTween2.updateTweenData('duration', newSpeed, -1);
    electronTween1.updateTweenData('duration', newSpeed, -1);
  });

  // expose object for UI form
  // TODO: find a better way to do this
  window.circuit = circuit;

  var addResistor = function(){
    var newResistor = Resistor({
      'game': game,
      'x': 150 + (circuit.resistors.length * 52),
      'y': 20,
      'key': 'resistor'
    });

    newResistor.scale = {
      x: 0.55,
      y: 0.55
    }

    circuit.addResistor(newResistor);
  };

  var resistorButton = game.add.button(650, 40, 'button', function(){
    circuitSocket.emit('resistor:update', 'add');
  });
  resistorButton.anchor.set(0.5);

  var removeButton = game.add.button(750, 40, 'button', function(){
    circuitSocket.emit('resistor:update', 'remove');
  });
  removeButton.anchor.set(0.5);

  circuitSocket.on('resistor:added', function(){
    addResistor();
    uiForm.reset();
    uiForm.clearValidation();
  });

  circuitSocket.on('resistor:removed', function(){
    circuit.removeResistor();
    uiForm.reset();
    uiForm.clearValidation();
  });

  var plus = Txt({
    'game': game,
    'x': 642,
    'y': 28,
    'text': '+'
  });

  var minus = Txt({
    'game': game,
    'x': 745,
    'y': 28,
    'text': '-'
  });

  var power = Txt({
    'game': game,
    'x': 660,
    'y': 140,
    'text': 'power'
  });
};