var fs = require('fs');
var url = require('url');
var path = require('path');
var fomulaKing = require('./lib/fomulaKing');
var routes = [];

var use = function(path,action){
	routes.push([path,action]);
}

function index(req, res){
	res.writeHead(200, {"Content-Type": "text/html"});
	console.log(__dirname + "/index.html");
	fs.readFile(__dirname + "/index.html", 'utf-8',function (err, data) {//读取内容
		if (err) throw err;
		res.write(data);
		res.end();
	});
}
function render(req, res){
	res.writeHead(200, {"Content-Type": "application/json"});
	var parses = req.url.split("?")[1].split("&");
	var parse;
	for (var i = 0; i < parses.length; i++) {
		var t = parses[i].split("=");
		if (t[0] == "latex") {
			parse = t[1];
		}
	}
	fomulaKing.createFomula(parse);
	res.end();
}
function all(req, res){
	var pathname = __dirname+url.parse(req.url).pathname;
    if (path.extname(pathname)=="") {
        pathname+="/";
    }
    if (pathname.charAt(pathname.length-1)=="/"){
        pathname+="index.html";
    }
    console.log(pathname);
    path.exists(pathname,function(exists){
    	if(exists){
    		console.log(path.extname(pathname));
	        switch(path.extname(pathname)){
				case ".html":
	                res.writeHead(200, {"Content-Type": "text/html"});
	                fs.readFile(pathname, 'utf-8',function (err, data) {//读取内容
			            if (err) throw err;
			            res.write(data);
			            res.end();
			        });
	                break;
	            case ".js":
	                res.writeHead(200, {"Content-Type": "text/javascript"});
	                 fs.readFile(pathname, 'utf-8',function (err, data) {//读取内容
			            if (err) throw err;
			            res.write(data);
			            res.end();
			        });
	                break;
	            case ".css":
	                res.writeHead(200, {"Content-Type": "text/css"});
	                break;
	            case ".gif":
	                res.writeHead(200, {"Content-Type": "image/gif"});
	                break;
	            case ".jpg":
	                res.writeHead(200, {"Content-Type": "image/jpeg"});
	                break;
	            case ".png":
	                res.writeHead(200, {"Content-Type": "image/png"});
	                fs.readFile(pathname,function (err, data) {//读取内容
		          		if (err) throw err;
			            res.write(data);
			            res.end();
			        });
	                break;
	 			default:
	                res.writeHead(200, {"Content-Type": "text/html"});
	                fs.readFile(pathname, 'utf-8',function (err, data) {//读取内容
			            if (err) throw err;
			            res.write(data);
			            res.end();
			        });
	        }
	        
	     } else {
            res.writeHead(404, {"Content-Type": "text/html"});
            res.end("<h1>404 Not Found</h1>");
        }
	});
}
use('/',index);
use('/index.html',index);
use('/render',render);
use("",all);
exports.routes = routes;