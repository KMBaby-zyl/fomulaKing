var core = require('../lib/core');
function createFomula(latex){
	core.editorCanvas.createCanvas(latex);
	var fs = require('fs')
	  , out = fs.createWriteStream('./static/img/text.png')
	  , stream =  core.editorCanvas.canvas.pngStream();


	stream.on('data', function(chunk){
	  out.write(chunk);
	});

	stream.on('end', function(){
	  console.log('saved png');
	});
}

exports.createFomula  = createFomula;