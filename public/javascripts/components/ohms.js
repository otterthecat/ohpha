/*eslint-disable */
window.onload = function(){

  var bulb,
    electron,
    nineVolt,
    resistor,
    circuit,
    electronTween1,
    electronTween2,
    electronSpeed = 400;
  var game = new Phaser.Game(800, 420, Phaser.CANVAS, 'ohms', {
      preload: preload,
      create: create
  });

  function preload(){
    game.stage.backgroundColor = '#fff';
    game.load.image('shard', 'images/circuit-stuff/shard.jpg');
    game.load.image('button', 'images/circuit-stuff/green-button.png');
    game.load.image('bulb', 'images/circuit-stuff/bulb.png');
    game.load.image('electron', 'images/circuit-stuff/electron.png');
    game.load.image('nineVolt', 'images/circuit-stuff/nineVolt.png');
    game.load.image('resistor', 'images/circuit-stuff/resistor.png');
  };

  function createBattery(){
    nineVolt = new Battery(Phaser, {
      'game': game,
      'key': 'nineVolt',
      'x': 40,
      'y': 160
    });
    game.add.existing(nineVolt);
    nineVolt.anchor.set(0.5);
  };

  function createBulb(){
    bulb = new Bulb(Phaser,{
      'game': game,
      'key': 'bulb',
      'emitterAsset': 'shard',
      'x': 300,
      'y': 140
    });
    game.add.existing(bulb);
    bulb.anchor.set(0.5);
  };

  function createFirstElec(){
    var electron = new Electron(Phaser, {
      'game': game,
      'x': 20,
      'y': 100,
      'key': 'electron'
    });
    game.add.existing(electron);
    electron.anchor.set(0.5);

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
    var electron = new Electron(Phaser, {
      'game': game,
      'x': 300,
      'y': 300,
      'key': 'electron'
    });
    game.add.existing(electron);
    electron.anchor.set(0.5);

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
    resistor = new Resistor(Phaser, {
      'game': game,
      'x': 150,
      'y': 20,
      'key': 'resistor'
    });
    game.add.existing(resistor);
    resistor.anchor.set(0.5);
  };

  function togglePower(){
    if(circuit.isOn){
      circuit.turnOff();
      electronTween1.pause();
      electronTween2.pause();
    } else {
      circuit.turnOn();
      electronTween1.resume();
      electronTween2.resume();
    }
  };

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

    var textVoltage = new Text(Phaser, {
      'game': game,
      'x': game.world.centerX,
      'y': 330,
      'text': "Voltage is: 0"
    });

    var textResistance = new Text(Phaser, {
      'game': game,
      'x': game.world.centerX,
      'y': 360,
      'text': "Resistance is: 0"
    });

    var textCurrent = new Text(Phaser, {
      'game': game,
      'x': game.world.centerX,
      'y': 300,
      'text': 'Current is: 0'
    });

    var textWatts = new Text(Phaser, {
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
    });
    bulb.onShine.add(function(brightness){
      var stats = circuit.getStats();
      textCurrent.setText('Current is: ' + stats.current);
      textVoltage.setText("Voltage is: " + stats.voltage);
      textResistance.setText("Resistance is: " + stats.resistance);
      textWatts.setText('Watts is: ' + stats.watts);
    });
    bulb.onNoPower.add(function(){
      textCurrent.setText('Current is: 0');
      textVoltage.setText("Voltage is: 0");
      textResistance.setText("Resistance is: 0");
      textWatts.setText('Watts is: 0');
    });

    circuit = new Circuit(Phaser);
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

    var resistorButton = game.add.button(650, 40, 'button', function(){
      var newResistor = new Resistor(Phaser, {
        'game': game,
        'x': 150 + (circuit.resistors.length * 50),
        'y': 20,
        'key': 'resistor'
      });
      circuit.addResistor(newResistor);
      game.add.existing(newResistor);
      newResistor.anchor.set(0.5);
    });
    resistorButton.anchor.set(0.5);

    var removeButton = game.add.button(750, 40, 'button', function(){
      circuit.removeResistor();
    });
    removeButton.anchor.set(0.5);

    var plus = new Text(Phaser, {
      'game': game,
      'x': 642,
      'y': 28,
      'text': '+'
    });

    var minus = new Text(Phaser, {
      'game': game,
      'x': 745,
      'y': 28,
      'text': '-'
    });

    var power = new Text(Phaser, {
      'game': game,
      'x': 660,
      'y': 140,
      'text': 'power'
    });
  };
};
/*eslint-enable */