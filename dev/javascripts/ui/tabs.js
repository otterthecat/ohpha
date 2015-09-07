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

module.exports = tabs;