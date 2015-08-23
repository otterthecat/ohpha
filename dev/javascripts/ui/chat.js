module.exports = function(socket){

  var chat = document.querySelector('.chat');
  var chatInput = chat.querySelector('.msg');
  var chatBtn = chat.querySelector('button');
  var msgList = chat.querySelector('.messages');
  var chatTab = chat.querySelector('header');

  socket.on('msg:recieved', function(data){
    msgList.innerHTML += '<li>' + data + '</li>';
  });

  chatTab.addEventListener('click', function(){
    chat.classList.toggle('active');
  });

  chatBtn.addEventListener('click', function(){
    socket.emit('sent', chatInput.value);
    chatInput.value = '';
  });
};
