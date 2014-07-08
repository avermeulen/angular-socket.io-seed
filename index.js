var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/bower_components'));

app.get('/', function(req, res){
  res.sendfile('index.html');
});

io.on('connection', function(socket){
  //console.log('a user connected');
  socket.on('disconnect', function(){
    //console.log('user disconnected');
  });
  socket.on('chat message', function(msg){
  	console.log('get message : ' + msg);
  	//socket.emit.broadcast('chat message', msg);
  	io.emit('chat message', msg);
  });
});

var portNumber = process.env.PORT_NUMBER || 4001
http.listen(portNumber, function(){
	console.log('listening on port : ' + portNumber);
});