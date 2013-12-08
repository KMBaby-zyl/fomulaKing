var editorCanvas = global.editorCanvas = {
	s : null,
	a : null,
	defaultheight : 0,
	defaultwidth : 0,
	root : null,
	stop : false,
	currenttarget : null,
	saves : {},
	changer : function(){
		this.stop = !this.stop;
	},

	init : function(canvasID,csize){
		if (navigator.userAgent.indexOf('MSIE') > 0 && !editorCanvas.isIE9())
		{excanvas.initElement(document.getElementById("latex-target"));}
		this.s = new this.simbol(canvasID,csize,true);
		this.a = new this.Analysis(this);
		this.canvascount = 0;
		this.root = null;
		this.root = new this.node("undefine");
		this.root.value = "";
		this.root.size = this.s.csize;
		this.root.kind = 0;
		this.s.regroup(this.root, this.s.csize);
		this.replay();

		//模拟点击
		this.currenttarget = this.root;
		this.addInput(this);
	},

	/**
	 * 渲染一个题目里所有带frm标签的latex公式
	 * 参数box ： 可以是一个id ，也可以是一个jquery对象
	 */
	showfomular : function(box,color){
		/**
		 * util-lang.js - The minimal language enhancement
		 */
		var FRM_RE = /<frm>(.|\n)*?<\/frm>/gi;

		if(this.isString(box)){
			var $box = $("#"+box);
		}else{
			//默认为jquery对象
			var $box = box;
		}

		$box.each(function(){
			var myBox = $(this);
			var content = myBox.html();
			var myDate = new Date();
			var boxID = myDate.getTime()+editorCanvas.cid();
			if(content!=null){
				var resArray = content.match(FRM_RE);
				if(resArray!=null){
					for(var i=0; i<resArray.length;i++){
						resArray[i] = resArray[i].slice(5,-6);
					}

					//把frm中的内容设为空，ie下$($fraArray[i]).replaceWith(canvas);有bug
					// 这里使用div 带class标签是因为ie下一个bug   在div.html("<frm></frm>")后 frm标签消失
					var Ncontent = content.replace(FRM_RE,'<div class="FRM_DIV"></div>');	
					myBox.html(Ncontent);
					var $fraArray = $(".FRM_DIV",myBox);
					
					for(var i =0; i<$fraArray.length; i++){
						var canvas=document.createElement("canvas");
						$($fraArray[i]).replaceWith(canvas);
						canvas.id=boxID+"Canvas"+i;
					}

					//ie下调用excanvas
					if (navigator.userAgent.indexOf('MSIE') > 0 && !editorCanvas.isIE9()){
						var els = $("canvas");
						for (var i = 0; i < els.length; i++) {
							if (!els[i].getContext) {
								excanvas.initElement(els[i]);
							}
						}
					}

					var csize = parseInt(myBox.css("font-size").slice(0,-2));
					var arry= myBox.find("canvas");
					for(var i = 0; i<arry.length; i++){
						var result = editorCanvas.showCanvas(boxID+"Canvas"+i,resArray[i],csize,color);
						var height = $("#"+boxID+"Canvas"+i).css("height");
						if(result > 50)
						{$("#"+boxID+"Canvas"+i).css({"vertical-align":"middle"});}
						else
						{$("#"+boxID+"Canvas"+i).css({"vertical-align":-result+"px"});}
					}
				}
			}
		});
		//ie下调用excanvas ie6,7 vertical-align Hack
		if (navigator.userAgent.indexOf('MSIE') > 0 && !editorCanvas.isIE9()){
			$("canvas div").css({"vertical-align":"middle"});
		}
	},


	showCanvas : function(canvasID,latex,csize,color){
		var a = this.a;
		var s = this.s;
		var root = this.root;
		this.s = new this.simbol(canvasID,csize,false,color);
		this.a = new this.Analysis(this);
		this.a.distribute(latex);
		var offset = this.root.offset;
		this.a = a;
		this.s = s;
		this.root = root;
		
		return offset;
	},
	
	insertCanvas:function(boxID,container,latex){
		var myDate = new Date();
		var id = myDate.getTime()+editorCanvas.cid();
		var canvas = "&nbsp<canvas id= "+boxID+"Canvas"+id+"  width='20px'height='20px'>"+latex+"</canvas>&nbsp";
		container.insertText(canvas);
		var csize = parseInt($("#"+boxID).css("font-size").slice(0,-2));
		if (navigator.userAgent.indexOf('MSIE') > 0 && !editorCanvas.isIE9()){
			excanvas.initElement(document.getElementById(boxID+"Canvas"+id));
		}
		var result = editorCanvas.showCanvas(boxID+"Canvas"+id,latex,csize);
		if(result > 50){
			$("#"+boxID+"Canvas"+id).css({"vertical-align":"middle"});
		}else{
			$("#"+boxID+"Canvas"+id).css({"vertical-align":-result+"px"});
		}
	},
	
	

	node : function (type) {
		var self = this;
		self.width = 5;
		self.height = 5;
		self.child = [];
		self.father = null;
		self.type = type; 
		self.value = "";
		self.level;
		self.x;
		self.y;
		self.size;
		self.kind;
		self.max_width;
		self.max_height;
		self.up = null;
		self.down = null;
		self.left = null;
		self.right = null;
		self.offset = 0;
		self.arg = [];
	},
	
	

	simbol : function (canvas,csize,color) {
		this.canvas = canvas;
		this.ctx = this.canvas.getContext('2d');
		this.style = "bold"; //字体的粗细
		this.size = "25px"; //字体的大小
		this.font = "Arial"; //字体的样式
		this.weight = "normal";
		this.other = "宋体"; //Times New Roman,serif字体的样式
		this.color = color?color:"#222";
		this.ctx.lineWidth = 1;
		this.colum = 3;
		this.row = 3;
		this.MINCSIZE = 14;
		if(csize){
			if(csize > this.MINCSIZE){
				this.csize = csize;
			}else{
				this.csize = this.MINCSIZE;
			}
		}else{
			this.csize = 14; //默认是40
		}

		this.setFont = function () {
			//+" "+this.weight
			this.ctx.fillStyle = this.color;
			this.ctx.strokeStyle = this.color; 
			this.ctx.font = this.size + " " + this.other;
		}
		//检查函数
		this.check = function (expression) {
			if (expression == "")
				return false;
			else
				return true;
		}

		this.listpop = function (target) {
			if (this.freelist.length > 0) {
				return this.freelist.pop();
			} else {
				return document.createElement("span");
			}
		}
		
		this.listpush = function (target) {
			this.freelist.push(target);
		}
		
		this.regroup = function (branch, size) {
			if(!branch||branch == null){
				branch = null;
				branch = new editorCanvas.node("shuzi");
			}
			if(size < 14){
				branch.size = 14;
			}else{
				branch.size = size;
			}

			for (var i = 0; i < this.options[branch.type].children; i++) {
				if(!branch.child[i] || branch.child[i] == null){
					branch.child[i] = null;
					branch.child[i] = new editorCanvas.node("shuzi")
				}
				branch.child[i].kind = i;
				branch.child[i].father = branch;
			}
			this.options[branch.type].regroup(branch, branch.size);
			branch.lwidth = branch.width;
			branch.lheight = branch.height;
		}
		
		this.transaction = function (leave, dx, dy) {
			if (!leave || editorCanvas.stop == true){
				return;
			}
			leave.x = dx;
			leave.y = dy;
			this.options[leave.type].draw(leave, dx, dy);
		}
	},

	operation : function () {
		var self = this;
		self.regroup = null;
		self.draw = null;
		self.children = 0;
		self.major = 0;
		self.defaultValue = [];
	},

	//重新对canvas进行渲染
	replay : function () {
		console.log(this.s.canvas);
		this.s.ctx.clearRect(0, 0, this.s.canvas.width, this.s.canvas.height);
		this.adjust();
		editorCanvas.s.setFont();
		this.s.transaction(this.root, 0, 0);
	},
	//得到shuzi类型的宽度
	widthGetter : function (target){
		var WIDTH = 7;
		var result = target.value.length * WIDTH;
		return result;
	},
	// set canvas size = root
	adjust : function(){
		this.s.canvas.height = this.defaultheight;
		this.s.canvas.width = this.defaultwidth;
		var cur = this.root;
		this.s.canvas.width = cur.width+4;
		this.s.canvas.height = cur.height+2;

		if(this.s.iseditor){
			this.s.canvas.width = 584;
			this.s.canvas.height = 300;
		}
	},

	// clear a root
	clear : function (noder) {
		for (var i = 0; i < noder.child.length; i++) {
			if (noder.child[i] && noder.child[i] != null) {
				noder.child[i].father = null;
				noder.child[i] = null;
			}
		}
		noder.child = null;
		noder.child = [];
		noder.type = "undefine";
		noder.value = "";
	}

}
editorCanvas.simbol.prototype.freelist = [];
editorCanvas.simbol.prototype.options = [];

editorCanvas.simbol.prototype.options["right"] = (function(){
	var right = new editorCanvas.operation();
	
	right.regroup = function(leave,size){
		editorCanvas.s.regroup(leave.child[0],size);
		editorCanvas.s.regroup(leave.child[1],size);
		leave.width = leave.child[0].width+leave.child[1].width;
		leave.level = (leave.child[0].level > leave.child[1].level ? leave.child[0].level : leave.child[1].level) + 1;
		leave.size = size;
		leave.value = leave.child[0].value+leave.child[1].value;
		leave.offset = leave.child[0].offset > leave.child[1].offset ? leave.child[0].offset : leave.child[1].offset;
		var t1 = leave.child[0].height-leave.child[0].offset;
		var t2 = leave.child[1].height-leave.child[1].offset;
		leave.height = (t1 > t2 ? t1 :t2)+leave.offset;
	};
	
	right.draw = function(leave,dx,dy){
		editorCanvas.s.transaction(leave.child[0],dx,dy+leave.height-leave.offset-(leave.child[0].height-leave.child[0].offset));
		editorCanvas.s.transaction(leave.child[1],dx+leave.child[0].width,dy+leave.height-leave.offset-(leave.child[1].height-leave.child[1].offset));
	};
	right.children = 2;
	right.major = 0;
	return right;
})()

editorCanvas.simbol.prototype.options["shuzi"] = (function () {
	var shuzi = new editorCanvas.operation();

	shuzi.regroup = function (leave, size) {
		if(leave.value == ""){
			leave.width = 1;
		}else{
			leave.width = editorCanvas.widthGetter(leave);
		}
		leave.level = 0;
		//大小不能小于字体大小
		if(size< editorCanvas.s.MINCSIZE){
			size= editorCanvas.s.MINCSIZE;
		}
		leave.size = size;
		leave.height = size;
		leave.offset = 0;
	};

	shuzi.draw = function (leave, dx, dy) {
		editorCanvas.s.size = leave.size + "px";
		editorCanvas.s.setFont();
		editorCanvas.s.ctx.fillText(leave.value, dx, dy + leave.size*0.88);
	};

	shuzi.children = 0;
	return shuzi;
})();

editorCanvas.simbol.prototype.options["undefine"] = (function () {
	var define = new editorCanvas.operation();

	define.regroup = function (leave, size) {
		leave.height = size;
		leave.level = 0;
		leave.size = size;
		leave.width = size;
		leave.value = "";
		leave.offset = 0;
	};

	define.draw = function (leave, dx, dy) {
		editorCanvas.s.ctx.fillStyle = "#666";
		editorCanvas.s.ctx.fillRect(dx+leave.width/2-4, dy + leave.size / 8, 8, leave.height - leave.size / 4);
		editorCanvas.s.setFont();
	};

	define.children = 0;
	return define;
})();

editorCanvas.widthGetter3 = function (target){
	var parent = $("body");
	var widthBox = document.createElement("span"); //用于获取字符串显示宽度
	widthBox.style.fontFamily = $(target).css("font-family");
	widthBox.style.fontSize = $(target).css("font-size");
	widthBox.innerHTML = target.value.replace(/\s/gi,"&nbsp;").replace(">","&gt;").replace("<","&lt;");
	widthBox.id = "latex-toget";
	widthBox.setAttribute("class","match");
	widthBox.style.width = "";
	parent.append(widthBox);
	var result = $(widthBox).width();
	$(widthBox).remove();
	return result;
};
editorCanvas.widthGetter4 = function (target){
	var parent = $("body");
	var widthBox = document.createElement("span"); //用于获取字符串显示宽度
	widthBox.style.fontFamily = this.s.other;
	widthBox.style.fontSize = target.size + "px";
	widthBox.innerHTML = target.value.substring(0,this.position);
	widthBox.id = "latex-toget";
	widthBox.setAttribute("class","match");
	widthBox.style.width = "";
	parent.append(widthBox);
	var result = $(widthBox).width();
	$(widthBox).remove();
	widthBox.innerHTML = "";
	return result;
};

var Canvas = require('canvas');
var Analysis = require('./analysis');
var fomulaMath = require('./fomulaMath');
editorCanvas._node = {
	canvas: null,
	createCanvas : function(latex){
		this.canvas = new Canvas(200,200)
  		editorCanvas.a = new editorCanvas.Analysis();
  		editorCanvas.s = new editorCanvas.simbol(this.canvas,18);
  		editorCanvas.a.distribute(latex);
	}
};
exports.editorCanvas  = editorCanvas._node;