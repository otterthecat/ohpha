var particle = require(__dirname + '/../../particle');

module.exports = {
  "shine": function(brightness){
    var adjustedBrightness = Math.round(255 * brightness);
    particle('bulb', adjustedBrightness, function(e, r, b){
      if(e){
        console.log(e);
        return;
      }
      console.log(b);
    });
  },

  "off": function(){
    particle('bulb', '-1', function(err, res, body){
      if(err){
        conosle.log(err);
        return;
      }
      console.log(body);
    });
  },

  "explode": function(){
    particle('bulb', '-1', function(err, res, body){
      if(err){
        conosle.log(err);
        return;
      }
      console.log(body);
    });
  }
};