const path = require('path');
const http = require('http');
const express = require('express');
const socketIo = require('socket.io');

const {generateMessage} =  require('./utils/message');

const publicPath = path.join(__dirname, '../public');
const port = process.env.port || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIo(server);
 
app.use(express.static(publicPath));

io.on('connection',(socket)=>{
    console.log('New User Connected');

    //socket.emit from admin Welcome to chat app
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat app'));

    //socket.broadcast.emit from admin text new user joined
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

    socket.on('createMessage', function(message){
        io.emit('newMessage', generateMessage(message.from, message.text));

        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAT: new Date().getTime()
        // })
    });

    socket.on('disconnect', ()=>{
        console.log('User was disconnected');
    });
});
server.listen(port,()=>{
    console.log(`server is up at port ${port}`);
});
