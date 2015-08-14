var request = require('request');

var partUrl = 'https://api.particle.io/v1/devices';
var deviceId = '';
var token = '';

module.exports = function(data, callback){
  request.post(partUrl, data, callback);
}