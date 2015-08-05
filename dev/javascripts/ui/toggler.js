var toggler = document.querySelector('.toggle');
var iframe = document.querySelector('iframe');

toggler.addEventListener('click', function(){
  var canvas = document.querySelector('canvas');
  canvas.classList.toggle('hide');
  iframe.classList.toggle('hide');

  if(!iframe.classList.contains('hide')){
    iframe.src = 'https://codebender.cc/embed/sketch:131324';
  } else {
    iframe.src = '';
  }
});

module.exports = toggler;