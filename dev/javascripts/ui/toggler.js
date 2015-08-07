var toggler = document.querySelector('.toggle');
var iframe = document.querySelector('iframe');
var socket;

var handler = function(){
  var canvas = document.querySelector('canvas');
  canvas.classList.toggle('hide');
  iframe.classList.toggle('hide');

  if(!iframe.classList.contains('hide')){
    iframe.src = 'https://codebender.cc/embed/sketch:131324';
  } else {
    iframe.src = '';
  }
};

toggler.addEventListener('click', function(){
  socket.emit('toggler:clicked');
});

module.exports = function(s){
  socket = s;
  return handler;
};