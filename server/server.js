const path = require('path');
const http = require('http');
const express = require('express');
const socketIo = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.port || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIo(server);

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
    console.log('New User Connected');

    socket.emit('newMessage', {
        from: 'John',
        test: 'see u then',
        createdAt: new Date()
    });

    socket.on('createMessage', function(message){
        console.log(`createMessage`, message);
    });

    socket.on('disconnect', ()=>{
        console.log('User was disconnected');
    });
});
server.listen(port,()=>{
    console.log(`server is up at port ${port}`);
});
