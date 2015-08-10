module.exports = function(socket){

  var chatInput = document.querySelector('.msg');
  var chatBtn = document.querySelector('.chat button');
  var msgList = document.querySelector('.messages');

  socket.on('message:recieve', function(data){
    msgList.innerHTML += '<li>' + data + '</li>';
  });

  chatBtn.addEventListener('click', function(){
    console.log('clicked');
    console.log('sending ', chatInput.value);
    socket.emit('message:send', chatInput.value);
  });
};
