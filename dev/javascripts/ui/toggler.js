var toggler = document.querySelector('.toggle');
var iframe = document.querySelector('iframe');
var socket;

  var tabs = [].slice.call(document.querySelectorAll('.tabs li'));

  tabs.forEach(function(tab){
    tab.addEventListener('click', function(e){
      var selectedClass = e.target.innerHTML.toLowerCase().trim();
      var targetSection = document.querySelector('.tab-content.' + selectedClass);
      var sections = [].slice.call(document.querySelectorAll('.tab-content'));

      sections.forEach(function(section){
        section.classList.add('parked');
      });
      targetSection.classList.remove('parked');
    });
  });


var handler = function(){
  var canvas = document.querySelector('canvas');
  canvas.classList.toggle('hide');
  iframe.classList.toggle('hide');

/*
  if(!iframe.classList.contains('hide')){
    iframe.src = 'https://codebender.cc/embed/sketch:131324';
  } else {
    iframe.src = '';
  }
*/
};
/*
toggler.addEventListener('click', function(){
  socket.emit('toggler:clicked');
});
*/
module.exports = function(s){
  socket = s;
  return handler;
};