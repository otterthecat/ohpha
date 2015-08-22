var Beam = require('particle-beam');
var bulb = require('./config/config').bulb_board;

var beam = Beam({
  "device": bulb.id,
  "token": bulb.token
});

module.exports = beam;