editorCanvas.simbol.prototype.options["fraction"] = (function () {//分数
	var fraction = new editorCanvas.operation();

	fraction.regroup = function (leave, size) {
		editorCanvas.s.regroup(leave.child[0],size);
		editorCanvas.s.regroup(leave.child[1],size);
		leave.level = leave.child[0].level > leave.child[1].level ? leave.child[0].level : leave.child[1].level + 1;
		leave.width = leave.child[0].width > leave.child[1].width ? leave.child[0].width : leave.child[1].width;
		leave.width += leave.level * size / 4; //根据该元素所在层级画出相应长度的分数线，以此来区分分母和分子
		leave.height = leave.child[0].height + leave.child[1].height;
		leave.value = "{\\frac{" + leave.child[0].value + "}{" + leave.child[1].value + "}}";
		leave.size = size;
		leave.offset = leave.child[1].height-leave.size/2;
	};

	fraction.draw = function (leave, dx, dy) {
		editorCanvas.s.transaction(leave.child[0], dx + (leave.width - leave.child[0].width) / 2, dy);
		editorCanvas.s.transaction(leave.child[1], dx + (leave.width - leave.child[1].width) / 2, dy + leave.child[0].height);
		editorCanvas.s.ctx.beginPath();
		editorCanvas.s.ctx.moveTo(dx, dy + leave.child[0].height);
		editorCanvas.s.ctx.lineTo(dx + leave.width, dy + leave.child[0].height);
		editorCanvas.s.ctx.stroke();
	};

	fraction.children = 2;
	for(var i = 0;i < fraction.children;i++)
		fraction.defaultValue[i] = null;
	fraction.major = 1; //major为add_operation时focus对象
	return fraction;
})();

editorCanvas.simbol.prototype.options["radicent"] = (function () {//根号
	var radicent = new editorCanvas.operation();

	radicent.regroup = function (leave, size) {
		editorCanvas.s.regroup(leave.child[0],size*0.5);
		editorCanvas.s.regroup(leave.child[1],size);
		
		var lt = leave.child[0].width <= size/4 ? size/4 : leave.child[0].width;
		leave.width = lt + leave.child[1].width + size /4;
		leave.height = leave.child[0].height + leave.child[1].height - size *0.375;
		leave.level = leave.child[0].level > leave.child[1].level ? leave.child[0].level : leave.child[1].level + 1;
		leave.size = size;
		leave.value = "\\sqrt[" + leave.child[0].value + "]{" + leave.child[1].value + "}";
		leave.offset = leave.child[1].offset;
	};

	radicent.draw = function (leave, dx, dy) {
		var lt = leave.child[0].width <= leave.size/4 ? leave.size/4 : leave.child[0].width;
		editorCanvas.s.transaction(leave.child[0], dx, dy);
		editorCanvas.s.transaction(leave.child[1], dx + lt + leave.size / 4, dy + leave.child[0].height - leave.size *0.375);
		
		editorCanvas.s.ctx.beginPath();

		editorCanvas.s.ctx.moveTo(dx + lt + leave.size / 4 + leave.child[1].width, dy + leave.child[0].height - leave.size *0.375);
		editorCanvas.s.ctx.lineTo(dx + lt + leave.size / 4, dy + leave.child[0].height - leave.size *0.375);
		editorCanvas.s.ctx.lineTo(dx + lt, dy + leave.child[0].height - leave.size *0.375 + leave.child[1].height);
		editorCanvas.s.ctx.lineTo(dx + lt - leave.size / 8, dy + leave.child[0].height - leave.size *0.375 + leave.child[1].height - leave.size / 4);
		editorCanvas.s.ctx.lineTo(dx + lt - leave.size / 4, dy + leave.child[0].height - leave.size *0.375 + leave.child[1].height);

		editorCanvas.s.ctx.stroke();
	};

	radicent.children = 2;
	for(var i = 0;i < radicent.children;i++)
		radicent.defaultValue[i] = null;
	radicent.major = 1;
	return radicent;
})();
//二次方根
editorCanvas.simbol.prototype.options["radicent2"] = (function(){//下划线
	var radicent = new editorCanvas.operation();

	radicent.regroup = function (leave, size) {
		editorCanvas.s.regroup(leave.child[0],size*0.5);
		editorCanvas.s.regroup(leave.child[1],size);
		
		var lt = leave.child[0].width <= size/4 ? size/4 : leave.child[0].width;
		leave.width = lt + leave.child[1].width + size /4;
		leave.height = leave.child[0].height + leave.child[1].height - size *0.375;
		leave.level = leave.child[0].level > leave.child[1].level ? leave.child[0].level : leave.child[1].level + 1;
		leave.size = size;
		leave.value = "\\sqrt{" + leave.child[1].value + "}";
		leave.offset = leave.child[1].offset;
	};

	radicent.draw = function (leave, dx, dy) {
		var lt = leave.child[0].width <= leave.size/4 ? leave.size/4 : leave.child[0].width;
		editorCanvas.s.transaction(leave.child[0], dx, dy);
		editorCanvas.s.transaction(leave.child[1], dx + lt + leave.size / 4, dy + leave.child[0].height - leave.size *0.375);
		
		editorCanvas.s.ctx.beginPath();

		editorCanvas.s.ctx.moveTo(dx + lt + leave.size / 4 + leave.child[1].width, dy + leave.child[0].height - leave.size *0.375);
		editorCanvas.s.ctx.lineTo(dx + lt + leave.size / 4, dy + leave.child[0].height - leave.size *0.375);
		editorCanvas.s.ctx.lineTo(dx + lt, dy + leave.child[0].height - leave.size *0.375 + leave.child[1].height);
		editorCanvas.s.ctx.lineTo(dx + lt - leave.size / 8, dy + leave.child[0].height - leave.size *0.375 + leave.child[1].height - leave.size / 4);
		editorCanvas.s.ctx.lineTo(dx + lt - leave.size / 4, dy + leave.child[0].height - leave.size *0.375 + leave.child[1].height);

		editorCanvas.s.ctx.stroke();
	};

	radicent.children = 2;
	radicent.defaultValue[0] = "";
	radicent.major = 1;
	return radicent;
})();
//三次方根
editorCanvas.simbol.prototype.options["radicent3"] = (function () {
	var radicent = new editorCanvas.operation();

	radicent.regroup = function (leave, size) {
		editorCanvas.s.regroup(leave.child[0],size*0.5);
		editorCanvas.s.regroup(leave.child[1],size);
		
		var lt = leave.child[0].width <= size/4 ? size/4 : leave.child[0].width;
		leave.width = lt + leave.child[1].width + size /4;
		leave.height = leave.child[0].height + leave.child[1].height - size *0.375;
		leave.level = leave.child[0].level > leave.child[1].level ? leave.child[0].level : leave.child[1].level + 1;
		leave.size = size;
		leave.value = "\\sqrt[" + leave.child[0].value + "]{" + leave.child[1].value + "}";
		leave.offset = leave.child[1].offset;
	};

	radicent.draw = function (leave, dx, dy) {
		var lt = leave.child[0].width <= leave.size/4 ? leave.size/4 : leave.child[0].width;
		editorCanvas.s.transaction(leave.child[0], dx, dy);
		editorCanvas.s.transaction(leave.child[1], dx + lt + leave.size / 4, dy + leave.child[0].height - leave.size *0.375);
		
		editorCanvas.s.ctx.beginPath();

		editorCanvas.s.ctx.moveTo(dx + lt + leave.size / 4 + leave.child[1].width, dy + leave.child[0].height - leave.size *0.375);
		editorCanvas.s.ctx.lineTo(dx + lt + leave.size / 4, dy + leave.child[0].height - leave.size *0.375);
		editorCanvas.s.ctx.lineTo(dx + lt, dy + leave.child[0].height - leave.size *0.375 + leave.child[1].height);
		editorCanvas.s.ctx.lineTo(dx + lt - leave.size / 8, dy + leave.child[0].height - leave.size *0.375 + leave.child[1].height - leave.size / 4);
		editorCanvas.s.ctx.lineTo(dx + lt - leave.size / 4, dy + leave.child[0].height - leave.size *0.375 + leave.child[1].height);

		editorCanvas.s.ctx.stroke();
	};

	radicent.children = 2;
	radicent.defaultValue[0] = "3";
	radicent.major = 1;
	return radicent;
})();

editorCanvas.simbol.prototype.options["supsub"] = (function (){//上下标
	var supsub = new editorCanvas.operation();
	
	supsub.regroup = function(leave,size){
		editorCanvas.s.regroup(leave.child[0],size);
		editorCanvas.s.regroup(leave.child[1],size*0.5);
		editorCanvas.s.regroup(leave.child[2],size*0.5);

		leave.width = leave.child[1].width > leave.child[2].width ? leave.child[1].width : leave.child[2].width;
		leave.width = leave.child[0].width + leave.width;
		leave.height = leave.child[0].height + leave.child[1].height + leave.child[2].height - size*0.75;
		leave.level = leave.child[0].level > leave.child[1].level ? leave.child[0].level : leave.child[1].level;
		leave.level = leave.child[2].level > leave.level ? leave.child[2].level : leave.level + 1;
		leave.size = size;
		leave.value = "{{" + leave.child[0].value + "}^{" + leave.child[1].value + "}_{"+leave.child[2].value+"}}";
		leave.offset = leave.child[2].height-leave.size/2+leave.child[0].offset;
	};
	
	supsub.draw = function(leave,dx,dy){
		editorCanvas.s.transaction(leave.child[0], dx, dy + leave.child[1].height - leave.size *0.375);
		editorCanvas.s.transaction(leave.child[1], dx + leave.child[0].width, dy);
		editorCanvas.s.transaction(leave.child[2], dx + leave.child[0].width,dy + leave.child[0].height + leave.child[1].height - leave.size*0.75);
	};
	
	supsub.children = 3;
	for(var i = 0;i < supsub.children;i++)
		supsub.defaultValue[i] = null;
	supsub.major = 0;
	return supsub;
})();
//指数/上标
editorCanvas.simbol.prototype.options["exponent"] = (function () {//指数
	var exponent = new editorCanvas.operation();

	exponent.regroup = function (leave, size) {
		editorCanvas.s.regroup(leave.child[0],size);
		editorCanvas.s.regroup(leave.child[1],size*0.5);

		leave.width = leave.child[0].width + leave.child[1].width;
		leave.height = leave.child[0].height + leave.child[1].height - size *0.375;
		leave.level = leave.child[0].level > leave.child[1].level ? leave.child[0].level : leave.child[1].level + 1;
		leave.size = size;
		leave.value = "{{" + leave.child[0].value + "}^{" + leave.child[1].value + "}}";
		leave.offset = leave.child[0].offset;
	};

	exponent.draw = function (leave, dx, dy) {
		editorCanvas.s.transaction(leave.child[0], dx, dy + leave.child[1].height - leave.size *0.375);
		editorCanvas.s.transaction(leave.child[1], dx + leave.child[0].width, dy);
	};

	exponent.children = 2;
	for(var i = 0;i < exponent.children;i++)
		exponent.defaultValue[i] = null;
	exponent.major = 0;
	return exponent;
})();
//平方
editorCanvas.simbol.prototype.options["square"] = (function () {
	var exponent = new editorCanvas.operation();

	exponent.regroup = function (leave, size) {
		editorCanvas.s.regroup(leave.child[0],size);
		editorCanvas.s.regroup(leave.child[1],size*0.5);

		leave.width = leave.child[0].width + leave.child[1].width;
		leave.height = leave.child[0].height + leave.child[1].height - size *0.375;
		leave.level = leave.child[0].level > leave.child[1].level ? leave.child[0].level : leave.child[1].level + 1;
		leave.size = size;
		leave.value = "{{" + leave.child[0].value + "}^{" + leave.child[1].value + "}}";
		leave.offset = leave.child[0].offset;
	};

	exponent.draw = function (leave, dx, dy) {
		editorCanvas.s.transaction(leave.child[0], dx, dy + leave.child[1].height - leave.size *0.375);
		editorCanvas.s.transaction(leave.child[1], dx + leave.child[0].width, dy);
	};

	exponent.children = 2;
	exponent.defaultValue[1] = "2";
	exponent.major = 0;
	return exponent;
})();
//立方
editorCanvas.simbol.prototype.options["cube"] = (function () {
	var exponent = new editorCanvas.operation();

	exponent.regroup = function (leave, size) {
		editorCanvas.s.regroup(leave.child[0],size);
		editorCanvas.s.regroup(leave.child[1],size*0.5);

		leave.width = leave.child[0].width + leave.child[1].width;
		leave.height = leave.child[0].height + leave.child[1].height - size *0.375;
		leave.level = leave.child[0].level > leave.child[1].level ? leave.child[0].level : leave.child[1].level + 1;
		leave.size = size;
		leave.value = "{{" + leave.child[0].value + "}^{" + leave.child[1].value + "}}";
		leave.offset = leave.child[0].offset;
	};

	exponent.draw = function (leave, dx, dy) {
		editorCanvas.s.transaction(leave.child[0], dx, dy + leave.child[1].height - leave.size *0.375);
		editorCanvas.s.transaction(leave.child[1], dx + leave.child[0].width, dy);
	};

	exponent.children = 2;
	exponent.defaultValue[1] = "3";
	exponent.major = 0;
	return exponent;
})();


editorCanvas.simbol.prototype.options["sum"] = (function () {//求和
	var sum = new editorCanvas.operation();

	sum.regroup = function (leave, size) {
		if (leave == editorCanvas.root) {
			editorCanvas.s.regroup(leave.child[0],size*0.65);
			editorCanvas.s.regroup(leave.child[1],size*0.65);
		} else {
			editorCanvas.s.regroup(leave.child[0],size);
			editorCanvas.s.regroup(leave.child[1],size);
		}
		editorCanvas.s.regroup(leave.child[2],size);

		leave.width = leave.child[0].width > leave.child[1].width ? leave.child[0].width : leave.child[1].width;
		leave.width = leave.width > size ? leave.width : size;
		leave.width += leave.child[2].width;
		var lheight = leave.child[1].height + size / 2;
		var rheight = leave.child[0].height + size / 2;
		lheight = lheight > leave.child[2].height / 2 ? lheight : leave.child[2].height / 2;
		rheight = rheight > leave.child[2].height / 2 ? rheight : leave.child[2].height / 2;
		leave.height = lheight + rheight;
		leave.level = leave.child[0].level > leave.child[1].level ? leave.child[0].level : leave.child[1].level;
		leave.level = leave.level > leave.child[2].level ? leave.level : leave.child[2].level + 1;
		leave.size = size;

		leave.value = "{\\sum\\limits_{" + leave.child[0].value + "}^{" + leave.child[1].value + "}{" + leave.child[2].value + "}" + "}";
		leave.offset = leave.child[0].height > leave.child[2].offset ? leave.child[0].height : leave.child[2].offset ;
	};

	sum.draw = function (leave, dx, dy) {
		var lx,
		ly;
		lx = dx + (leave.width - leave.child[2].width - leave.child[1].width) / 2;
		if (leave.child[1].height + leave.size / 2 > leave.child[2].height / 2) {
			ly = dy;
		} else {
			ly = dy + leave.child[2].height / 2 - (leave.child[1].height + leave.size / 2);
		}
		editorCanvas.s.transaction(leave.child[1], lx, ly);

		editorCanvas.s.size = leave.size*0.88+"px";
		editorCanvas.s.setFont();
		if (navigator.userAgent.indexOf('MSIE') > 0){	
			editorCanvas.s.ctx.fillText("∑",dx + (leave.width - leave.child[2].width - leave.size*1.2) / 2,
			ly+leave.child[1].height/2);
		}
		else
		{
			editorCanvas.s.ctx.fillText("∑",dx + (leave.width - leave.child[2].width - leave.size*0.8) / 2,
			ly + leave.child[1].height+leave.size*0.8);
		}

		lx = dx + (leave.width - leave.child[2].width - leave.child[0].width) / 2;
		ly = ly + leave.child[1].height + leave.size;
		editorCanvas.s.transaction(leave.child[0], lx, ly);

		lx = dx + leave.width - leave.child[2].width;
		if (leave.child[2].height / 2 > leave.child[1].height + leave.size / 2) {
			ly = dy;
		} else {
			ly = dy + leave.child[1].height + leave.size / 2 - leave.child[2].height / 2;
		}
		editorCanvas.s.transaction(leave.child[2], lx, ly);
	};

	sum.children = 3;
	for(var i = 0;i < sum.children;i++)
		sum.defaultValue[i] = null;
	sum.major = 2;
	return sum;
})();

editorCanvas.simbol.prototype.options["parentheses"] = (function () {//括号
	var parentheses = new editorCanvas.operation();

	parentheses.regroup = function (leave, size) {
		editorCanvas.s.regroup(leave.child[0],size);
		leave.width = leave.child[0].width + size;
		leave.level = leave.child[0].level + 1;
		if (leave.level == 1) {
			leave.height = leave.child[0].height;
		} else {
			leave.height = leave.child[0].height + 1.5 * size;
		}

		leave.size = size;
		leave.value = "\\left ( {" + leave.child[0].value + "} \\right )";
		leave.offset = leave.child[0].offset;
	};

	parentheses.draw = function (leave, dx, dy) {
		if (leave.level == 1) {
			editorCanvas.s.size = leave.size + "px";
			editorCanvas.s.setFont();
			editorCanvas.s.ctx.fillText("(", dx, dy + leave.height);
			editorCanvas.s.transaction(leave.child[0], dx + leave.size / 2, dy + leave.height / 8);
			editorCanvas.s.ctx.fillText(")", dx + leave.size / 2 + leave.child[0].width, dy + leave.height);
		} else {
			editorCanvas.s.ctx.beginPath();
			editorCanvas.s.ctx.arc(dx + leave.size, dy + leave.size * 0.65, leave.size, 1.25 * Math.PI, Math.PI, true);
			editorCanvas.s.ctx.arc(dx + leave.size, dy + leave.size * 0.65 + leave.child[0].height, leave.size, Math.PI, 0.75 * Math.PI, true);
			editorCanvas.s.ctx.stroke();

			editorCanvas.s.transaction(leave.child[0], dx + leave.size / 4, dy + leave.size * 0.65);

			editorCanvas.s.ctx.beginPath();
			editorCanvas.s.ctx.arc(dx+leave.width - leave.size, dy + leave.size * 0.65, leave.size, 1.75 * Math.PI, 0, false);
			editorCanvas.s.ctx.arc(dx+leave.width - leave.size, dy + leave.size * 0.65 + leave.child[0].height, leave.size, 0, 0.25 * Math.PI, false);
			editorCanvas.s.ctx.stroke();
		}
	};

	parentheses.children = 1;
	for(var i = 0;i < parentheses.children;i++)
		parentheses.defaultValue[i] = null;
	parentheses.major = 0;
	return parentheses;
})();

editorCanvas.simbol.prototype.options["matrix"] = (function () {//矩阵
	var matrix = new editorCanvas.operation();

	matrix.regroup = function (leave, size) {
		for (var i = 0; i < leave.child.length; i++) {
			editorCanvas.s.regroup(leave.child[i],size);
		}

		if(!leave.arg[0]){leave.arg[0] = 3;}
		if(!leave.arg[1]){leave.arg[1] = 3;}
		
		if (!leave.max_width)
			leave.max_width = new Array(leave.arg[0]);
		if (!leave.max_height)
			leave.max_height = new Array(leave.arg[1]);

		for (var i = 0; i < leave.max_width.length; i++)
			leave.max_width[i] = 0;
		for (var i = 0; i < leave.max_height.length; i++)
			leave.max_height[i] = 0;

		leave.value = "\\begin{matrix}";
		leave.level = 0;
		for (var i = 0; i < leave.child.length; i++) {
			if (leave.child[i].width > leave.max_width[i % leave.max_width.length])
				leave.max_width[i % leave.max_width.length] = leave.child[i].width;

			if (leave.child[i].height > leave.max_height[parseInt(i / leave.max_width.length)])
				leave.max_height[parseInt(i / leave.max_width.length)] = leave.child[i].height;

			if (leave.child[i].level > leave.level)
				leave.level = leave.child[i].level;

			if (i != 0) {
				if (i % leave.max_width.length == 0)
					leave.value += "\\\\";
				else
					leave.value += "&";
			}
			leave.value += "{" + leave.child[i].value + "}";
		}
		leave.value += "\\end{matrix}";
		leave.level++;
		leave.width = leave.height = 0;
		for (var i = 0; i < leave.max_width.length; i++) {
			leave.width += leave.max_width[i];
			if (i > 0)
				leave.max_width[i] += leave.max_width[i - 1];
		}
		for (var i = 0; i < leave.max_height.length; i++) {
			leave.height += leave.max_height[i];
			if (i > 0)
				leave.max_height[i] += leave.max_height[i - 1];
		}

		leave.width += (leave.max_width.length - 1) * leave.size;
		//leave.height += (leave.max_height.length - 1) * leave.size;

		leave.size = size;
		leave.offset = 0;
	}

	matrix.draw = function (leave, dx, dy) {
		var lx;
		var ly;
		var index;
		for (var i = 0; i < leave.child.length; i++) {
			index = i % leave.max_width.length;
			if (index == 0) {
				lx = dx + (leave.max_width[0] - leave.child[i].width) / 2;
			} else {
				lx = dx + leave.max_width[index - 1] +
					(leave.max_width[index] - leave.max_width[index - 1] - leave.child[i].width) / 2 + leave.size * index;
			}

			index = parseInt(i / leave.max_width.length);

			if (index == 0) {
				ly = dy + (leave.max_height[0] - leave.child[i].height) / 2;
			} else {
				ly = dy + leave.max_height[index - 1] +
					(leave.max_height[index] - leave.max_height[index - 1] - leave.child[i].height) / 2;
			}
			editorCanvas.s.transaction(leave.child[i], lx, ly);
		}
	};

	matrix.row = 3;
	matrix.colum = 3;
	matrix.children = matrix.row*matrix.colum;
	for(var i = 0;i < matrix.children;i++)
		matrix.defaultValue[i] = null;
	matrix.major = 0;
	return matrix;
})();

editorCanvas.simbol.prototype.options["subscript"] = (function(){//下标
	var subscript = new editorCanvas.operation();

	subscript.regroup = function (leave, size) {
		editorCanvas.s.regroup(leave.child[0],size);

		if (leave == editorCanvas.root) {
			editorCanvas.s.regroup(leave.child[1],size*0.5);
		} else {
			editorCanvas.s.regroup(leave.child[1],size*0.75);
		}

		leave.width = leave.child[0].width + leave.child[1].width;
		leave.height = leave.child[0].height + leave.child[1].height - size *0.5;
		leave.level = leave.child[0].level > leave.child[1].level ? leave.child[0].level : leave.child[1].level + 1;
		leave.size = size;
		leave.value = "{{" + leave.child[0].value + "}_{" + leave.child[1].value + "}}";
		leave.offset = leave.child[1].height-leave.size*0.5;
	};

	subscript.draw = function (leave, dx, dy) {
		editorCanvas.s.transaction(leave.child[0], dx, dy);
		editorCanvas.s.transaction(leave.child[1], dx + leave.child[0].width, dy+leave.child[0].height-leave.size*0.5);
	};

	subscript.children = 2;
	for(var i = 0;i < subscript.children;i++)
		subscript.defaultValue[i] = null;
	subscript.major = 0;
	return subscript;
})()

editorCanvas.simbol.prototype.options["overline"] = (function(){//上划线
	var overline = new editorCanvas.operation();
	
	overline.regroup = function(leave,size){
		editorCanvas.s.regroup(leave.child[0],size);
		leave.width = leave.child[0].width;
		leave.height = leave.child[0].height+size/8;
		leave.level = leave.child[0].level+1;
		leave.size = size;
		leave.value = "\\overline{"+leave.child[0].value+"}";
		leave.offset = leave.child[0].offset;
	};
	
	overline.draw = function(leave,dx,dy){
		editorCanvas.s.transaction(leave.child[0],dx,dy+leave.size/8);
		
		editorCanvas.s.ctx.beginPath();
		editorCanvas.s.ctx.moveTo(dx,dy+leave.size/8);
		editorCanvas.s.ctx.lineTo(dx+leave.child[0].width,dy+leave.size/8);
		editorCanvas.s.ctx.stroke();
	};
	
	overline.children = 1;
	for(var i = 0;i < overline.children;i++)
		overline.defaultValue[i] = null;
	overline.major = 0;
	return overline;
})();

editorCanvas.simbol.prototype.options["underline"] = (function(){//下划线
	var underline = new editorCanvas.operation();
	
	underline.regroup = function(leave,size){
		editorCanvas.s.regroup(leave.child[0],size);
		leave.width = leave.child[0].width;
		leave.height = leave.child[0].height+size/4;
		leave.level = leave.child[0].level+1;
		leave.size = size;
		leave.value = "\\underline{"+leave.child[0].value+"}";
		leave.offset = size/4+leave.child[0].offset;
	};
	
	underline.draw = function(leave,dx,dy){
		editorCanvas.s.transaction(leave.child[0],dx,dy);
		
		editorCanvas.s.ctx.beginPath();
		editorCanvas.s.ctx.moveTo(dx,dy+leave.child[0].height);
		editorCanvas.s.ctx.lineTo(dx+leave.child[0].width,dy+leave.child[0].height);
		editorCanvas.s.ctx.stroke();
	};
	
	underline.children = 1;
	for(var i = 0;i < underline.children;i++)
		underline.defaultValue[i] = null;
	underline.major = 0;
	return underline;
})();

editorCanvas.simbol.prototype.options["overbrace"] = (function(){//上方花括号
	var overbrace = new editorCanvas.operation();
	
	overbrace.regroup = function(leave,size){
		editorCanvas.s.regroup(leave.child[0],size);
		editorCanvas.s.regroup(leave.child[1],size/2);
		leave.width = leave.child[0].width > leave.child[1].width ? leave.child[0].width : leave.child[1].width;
		leave.height = leave.child[0].height+leave.child[1].height+size/4;
		leave.level = leave.child[0].level > leave.child[1].level ? leave.child[0].level : leave.child[1].level+1;
		leave.size = size;
		leave.value = "\\overbrace{"+leave.child[0].value+"}^{"+leave.child[1].value+"}";
		leave.offset = leave.child[0].offset;
	};
	
	overbrace.draw = function(leave,dx,dy){
		editorCanvas.s.transaction(leave.child[0],dx+(leave.width-leave.child[0].width)/2,dy+leave.child[1].height+leave.size/4);
		editorCanvas.s.transaction(leave.child[1],dx+(leave.width-leave.child[1].width)/2,dy);
		
		var l = (leave.width-leave.child[0].width)/2;
		var l1 = leave.child[0].width/2+l;
		editorCanvas.s.ctx.beginPath();
		if(leave.child[0].width < leave.size*2)
		{
			editorCanvas.s.ctx.arc(dx +l+ leave.size * 0.55, dy+leave.child[1].height +leave.size*1.15, leave.size, 1.3 * Math.PI, 1.35*Math.PI, false);
			editorCanvas.s.ctx.lineTo(dx+l1-3,dy+leave.child[1].height+leave.size/4);
			editorCanvas.s.ctx.lineTo(dx+l1,dy+leave.child[1].height+leave.size/4-3);
			editorCanvas.s.ctx.lineTo(dx+l1+3,dy+leave.child[1].height+leave.size/4);
			editorCanvas.s.ctx.arc(dx +l+ leave.child[0].width - leave.size * 0.55, dy+leave.child[1].height +leave.size*1.15, leave.size, 1.65 * Math.PI, 1.7*Math.PI, false);
		}
		else
		{	
			editorCanvas.s.ctx.arc(dx +l+ leave.size * 0.55, dy+leave.child[1].height +leave.size*1.15, leave.size, 1.3 * Math.PI, 1.5*Math.PI, false);
			editorCanvas.s.ctx.lineTo(dx+l1-6,dy+leave.child[1].height+leave.size/4-leave.size*0.1);
			editorCanvas.s.ctx.lineTo(dx+l1,dy+leave.child[1].height+leave.size/4-5-leave.size*0.1);
			editorCanvas.s.ctx.lineTo(dx+l1+6,dy+leave.child[1].height+leave.size/4-leave.size*0.1);
			editorCanvas.s.ctx.arc(dx +l+ leave.child[0].width - leave.size * 0.55, dy +leave.child[1].height+leave.size*1.15, leave.size, 1.5 * Math.PI, 1.7*Math.PI, false);
		}
		editorCanvas.s.ctx.stroke();
	};
	overbrace.children = 2;
	for(var i = 0;i < overbrace.children;i++)
		overbrace.defaultValue[i] = null;
	overbrace.major = 0;
	return overbrace;
})();

editorCanvas.simbol.prototype.options["underbrace"] = (function(){//下方花括号
	var underbrace = new editorCanvas.operation();
	
	underbrace.regroup = function(leave,size){
		editorCanvas.s.regroup(leave.child[0],size);
		editorCanvas.s.regroup(leave.child[1],size/2);
		leave.width = leave.child[0].width > leave.child[1].width ? leave.child[0].width : leave.child[1].width;
		leave.height = leave.child[0].height+leave.child[1].height+size/4;
		leave.level = leave.child[0].level > leave.child[1].level ? leave.child[0].level : leave.child[1].level+1;
		leave.size = size;
		leave.value = "\\underbrace{"+leave.child[0].value+"}_{"+leave.child[1].value+"}";
		leave.offset = size/4+leave.child[0].offset;
	};
	
	underbrace.draw = function(leave,dx,dy){
		editorCanvas.s.transaction(leave.child[0],dx+(leave.width-leave.child[0].width)/2,dy);
		editorCanvas.s.transaction(leave.child[1],dx+(leave.width-leave.child[1].width)/2,dy+leave.child[0].height+leave.size/4);
		
		var l = (leave.width-leave.child[0].width)/2;
		var l1 = leave.child[0].width/2+l;
		editorCanvas.s.ctx.beginPath();
		if(leave.child[0].width < leave.size*2)
		{
			editorCanvas.s.ctx.arc(dx +l+ leave.size * 0.55, dy +leave.child[0].height-leave.size*0.9, leave.size, 0.7 * Math.PI, 0.65*Math.PI, true);
			editorCanvas.s.ctx.lineTo(dx+l1-3,dy+leave.child[0].height);
			editorCanvas.s.ctx.lineTo(dx+l1,dy+leave.child[0].height+3);
			editorCanvas.s.ctx.lineTo(dx+l1+3,dy+leave.child[0].height);
			editorCanvas.s.ctx.arc(dx+l + leave.child[0].width - leave.size * 0.55, dy +leave.child[0].height-leave.size*0.9, leave.size, 0.35 * Math.PI, 0.3*Math.PI, true);
		}
		else
		{
			editorCanvas.s.ctx.arc(dx+l + leave.size * 0.55, dy +leave.child[0].height-leave.size*0.9, leave.size, 0.7 * Math.PI, 0.5*Math.PI, true);
			editorCanvas.s.ctx.lineTo(dx+l1-6,dy+leave.child[0].height+leave.size*0.1);
			editorCanvas.s.ctx.lineTo(dx+l1,dy+leave.child[0].height+5+leave.size*0.1);
			editorCanvas.s.ctx.lineTo(dx+l1+6,dy+leave.child[0].height+leave.size*0.1);
			editorCanvas.s.ctx.arc(dx+l + leave.child[0].width - leave.size * 0.55, dy +leave.child[0].height-leave.size*0.9, leave.size, 0.5 * Math.PI, 0.3*Math.PI, true);
		}
		
		editorCanvas.s.ctx.stroke();
	};
	
	underbrace.children = 2;
	for(var i = 0;i < underbrace.children;i++)
		underbrace.defaultValue[i] = null;
	underbrace.major = 0;
	return underbrace;
})();

editorCanvas.simbol.prototype.options["widehat"] = (function(){//弧度
	var widehat = new editorCanvas.operation();
	
	widehat.regroup = function(leave,size){
		editorCanvas.s.regroup(leave.child[0],size);
		leave.width = leave.child[0].width;
		leave.height = leave.child[0].height+size/8;
		leave.level = leave.child[0].level+1;
		leave.size = size;
		leave.value = "\\widehat{"+leave.child[0].value+"}";
		leave.offset = leave.child[0].offset;
	};
	
	widehat.draw = function(leave,dx,dy){
		editorCanvas.s.transaction(leave.child[0],dx,dy+leave.size/8);
		
		editorCanvas.s.ctx.beginPath();
		editorCanvas.s.ctx.moveTo(dx,dy+leave.size/8);
		editorCanvas.s.ctx.lineTo(dx+leave.child[0].width/2,dy);
		editorCanvas.s.ctx.lineTo(dx+leave.child[0].width,dy+leave.size/8);
		editorCanvas.s.ctx.stroke();
	};
	
	widehat.children = 1;
	for(var i = 0;i < widehat.children;i++)
		widehat.defaultValue[i] = null;
	widehat.major = 0;
	return widehat;
})();

editorCanvas.simbol.prototype.options["overrightarrow"] = (function(){//上右箭头
	var overrightarrow = new editorCanvas.operation();
	
	overrightarrow.regroup = function(leave,size)
	{
		editorCanvas.s.regroup(leave.child[0],size);
		leave.width = leave.child[0].width;
		leave.height = leave.child[0].height+5;
		leave.level = leave.child[0].level+1;
		leave.size = size;
		leave.value = "\\overrightarrow{"+leave.child[0].value+"}";
		leave.offset = leave.child[0].offset;
	}
	
	overrightarrow.draw = function(leave,dx,dy)
	{
		editorCanvas.s.transaction(leave.child[0],dx,dy+5);
		
		editorCanvas.s.ctx.beginPath();
		editorCanvas.s.ctx.moveTo(dx,dy+5);
		editorCanvas.s.ctx.lineTo(dx+leave.child[0].width,dy+5);
		editorCanvas.s.ctx.lineTo(dx+leave.child[0].width-5,dy);
		
		editorCanvas.s.ctx.stroke();
	}
	
	overrightarrow.children = 1;
	for(var i = 0;i < overrightarrow.children;i++)
		overrightarrow.defaultValue[i] = null;
	overrightarrow.major = 0;
	return overrightarrow;
})();

editorCanvas.simbol.prototype.options["underrightarrow"] = (function(){//下右箭头
	var underrightarrow = new editorCanvas.operation();
	
	underrightarrow.regroup = function(leave,size)
	{
		editorCanvas.s.regroup(leave.child[0],size);
		leave.width = leave.child[0].width;
		leave.height = leave.child[0].height+size/2;
		leave.level = leave.child[0].level+1;
		leave.size = size;
		leave.value = "\\underrightarrow{"+leave.child[0].value+"}";
		leave.offset = leave.child[0].offset+leave.size/2;
	}
	
	underrightarrow.draw = function(leave,dx,dy)
	{
		editorCanvas.s.transaction(leave.child[0],dx,dy);
		
		editorCanvas.s.ctx.beginPath();
		editorCanvas.s.ctx.moveTo(dx,dy+leave.child[0].height+leave.size/6);
		editorCanvas.s.ctx.lineTo(dx+leave.child[0].width,dy+leave.child[0].height+leave.size/6);
		editorCanvas.s.ctx.lineTo(dx+leave.child[0].width-leave.size/3,dy+leave.child[0].height);
		editorCanvas.s.ctx.stroke();
		
		editorCanvas.s.ctx.beginPath();
		editorCanvas.s.ctx.moveTo(dx+leave.child[0].width,dy+leave.child[0].height+leave.size/6);
		editorCanvas.s.ctx.lineTo(dx+leave.child[0].width-leave.size/3,dy+leave.child[0].height+leave.size/3);
		editorCanvas.s.ctx.stroke();
	}
	
	underrightarrow.children = 1;
	for(var i = 0;i < underrightarrow.children;i++)
		underrightarrow.defaultValue[i] = null;
	underrightarrow.major = 0;
	return underrightarrow;
})();

editorCanvas.simbol.prototype.options["subsup"] = (function(){//下上标
	var subsup = new editorCanvas.operation();

	subsup.regroup = function (leave, size) {
		editorCanvas.s.regroup(leave.child[0],size);
		editorCanvas.s.regroup(leave.child[1],size*0.5);
		editorCanvas.s.regroup(leave.child[2],size*0.5);

		leave.width = leave.child[1].width > leave.child[2].width? leave.child[0].width + leave.child[1].width : leave.child[0].width + leave.child[2].width  ;
		leave.height = leave.child[0].height + leave.child[1].height + leave.child[2].height - size *0.75;
		
		leave.level = leave.child[0].level > leave.child[1].level ? leave.child[0].level : leave.child[1].level + 1;
		leave.level = leave.level > leave.child[2].level ? leave.level : leave.child[2].level +1;
		leave.size = size;
		leave.offset = leave.child[2].height-leave.size*0.375+leave.child[0].offset; 
		leave.value = "{"+leave.child[0].value+"}_{"+leave.child[2].value+"}^{"+leave.child[1].value+"}";

	};

	subsup.draw = function (leave, dx, dy) {
		editorCanvas.s.transaction(leave.child[0], dx, dy + leave.child[1].height - leave.size *0.375);
		editorCanvas.s.transaction(leave.child[1], dx + leave.child[0].width, dy);
		editorCanvas.s.transaction(leave.child[2], dx + leave.child[0].width, dy + leave.child[1].height +leave.child[0].height- leave.size *0.75);
	};

	subsup.children = 3;
	for(var i = 0;i < subsup.children;i++)
		subsup.defaultValue[i] = null;
	subsup.major = 0;
	return subsup;
})();

editorCanvas.simbol.prototype.options["updown"] = (function(){//上下
	var updown = new editorCanvas.operation();
	
	updown.regroup = function(leave,size){
		editorCanvas.s.regroup(leave.child[0],size);
		editorCanvas.s.regroup(leave.child[1],size*0.5);
		editorCanvas.s.regroup(leave.child[2],size*0.5);
		
		leave.width = Math.max(leave.child[0].width,leave.child[1].width,leave.child[2].width);
		leave.level = Math.max(leave.child[0].leave + 1,leave.child[1].level,leave.child[2].level) + 1;
		leave.height = leave.child[0].height+leave.child[1].height+leave.child[2].height;
		leave.offset = leave.child[2].height;
		leave.value = "\\mathop{"+leave.child[0].value+"}\\limits_{"+leave.child[2].value+"}^{"+leave.child[1].value+"}";
	};
	
	updown.draw = function(leave,dx,dy){
		editorCanvas.s.transaction(leave.child[0], dx+(leave.width-leave.child[0].width)/2, dy + leave.child[1].height);
		editorCanvas.s.transaction(leave.child[1], dx+(leave.width-leave.child[1].width)/2, dy);
		editorCanvas.s.transaction(leave.child[2], dx+(leave.width-leave.child[2].width)/2, dy + leave.child[0].height+leave.child[1].height);
	};
	
	updown.children = 3;
	for(var i = 0;i < updown.children;i++)
		updown.defaultValue[i] = null;
	updown.major = 0;
	return updown;
})();

editorCanvas.simbol.prototype.options["up"] = (function(){//上划
	var up = new editorCanvas.operation();
	
	up.regroup = function(leave,size){
		editorCanvas.s.regroup(leave.child[0],size);
		editorCanvas.s.regroup(leave.child[1],size*0.5);
		
		leave.width = leave.child[0].width > leave.child[1].width ? leave.child[0].width : leave.child[1].width;
		leave.height = leave.child[0].height+leave.child[1].height;
		
		leave.level = leave.child[0].level > leave.child[1].level ? leave.child[0].level : leave.child[1].level + 1;
		leave.size = size;
		leave.offset = 0;
		leave.value = "\\mathop{"+leave.child[0].value+"}\limits^{"+leave.child[1].value+"}";
	};
	
	up.draw = function(leave,dx,dy){
		editorCanvas.s.transaction(leave.child[0], dx+(leave.width-leave.child[0].width)/2, dy + leave.child[1].height);
		editorCanvas.s.transaction(leave.child[1], dx+(leave.width-leave.child[1].width)/2, dy);
	};
	
	up.children = 2;
	for(var i = 0;i < up.children;i++)
		up.defaultValue[i] = null;
	up.major = 0;
	return up;
})();

editorCanvas.simbol.prototype.options["down"] = (function(){//下划
	var down = new editorCanvas.operation();
	
	down.regroup = function(leave,size){
		editorCanvas.s.regroup(leave.child[0],size);
		editorCanvas.s.regroup(leave.child[1],size*0.5);
		
		leave.width = leave.child[0].width > leave.child[1].width ? leave.child[0].width : leave.child[1].width;
		leave.height = leave.child[0].height+leave.child[1].height;
		
		leave.level = leave.child[0].level > leave.child[1].level ? leave.child[0].level : leave.child[1].level + 1;
		leave.size = size;
		leave.offset = leave.child[1].height;
		leave.value = "\\mathop{"+leave.child[0].value+"}\limits_{"+leave.child[1].value+"}";
	};
	
	down.draw = function(leave,dx,dy){
		editorCanvas.s.transaction(leave.child[0], dx+(leave.width-leave.child[0].width)/2, dy);
		editorCanvas.s.transaction(leave.child[1], dx+(leave.width-leave.child[1].width)/2, dy+leave.child[0].height);
	};
	
	down.children = 2;
	for(var i = 0;i < down.children;i++)
		down.defaultValue[i] = null;
	down.major = 0;
	return down;
})();

editorCanvas.brackets = (function(){
	var brackets = {};
	brackets.regroup = function(leave,size,p1,p2){
		editorCanvas.s.regroup(leave.child[0],size);
		leave.height = leave.child[0].height;
		leave.width = leave.child[0].width;
		if(p1 != "")
		{leave.width += 10;}
		
		if(p2 != "")
		{leave.width += 10;}
		
		leave.level = leave.child[0].level+1;
		leave.size = size;
		
		leave.value = "";
		if(p1 == '{' || p1 == '}')
		{leave.value = "\\left\\"+p1;}
		else
		{leave.value = "\\left"+p1;}
		leave.value += "{"+leave.child[0].value+"}";
		if(p2 == '{' || p2 == '}')
		{leave.value += "\\right\\"+p2;}
		else
		{leave.value += "\\right"+p2;}
		leave.offset = leave.child[0].offset;
	};
	
	brackets.draw = function(leave,dx,dy,p1,p2){
		if(p1 != "")
		{
			editorCanvas.s.transaction(leave.child[0],dx+10,dy);
			this.drawer(leave.child[0],dx+2,dy,p1);
			this.drawer(leave.child[0],dx+10+leave.child[0].width,dy,p2);
		}
		else
		{
			editorCanvas.s.transaction(leave.child[0],dx,dy);
			this.drawer(leave.child[0],dx+leave.child[0].width,dy,p2);
		}
	};
	
	brackets.drawer = function(leave,dx,dy,p)
	{
		editorCanvas.s.ctx.beginPath();
		switch(p)
		{
			case "{":
			{
				//把半径固定为5
				editorCanvas.s.ctx.arc(dx+leave.size*0.15 + 5, dy +5 , 5,  1.5 * Math.PI, 1*Math.PI, true);
				editorCanvas.s.ctx.lineTo(dx+leave.size*0.15,dy+leave.height/2-4);
				editorCanvas.s.ctx.lineTo(dx+leave.size*0.15-3,dy+leave.height/2);
				editorCanvas.s.ctx.lineTo(dx+leave.size*0.15,dy+leave.height/2+4);
				editorCanvas.s.ctx.arc(dx+leave.size*0.15 +5, dy +leave.height -5, 5, 1*Math.PI, 0.5*Math.PI, true);
				break;
			}
			case "}":
			{
				//把半径固定为5
				editorCanvas.s.ctx.arc(dx+leave.size*0.1-5, dy + 5, 5 , 1.5 * Math.PI, 2 * Math.PI, false);
				editorCanvas.s.ctx.lineTo(dx+leave.size*0.1,dy+leave.height/2-6);
				editorCanvas.s.ctx.lineTo(dx+leave.size*0.1+5,dy+leave.height/2);
				editorCanvas.s.ctx.lineTo(dx+leave.size*0.1,dy+leave.height/2+6);
				editorCanvas.s.ctx.arc(dx+leave.size*0.1-5, dy +leave.height -5, 5, 0* Math.PI, 0.5*Math.PI, false);
				break;
			}
			case "[":
			{
				editorCanvas.s.ctx.moveTo(dx+leave.size/4,dy);
				editorCanvas.s.ctx.lineTo(dx,dy);
				editorCanvas.s.ctx.lineTo(dx,dy+leave.height);
				editorCanvas.s.ctx.lineTo(dx+leave.size/4,dy+leave.height);
				break;
			}
			case "]":
			{
				editorCanvas.s.ctx.moveTo(dx,dy);
				editorCanvas.s.ctx.lineTo(dx+leave.size/4,dy);
				editorCanvas.s.ctx.lineTo(dx+leave.size/4,dy+leave.height);
				editorCanvas.s.ctx.lineTo(dx,dy+leave.height);
				break;
			}
			case "(":
			{
				editorCanvas.s.ctx.moveTo(dx+leave.size/4,dy);
				editorCanvas.s.ctx.quadraticCurveTo(dx-leave.size/4,dy+leave.height/2,dx+leave.size/4,dy+leave.height);
				break;
			}
			case ")":
			{
				editorCanvas.s.ctx.moveTo(dx,dy);
				editorCanvas.s.ctx.quadraticCurveTo(dx+leave.size/2,dy+leave.height/2,dx,dy+leave.height);
				break;
			}
			case "|":
			{
				editorCanvas.s.ctx.moveTo(dx+leave.size/8,dy);
				editorCanvas.s.ctx.lineTo(dx+leave.size/8,dy+leave.height);
				break;
			}
			default:
				break;
		}
		editorCanvas.s.ctx.stroke();
	}
	return brackets;
})();

editorCanvas.simbol.prototype.options["bracket"] = (function(){
	var bracket = new editorCanvas.operation();
	bracket.regroup = function(leave,size){
		editorCanvas.brackets.regroup(leave,size,leave.arg[0],leave.arg[1]);
	};
	
	bracket.draw = function(leave,dx,dy){
		editorCanvas.brackets.draw(leave,dx,dy,leave.arg[0],leave.arg[1]);
	};
	bracket.children = 1;
	bracket.major = 0;
	return bracket;
})();

editorCanvas.simbol.prototype.options["smallBracket"] = (function(){//小括号
	var small = new editorCanvas.operation();
	small.regroup = function(leave,size){
		editorCanvas.brackets.regroup(leave,size,"(",")");
	};
	
	small.draw = function(leave,dx,dy){
		editorCanvas.brackets.draw(leave,dx,dy,"(",")");
	};
	small.children = 1;
	small.defaultValue[0] = null;
	small.major = 0;
	return small;
})();

editorCanvas.simbol.prototype.options["middleBracket"] = (function(){//中括号
	var middle = new editorCanvas.operation();
	middle.regroup = function(leave,size){
		editorCanvas.brackets.regroup(leave,size,"[","]");
	};
	
	middle.draw = function(leave,dx,dy){
		editorCanvas.brackets.draw(leave,dx,dy,"[","]");
	};
	middle.children = 1;
	middle.defaultValue[0] = null;
	middle.major = 0;
	return middle;
})();

editorCanvas.simbol.prototype.options["bigBracket"] = (function(){//大括号
	var big = new editorCanvas.operation();
	big.regroup = function(leave,size){
		editorCanvas.brackets.regroup(leave,size,"{","}");
	};
	
	big.draw = function(leave,dx,dy){
		editorCanvas.brackets.draw(leave,dx,dy,"{","}");
	};
	big.children = 1;
	big.defaultValue[0] = null;
	big.major = 0;
	return big;
})();

editorCanvas.simbol.prototype.options["lbBracket"] = (function(){//左括号
	var lb = new editorCanvas.operation();
	lb.regroup = function(leave,size){
		editorCanvas.brackets.regroup(leave,size,"{","");
	};
	
	lb.draw = function(leave,dx,dy){
		editorCanvas.brackets.draw(leave,dx,dy,"{","");
	};
	lb.children = 1;
	lb.defaultValue[0] = null;
	lb.major = 0;
	return lb;
})();

editorCanvas.simbol.prototype.options["abs"] = (function(){//绝对值
	var abs = new editorCanvas.operation();
	abs.regroup = function(leave,size){
		editorCanvas.brackets.regroup(leave,size,"|","|");
	};
	
	abs.draw = function(leave,dx,dy){
		editorCanvas.brackets.draw(leave,dx,dy,"|","|");
	};
	abs.children = 1;
	abs.defaultValue[0] = null;
	abs.major = 0;
	return abs;
})();
//方程组2个
editorCanvas.simbol.prototype.options["equation"] = (function () {//方程组
	var equation = new editorCanvas.operation();

	equation.regroup = function (leave, size) {
		editorCanvas.s.regroup(leave.child[0],size);
		editorCanvas.s.regroup(leave.child[1],size);
		leave.level = leave.child[0].level > leave.child[1].level ? leave.child[0].level : leave.child[1].level + 1;
		leave.width = leave.child[0].width > leave.child[1].width ? leave.child[0].width : leave.child[1].width;
		leave.height = leave.child[0].height + leave.child[1].height;
		leave.value = "\\begin{array}{l}{"+leave.child[0].value+"}\\\\{"+leave.child[1].value+"}\\end{array}";
		leave.size = size;
		leave.offset = (leave.height-size)/2; 
	};

	equation.draw = function (leave, dx, dy) {
		editorCanvas.s.transaction(leave.child[0], dx, dy);
		editorCanvas.s.transaction(leave.child[1], dx, dy + leave.child[0].height);
	};

	equation.children = 2;
	for(var i = 0;i < equation.children;i++)
		equation.defaultValue[i] = null;
	equation.major = 1;
	return equation;
})();
//方程组3个
editorCanvas.simbol.prototype.options["equation3"] = (function () {//方程组（3个）
	var equation3 = new editorCanvas.operation();

	equation3.regroup = function (leave, size) {
		editorCanvas.s.regroup(leave.child[0],size);
		editorCanvas.s.regroup(leave.child[1],size);
		editorCanvas.s.regroup(leave.child[2],size);
		leave.level = Math.max(leave.child[0].level,leave.child[1].level,leave.child[2].level) + 1;
		leave.width = Math.max(leave.child[0].width,leave.child[1].width,leave.child[2].width);
		leave.height = leave.child[0].height + leave.child[1].height + leave.child[2].height;
		leave.value = "\\begin{array}{l}{"+leave.child[0].value+"}\\\\{"+leave.child[1].value+"}\\\\{"+leave.child[2].value+"}\\end{array}";
		leave.size = size;
		leave.offset = (leave.height-size)/2; 
	};

	equation3.draw = function (leave, dx, dy) {
		editorCanvas.s.transaction(leave.child[0], dx, dy);
		editorCanvas.s.transaction(leave.child[1], dx, dy + leave.child[0].height);
		editorCanvas.s.transaction(leave.child[2], dx, dy + leave.child[0].height + leave.child[1].height);
	};

	equation3.children = 3;
	for(var i = 0;i < equation3.children;i++)
		equation3.defaultValue[i] = null;
	equation3.major = 1;
	return equation3;
})();

editorCanvas.simbol.prototype.options["em"] = (function(){//高亮
	var em = new editorCanvas.operation();
	
	em.regroup = function(leave,size){
		editorCanvas.s.regroup(leave.child[0],size);
		leave.level = leave.child[0].level;
		leave.width = leave.child[0].width;
		leave.height = leave.child[0].height;
		leave.value = "\\em{"+leave.child[0]+"}";
		leave.size = size;
		leave.offset = 0;
	};
	
	em.draw = function(leave,dx,dy){
		editorCanvas.s.ctx.fillStyle = "#FF0000";
		editorCanvas.s.transaction(leave.child[0],dx,dy);
		editorCanvas.s.ctx.fillStyle = editorCanvas.s.color;
	};
	
	em.children = 1;
	em.defaultValue[0] = null;
	em.major = 0;
	return em;
})();
//下标
editorCanvas.simbol.prototype.options["DownStandard"] = (function () {
	var DownStandard = new editorCanvas.operation();

	DownStandard.regroup = function (leave, size) {
		editorCanvas.s.regroup(leave.child[0],size);
		editorCanvas.s.regroup(leave.child[1],size*0.5);

		leave.width = leave.child[0].width + leave.child[1].width ;
		leave.height = leave.child[0].height + leave.child[1].height - size *0.375;
		leave.level = leave.child[0].level > leave.child[1].level ? leave.child[0].level : leave.child[1].level + 1;
		leave.size = size;
		leave.value = "{{" + leave.child[0].value + "}^{" + leave.child[1].value + "}}";
	};

	DownStandard.draw = function (leave, dx, dy) {
		editorCanvas.s.transaction(leave.child[0], dx, dy);
		editorCanvas.s.transaction(leave.child[1], dx + leave.child[0].width, dy +leave.child[0].height- leave.size *0.375);
	};

	DownStandard.children = 2;
	for(var i = 0;i < DownStandard.children;i++)
		DownStandard.defaultValue[i] = null;
	DownStandard.major = 0;
	return DownStandard;
})();

editorCanvas.trifunction = (function(){
	var trifunction = {};
	trifunction.regroup = function(leave,size,type){
		editorCanvas.s.regroup(leave.child[0],size);
		editorCanvas.s.regroup(leave.child[1],size*0.5);
		
		leave.width = leave.child[0].width+leave.child[1].width+editorCanvas.widthGetter(type);
		if(leave.child[1].value == "")
		{leave.height = leave.child[0].height;}
		else
		{leave.height = leave.child[1].height-0.5*size + leave.size > leave.child[0].height ? leave.child[1].height-0.5*size + leave.size :leave.child[0].height;}
		leave.level = (leave.child[0].level > leave.child[1].level ? leave.child[0].level : leave.child[1].level) + 1;
		leave.size = size;
		leave.value = "";
		leave.offset = leave.child[0].offset;
	};
	
	trifunction.draw = function(leave,dx,dy,type){
		var fw = editorCanvas.widthGetter(type);
		editorCanvas.s.size = leave.size + "px";
		editorCanvas.s.setFont();
		editorCanvas.s.ctx.fillText(type,dx,dy+leave.height-leave.offset);
		editorCanvas.s.transaction(leave.child[1],dx+fw,dy+leave.height-leave.size*0.5-leave.child[1].height-leave.offset);
		editorCanvas.s.transaction(leave.child[0],dx+fw+leave.child[1].width,dy+leave.height-leave.child[0].height);
	};
	return trifunction;
})();

editorCanvas.simbol.prototype.options["sin"] = (function(){//sin函数
	var sin = new editorCanvas.operation();
	sin.regroup = function(leave,size){
		editorCanvas.trifunction.regroup(leave,size,"sin");
	};
	
	sin.draw = function(leave,dx,dy){
		editorCanvas.trifunction.draw(leave,dx,dy,"sin");
	};
	
	sin.children = 2;
	sin.defaultValue[0] = null;
	sin.defaultValue[1] = null;
	sin.major = 0;
	return sin;
})();

editorCanvas.simbol.prototype.options["cos"] = (function(){//cos函数
	var cos = new editorCanvas.operation();
	cos.regroup = function(leave,size){
		editorCanvas.trifunction.regroup(leave,size,"cos");
	};
	
	cos.draw = function(leave,dx,dy){
		editorCanvas.trifunction.draw(leave,dx,dy,"cos");
	};
	
	cos.children = 2;
	cos.defaultValue[0] = null;
	cos.defaultValue[1] = null;
	cos.major = 0;
	return cos;
})();

editorCanvas.simbol.prototype.options["tan"] = (function(){//tan函数
	var tan = new editorCanvas.operation();
	tan.regroup = function(leave,size){
		editorCanvas.trifunction.regroup(leave,size,"tan");
	};
	
	tan.draw = function(leave,dx,dy){
		editorCanvas.trifunction.draw(leave,dx,dy,"tan");
	};
	
	tan.children = 2;
	tan.defaultValue[0] = null;
	tan.defaultValue[1] = null;
	tan.major = 0;
	return tan;
})();

editorCanvas.simbol.prototype.options["cot"] = (function(){//cot函数
	var cot = new editorCanvas.operation();
	cot.regroup = function(leave,size){
		editorCanvas.trifunction.regroup(leave,size,"cot");
	};
	
	cot.draw = function(leave,dx,dy){
		editorCanvas.trifunction.draw(leave,dx,dy,"cot");
	};
	
	cot.children = 2;
	cot.defaultValue[0] = null;
	cot.defaultValue[1] = null;
	cot.major = 0;
	return cot;
})();

editorCanvas.simbol.prototype.options["integral"] = (function () {//积分
	var integral = new editorCanvas.operation();

	integral.regroup = function (leave, size) {
		editorCanvas.s.regroup(leave.child[0],size*0.5);
		editorCanvas.s.regroup(leave.child[1],size*0.5);
		editorCanvas.s.regroup(leave.child[2],size);
		leave.height = leave.child[0].height + leave.child[1].height +leave.child[2].height;
		leave.width = size * 0.5;
		leave.width += leave.child[0].width > leave.child[1].width ? leave.child[0].width : leave.child[1].width;
		leave.width += leave.child[2].width;
		leave.width += leave.height * 0.5;
		leave.level = Math.max(leave.child[0].level,leave.child[1].level,leave.child[2].level) + 1;
		leave.size = size;
		leave.value = "∫^{" + leave.child[0].value + "}_{" + leave.child[1].value + "}" + leave.child[2].value;
		leave.offset = leave.child[0].height > leave.child[2].offset ? leave.child[0].height : leave.child[2].offset ;
	};

	integral.draw = function (leave, dx, dy) {
		editorCanvas.s.size = (leave.height - leave.child[1].height/2)+"px";
		editorCanvas.s.setFont();
		editorCanvas.s.ctx.fillText("∫",dx + leave.height * -0.2,dy+ leave.height - leave.child[1].height/2);

		var lx = Math.max(leave.child[0].width,leave.child[1].width);
		editorCanvas.s.transaction(leave.child[0], dx + leave.height * 0.5, dy);
		editorCanvas.s.transaction(leave.child[1], dx + leave.height * 0.5, dy + leave.child[0].height + leave.child[2].height);
		editorCanvas.s.transaction(leave.child[2], dx + lx + leave.height * 0.5, dy + leave.child[0].height);
	};


	integral.children = 3;
	for(var i = 0;i < integral.children;i++)
		integral.defaultValue[i] = null;
	integral.major = 2;
	return integral;
})();

editorCanvas.simbol.prototype.options["bigcup"] = (function(){
	var bigcup = new editorCanvas.operation();
	
	bigcup.regroup = function (leave, size) {
		if (leave == editorCanvas.root) {
			editorCanvas.s.regroup(leave.child[0],size*0.65);
			editorCanvas.s.regroup(leave.child[1],size*0.65);
		} else {
			editorCanvas.s.regroup(leave.child[0],size);
			editorCanvas.s.regroup(leave.child[1],size);
		}
		editorCanvas.s.regroup(leave.child[2],size);

		leave.width = leave.child[0].width > leave.child[1].width ? leave.child[0].width : leave.child[1].width;
		leave.width = leave.width > size ? leave.width : size;
		leave.width += leave.child[2].width;
		var lheight = leave.child[1].height + size / 2;
		var rheight = leave.child[0].height + size / 2;
		lheight = lheight > leave.child[2].height / 2 ? lheight : leave.child[2].height / 2;
		rheight = rheight > leave.child[2].height / 2 ? rheight : leave.child[2].height / 2;
		leave.height = lheight + rheight;
		leave.level = leave.child[0].level > leave.child[1].level ? leave.child[0].level : leave.child[1].level;
		leave.level = leave.level > leave.child[2].level ? leave.level : leave.child[2].level + 1;
		leave.size = size;

		leave.value = "{ \\bigcup\\limits_{" + leave.child[0].value + "}^{" + leave.child[1].value + "} {" + leave.child[2].value + "} " + "}";
		leave.offset = leave.child[0].height > leave.child[2].offset ? leave.child[0].height : leave.child[2].offset ;
	};

	bigcup.draw = function (leave, dx, dy) {
		var lx,
		ly;
		lx = dx + (leave.width - leave.child[2].width - leave.child[1].width) / 2;
		if (leave.child[1].height + leave.size / 2 > leave.child[2].height / 2) {
			ly = dy;
		} else {
			ly = dy + leave.child[2].height / 2 - (leave.child[1].height + leave.size / 2);
		}
		editorCanvas.s.transaction(leave.child[1], lx, ly);

		editorCanvas.s.size = leave.size*0.88+"px";
		editorCanvas.s.setFont();
		editorCanvas.s.ctx.fillText("∪",dx + (leave.width - leave.child[2].width - leave.size*0.8) / 2,
			ly + leave.child[1].height+leave.size*0.8);

		lx = dx + (leave.width - leave.child[2].width - leave.child[0].width) / 2;
		ly = ly + leave.child[1].height + leave.size;
		editorCanvas.s.transaction(leave.child[0], lx, ly);

		lx = dx + leave.width - leave.child[2].width;
		if (leave.child[2].height / 2 > leave.child[1].height + leave.size / 2) {
			ly = dy;
		} else {
			ly = dy + leave.child[1].height + leave.size / 2 - leave.child[2].height / 2;
		}
		editorCanvas.s.transaction(leave.child[2], lx, ly);
	};

	bigcup.children = 3;
	for(var i = 0;i < bigcup.children;i++)
		bigcup.defaultValue[i] = null;
	bigcup.major = 2;
	return bigcup;
})();

editorCanvas.simbol.prototype.options["underset"] = (function(){
	var underset = new editorCanvas.operation();
	
	underset.regroup = function(leave,size){
		editorCanvas.s.regroup(leave.child[1],size);
		editorCanvas.s.regroup(leave.child[0],size*0.5);
		leave.width = leave.child[0].width > leave.child[1].width ? leave.child[0].width : leave.child[1].width;
		leave.height = leave.child[0].height+leave.child[1].height;
		leave.level = (leave.child[0].level > leave.child[1].level ? leave.child[0].level : leave.child[1].level) + 1;
		leave.size = size;
		leave.value = "\\underset{"+leave.child[1].value+"}{"+leave.child[0].value+"}";
		leave.offset = leave.child[1].offset + leave.child[0].height;
	};
	
	underset.draw = function(leave,dx,dy){
		editorCanvas.s.transaction(leave.child[1],dx+(leave.width-leave.child[1].width)/2,dy);
		editorCanvas.s.transaction(leave.child[0],dx+(leave.width-leave.child[0].width)/2,dy+leave.child[1].height);
	};
	
	underset.children = 2;
	for(var i = 0;i < underset.children;i++)
		underset.defaultValue[i] = null;
	underset.major = 0;
	return underset;
})();

editorCanvas.simbol.prototype.options["equation2x"] = (function(){
	var equation2x = new editorCanvas.operation();
	
	equation2x.regroup = function(leave,size)
	{
		var temp = new editorCanvas.node("equation");
		temp.child[0] = leave.child[0];
		temp.child[1] = leave.child[1];
		leave.type = "lbBracket";
		leave.child[0] = temp;
		editorCanvas.s.regroup(leave,size);
	}

	equation2x.children = 2;
	for(var i = 0;i < equation2x.children;i++)
		equation2x.defaultValue[i] = null;
	equation2x.major = 0;
	return equation2x;
})();

editorCanvas.simbol.prototype.options["equation3x"] = (function(){
	var equation3x = new editorCanvas.operation();
	
	equation3x.regroup = function(leave,size)
	{
		var temp = new editorCanvas.node("equation3");
		temp.child[0] = leave.child[0];
		temp.child[1] = leave.child[1];
		temp.child[2] = leave.child[2];
		leave.type = "lbBracket";
		leave.child[0] = temp;
		editorCanvas.s.regroup(leave,size);
	}

	equation3x.children = 3;
	for(var i = 0;i < equation3x.children;i++)
		equation3x.defaultValue[i] = null;
	equation3x.major = 0;
	return equation3x;
})();

editorCanvas.mathSetup = function(parent)//用于在parent元素下面添加按钮
{
	
}

editorCanvas.simbol.prototype.options["log_subsup"] = (function(){//log
	var subsup = new editorCanvas.operation();

	subsup.regroup = function (leave, size) {
		editorCanvas.s.regroup(leave.child[0],size);
		editorCanvas.s.regroup(leave.child[1],size);
		editorCanvas.s.regroup(leave.child[2],size*0.5);

		leave.width = leave.child[0].width + leave.child[1].width + leave.child[2].width  ;
		leave.height = leave.child[0].height > leave.child[1].height ? leave.child[0].height + leave.child[2].height - size *0.5 : leave.child[1].height + leave.child[2].height - size *0.5;
		
		leave.level = leave.child[1].level + 1;
		leave.level = leave.level > leave.child[2].level ? leave.level : leave.child[2].level +1;
		leave.size = size;
		leave.offset = leave.child[2].height-leave.size*0.375+leave.child[1].offset; 
		leave.value = "{"+leave.child[0].value+"}_{"+leave.child[2].value+"}{"+leave.child[1].value+"}";
	};

	subsup.draw = function (leave, dx, dy) {
		var dh = leave.child[0].height > leave.child[1].height ? leave.child[0].height : leave.child[1].height;
		editorCanvas.s.transaction(leave.child[0], dx, dy + dh -  leave.size);
		editorCanvas.s.transaction(leave.child[1], dx + leave.child[0].width + leave.child[2].width, dy);
		editorCanvas.s.transaction(leave.child[2], dx + leave.child[0].width, dy + dh - leave.size *0.5);
	};

	subsup.children = 3;
	for(var i = 0;i < subsup.children;i++){
		subsup.defaultValue[i] = null;
	}
	subsup.defaultValue[0] = "log";
	subsup.major = 1;
	return subsup;
})();