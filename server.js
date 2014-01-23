var app = require('http').createServer(handler);
var io = require('socket.io').listen(app);
var fs = require('fs');
var b = require('bonescript');

app.listen(8080);

io.set('log level', 2);   
io.set('browser client minification', true);
io.set('browser client etag', true);

console.log('Server running on: http://' + getIPAddress() + ':8080');

var led1 = "P8_14";
var led2 = "P8_16";

b.pinMode(led1, b.OUTPUT);
b.pinMode(led2, b.OUTPUT);
b.digitalWrite(led1,0);
b.digitalWrite(led2,0);

function handler(req, res){
	fs.readFile('index.html', function(err, data){
		if(err){
			res.writeHead(500);
			return res.end('Error loading index.html');
		}
		res.writeHead(200);
		res.end(data);
	});
}

io.sockets.on('connection',function(socket){
	
	socket.on('led1', function(data){
		if(data=='on'){
			b.digitalWrite(led2,0);
			b.digitalWrite(led1,1);
		}
		console.log('Led1: '+data);
	});

	socket.on('led2',function(data){
		if(data=='on'){
			b.digitalWrite(led1,0);
			b.digitalWrite(led2,1);
		}
		console.log('Led2: '+data);
	});
});

function getIPAddress() {
  var interfaces = require('os').networkInterfaces();
  for (var devName in interfaces) {
    var iface = interfaces[devName];
    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal)
        return alias.address;
    }
  }
  return '0.0.0.0';
}
