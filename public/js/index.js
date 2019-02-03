var socket = io();
socket.on('connect',()=>{
    console.log('connected to server');

    socket.emit('createMessage', {
        from: 'Nippun',
        text: 'Yup, that works for me.'
    });
});

socket.on('disconnect', ()=>{
    console.log('Disconnected from server');
});

socket.on('newMessage',function(message){
    console.log('newMessage', message);
});