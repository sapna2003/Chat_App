const express = require('express');
const app = express();

// Getting the http module
const http = require('http');

// Crteating a http server and passing express as request handler
const server = http.createServer(app);
const path = require('path');
const socketio = require('socket.io');
const io = socketio(server);


const users = {};
app.use('/',express.static(path.join(__dirname,'public')));
 
// it listen the events 
io.on('connection',(socket)=>{
    console.log(`Someone got connected with the id - ${socket.id}`);

    socket.on('send-msg',(data)=>{
        io.emit('received-msg',{
            msg: data.msg,
            username: users[socket.id]
        });
    });
    socket.on('login',(data)=>{
        users[socket.id] = data.username;
    });

});

const port = process.env.PORT || 8000;
server.listen(port, ()=>{
    console.log(`server started at port ${port}`);
});