var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var routes = require('./route');
http.createServer(function(req, res) {
	var pathname = url.parse(req.url).pathname;
	for (var i = 0; i < routes.routes.length; i++) {
		var route = routes.routes[i];
		if(pathname === route[0]){
			var action = route[1];
			action(req,res);
			return;
		}
	}
	var action = routes.routes[routes.routes.length-1][1];
	action(req,res);
}).listen(80,"127.0.0.1");

console.log('listen to 127.0.0.1:80');


