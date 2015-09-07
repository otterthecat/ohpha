var submitButton = document.querySelector('[type="submit"]');

var voltageInput = document.querySelector('[name="voltage"]');
var currentInput = document.querySelector('[name="current"]');
var resistanceInput = document.querySelector('[name="resistance"]');


submitButton.onclick = function(event){
  event.preventDefault();

  if(voltageInput.value !== circuit.getStats().voltage.toString()){
    voltageInput.classList.add('error');
  } else {
    voltageInput.classList.remove('error');
    voltageInput.classList.add('correct');
  }

  if(currentInput.value !== parseFloat(circuit.getStats().current).toFixed(2).toString()){
    currentInput.classList.add('error');
  } else {
    currentInput.classList.remove('error');
    currentInput.classList.add('correct');
  }

  if(resistanceInput.value !== parseFloat(circuit.getStats().resistance).toFixed(2).toString()){
    resistanceInput.classList.add('error');
  } else {
    resistanceInput.classList.remove('error');
    resistanceInput.classList.add('correct');
  }
};

module.exports = submitButton;