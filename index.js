var express = require('express');
var socket = require('socket.io');

// App set up
var app = express();
var server = app.listen(2000, function() {
    console.log('Listening to requests on port 2000')
});

// Static files
app.use(express.static('public'));

// Socket set up
var io = socket(server);

io.on('connection', function(socket) {
    console.log('made socket connection', socket.id);

// Handle chat event
    socket.on('chat', function(data) {
        io.sockets.emit('chat', data);
    });

// Feedback
    socket.on('typing', function(data) {
        socket.broadcast.emit('typing', data);
    })
});