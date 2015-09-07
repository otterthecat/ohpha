var form = document.querySelector('.intro form');
var submitButton = form.querySelector('[type="submit"]');

var voltageInput = form.querySelector('[name="voltage"]');
var currentInput = form.querySelector('[name="current"]');
var resistanceInput = form.querySelector('[name="resistance"]');


var validateAnswer = function(input, type){
  if(input.value !== parseFloat(circuit.getStats()[type]).toFixed(2).toString()){
    input.classList.add('error');
  } else {
    input.classList.remove('error');
    input.classList.add('correct');
  }
};

submitButton.onclick = function(event){
  event.preventDefault();

  validateAnswer(voltageInput, 'voltage');
  validateAnswer(currentInput, 'current');
  validateAnswer(resistanceInput, 'resistance');
};

module.exports = {
  "reset": function(){
    form.reset();
  },
  "clearValidation": function(){
    voltageInput.classList.remove('error', 'correct');
    resistanceInput.classList.remove('error', 'correct');
    currentInput.classList.remove('error', 'correct');
  }
};