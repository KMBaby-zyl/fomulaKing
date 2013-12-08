var core = require('./core');
core.editorCanvas.createCanvas('\\sqrt[111]{2}');
function start(){
	var fs = require('fs')
	  , out = fs.createWriteStream(__dirname + '/text.png')
	  , stream =  core.editorCanvas.canvas.pngStream();

	stream.on('data', function(chunk){
	  out.write(chunk);
	});

	stream.on('end', function(){
	  console.log('saved png');
	});
}

exports.start  = start;