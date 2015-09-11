/*eslint-disable */
var Phaser = require('Phaser'),
    preload = require('./game/states/preload');
    Battery = require('./components/battery'),
    Bulb = require('./components/bulb'),
    Circuit = require('./components/circuit'),
    Electron = require('./components/electron'),
    Resistor = require('./components/resistor'),
    Txt = require('./components/text'),
    createWire = require('./components/wire'),
    uiForm = require('./ui/form'),
    socket = require('./sockets/socket'),
    tabs = require('./ui/tabs'),
    chat = require('./ui/chat')(require('./sockets/chat')),
    bulbSocket = require('./sockets/bulb'),
    circuitSocket = require('./sockets/circuit');
    helpers = require('./helpers');

var bulb,
  electron,
  nineVolt,
  resistor,
  circuit,
  electronTween1,
  electronTween2,
  electronSpeed = 400;
var game = new Phaser.Game(800, 420, Phaser.CANVAS, 'interactive', {
    preload: preload,
    create: create
});

function createBattery(){
  var shadow = game.add.sprite(game.world.centerX, game.world.centerY, 'nineVolt');
  shadow.anchor.set(0.5);
  shadow.tint = 0x000000;
  shadow.alpha = 0.6;
  shadow.x = 42;
  shadow.y = 157;
  shadow.scale = {
    x: 0.55,
    y: 0.55
  }

  nineVolt = Battery({
    'game': game,
    'key': 'nineVolt',
    'x': 500,
    'y': 220
  });
  nineVolt.scale.x = 0.55;
  nineVolt.scale.y = 0.55;

  nineVolt.events.onDragUpdate.add(function(sprite, pointer, dragX, dragY, snapPoint){
    bulbSocket.emit('drag:battery', {
      "x": dragX,
      "y": dragY
    })
  });
  nineVolt.events.onDragStop.add(helpers.dragStop({
    "x": 40,
    "y": 155,
    "callback": function(data){
      bulbSocket.emit('snap:battery', data);
      helpers.doIfAligned(bulb, nineVolt, resistor, function(){
        console.log("BOOM");
      });
    }
  }));

  bulbSocket.on('dragged:battery', function(coords){
    nineVolt.x = coords.x;
    nineVolt.y = coords.y;
  });

  bulbSocket.on('snapped:battery', function(coords){
    nineVolt.x = coords.x;
    nineVolt.y = coords.y;
    helpers.doIfAligned(bulb, nineVolt, resistor, function(){
      console.log("BOOM");
    });
  });
};

function createBulb(){
  var shadow = game.add.sprite(game.world.centerX, game.world.centerY, 'led');
  shadow.anchor.set(0.5);
  shadow.tint = 0x000000;
  shadow.alpha = 0.6;
  shadow.x = 202;
  shadow.y = 242;

  bulb = Bulb({
    'game': game,
    'key': 'led',
    'emitterAsset': 'shard',
    'x': 420,
    'y': 90
  });

  bulb.events.onDragUpdate.add(function(sprite, pointer, dragX, dragY, snapPoint){
    bulbSocket.emit('drag', {
      "x": dragX,
      "y": dragY
    })
  });
  bulb.events.onDragStop.add(helpers.dragStop({
    "x": 200,
    "y": 240,
    "callback": function(data){
      bulbSocket.emit('snap:bulb', data);
      helpers.doIfAligned(bulb, nineVolt, resistor, function(){
        console.log("BOOM");
      });
    }
  }));

  bulbSocket.on('dragged', function(coords){
    bulb.x = coords.x;
    bulb.y = coords.y;
  });

  bulbSocket.on('snapped:bulb', function(coords){
    bulb.x = coords.x;
    bulb.y = coords.y;
    helpers.doIfAligned(bulb, nineVolt, resistor, function(){
      console.log("BOOM");
    });
  });
};

function createFirstElec(){
  var electron = new Electron({
    'game': game,
    'x': 20,
    'y': 100,
    'key': 'electron'
  });

  electronTween1 = game.add.tween(electron).to({y: 20}, electronSpeed)
    .to({x: 300}, electronSpeed * 1.5)
    .to({y: 300}, electronSpeed * 1.5)
    .to({x: 120}, electronSpeed * 1.5)
    .to({y: 100}, electronSpeed * 1.5)
    .to({x: 20}, electronSpeed * 0.7)
    .loop()
    .start();

    electronTween1.pause();
};

function createSecondElec(num){
  var electron = new Electron({
    'game': game,
    'x': 300,
    'y': 300,
    'key': 'electron'
  });

  electronTween2 = game.add.tween(electron).to({x: 120}, electronSpeed * 1.5)
    .to({y: 100}, electronSpeed * 1.5)
    .to({x: 20}, electronSpeed * 0.7)
    .to({y: 20}, electronSpeed)
    .to({x: 300}, electronSpeed * 1.5)
    .to({y: 300}, electronSpeed * 1.5)
    .loop()
    .start();

    electronTween2.pause();
};

function createResistor(){

  var shadow = game.add.sprite(game.world.centerX, game.world.centerY, 'resistor');
  shadow.anchor.set(0.5);
  shadow.tint = 0x000000;
  shadow.alpha = 0.6;
  shadow.x = 152;
  shadow.y = 22;
  shadow.scale = {
    x: 0.55,
    y: 0.55
  }

  resistor = Resistor({
    'game': game,
    'x': 520,
    'y': 100,
    'key': 'resistor'
  });

  resistor.scale = {
    x: 0.55,
    y: 0.55
  }

  resistor.events.onDragUpdate.add(function(sprite, pointer, dragX, dragY, snapPoint){
    bulbSocket.emit('drag:resistor', {
      "x": dragX,
      "y": dragY
    })
  });
  resistor.events.onDragStop.add(helpers.dragStop({
    "x": 150,
    "y": 20,
    "callback": function(data){
      bulbSocket.emit('snap:resistor', data);
      helpers.doIfAligned(bulb, nineVolt, resistor, function(){
        console.log("BOOM");
      });
    }
  }));

  bulbSocket.on('dragged:resistor', function(coords){
    resistor.x = coords.x;
    resistor.y = coords.y;
  });

  bulbSocket.on('snapped:resistor', function(coords){
    resistor.x = coords.x;
    resistor.y = coords.y;
    helpers.doIfAligned(bulb, nineVolt, resistor, function(){
      console.log("BOOM");
    });
  });
};

function togglePower(){
  if(circuit.isOn){
    console.log('emitting off');
    circuitSocket.emit('off');
  } else {
    console.log('emitting on');
    circuitSocket.emit('on');
  }
};

socket.on('foo', function(data){
  var target = document.querySelector('#bulb-response');
  if(!JSON.parse(data).ok === 'true'){
    target.innerHTML = "Failed to update bulb";
  }
  else {
    target.innerHTML = "Bulb Updated";
  }
});

circuitSocket.on('power:on', function(){
  circuit.turnOn();
  electronTween1.resume();
  electronTween2.resume();
});

circuitSocket.on('power:off', function(){
  circuit.turnOff();
  electronTween1.pause();
  electronTween2.pause();
});

function create(){
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
/*eslint-enable */
