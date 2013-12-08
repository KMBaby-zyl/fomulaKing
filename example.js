var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var picture = require('./picture');

picture.start();
 http.createServer(function(req, res) {
	var pathname=__dirname+url.parse(req.url).pathname;
    if (path.extname(pathname)=="") {
        pathname+="/";
    }
    if (pathname.charAt(pathname.length-1)=="/"){
        pathname+="index.html";
    }
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
    }).listen(80,"127.0.0.1");

console.log('listen to 127.0.0.1:80');
