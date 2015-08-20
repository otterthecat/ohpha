var Beam = require('particle-beam');
var beam = Beam({
  "device": process.env.YODA_ID,
  "token": process.env.YODA_TOKEN
});

module.exports = beam;