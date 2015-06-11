window.onload = function(){

  var bulb, electron, nineVolt, resistor;
  var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'ohms', {
      preload: preload,
      create: create,
      update: update,
      render: render
  });

  function preload(){
    game.stage.backgroundColor = '#666';
    game.load.image('bulb', 'circuit-stuff/bulb.png');
    game.load.image('electron', 'circuit-stuff/electron.png');
    game.load.image('nineVolt', 'circuit-stuff/nineVolt.png');
    game.load.image('resistor', 'circuit-stuff/resistor.png');
  };

  function createBattery(){
    nineVolt = game.add.sprite(40, 160, 'nineVolt');
    nineVolt.anchor.set(0.5);
    //nineVolt.rotation = 90 * Math.PI / 180; // needs to be radians
  };

  function createBulb(){
    bulb = game.add.sprite(300, 140, 'bulb');
    bulb.anchor.set(0.5);
  };

  function createFirstElec(){
    var electron = game.add.sprite(20, 20, 'electron');
    electron.anchor.set(0.5);

    electronTween = game.add.tween(electron).to({x: 300}, 1000)
      .to({y: 300}, 1000)
      .to({x: 20}, 1000)
      .to({y: 20}, 1000)
      .loop()
      .start();
  };

    function createSecondElec(num){
    var electron = game.add.sprite(300, 300, 'electron');
    electron.anchor.set(0.5);

    electronTween = game.add.tween(electron).to({x: 20}, 1000)
      .to({y: 20}, 1000)
      .to({x: 300}, 1000)
      .to({y: 300}, 1000)
      .loop()
      .start();
  };

  function create(){
    createFirstElec();
    createSecondElec();
    createBattery();
    createBulb();
  };

  function update(){

  };

  function render(){
    // uncomment to view debug bounding box
    // game.debug.body(car);
  };
};