var toggler = document.querySelector('.toggle');
var iframe = document.querySelector('iframe');
var socket;

  var tabs = [].slice.call(document.querySelectorAll('.tabs li'));

  tabs.forEach(function(tab){
    tab.addEventListener('click', function(e){
      var selectedClass = e.target.innerHTML.toLowerCase().trim();
      var targetSection = document.querySelector('.tab-content.' + selectedClass);
      var sections = [].slice.call(document.querySelectorAll('.tab-content'));

      tabs.forEach(function(tab){
        tab.classList.remove('active');
      });
      e.target.classList.add('active');

      sections.forEach(function(section){
        section.classList.add('parked');
      });
      targetSection.classList.remove('parked');
    });
  });

// deprecated
var handler = function(){
  var canvas = document.querySelector('canvas');
  canvas.classList.toggle('hide');
  iframe.classList.toggle('hide');
};

module.exports = function(s){
  socket = s;
  return handler;
};