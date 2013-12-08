//-----------------------------------------------------------------------------------
//*************此处开始化学条件
//-----------------------------------------------------------------------------------
editorCanvas.simbol.prototype.options["GWconditions"] = (function () {
	var conditions = new editorCanvas.operation();

	conditions.regroup = function (leave, size) {
		editorCanvas.chemistryRegroup(leave,size,1,1);
	};

	conditions.draw = function (leave, dx, dy) {
		editorCanvas.chemistryDraw(leave, dx, dy,1,1);
	};

	conditions.children = 2;
	conditions.major = 0;

	for(var i = 0;i < conditions.children;i++){
    	conditions.defaultValue[i] = null;
 	}
	conditions.defaultValue[0]="高温";

	return conditions;
})();

editorCanvas.simbol.prototype.options["JRconditions"] = (function () {
	var conditions = new editorCanvas.operation();

	conditions.regroup = function (leave, size) {
		editorCanvas.chemistryRegroup(leave,size,1,1);
	};
	
	conditions.draw = function (leave, dx, dy) {
		editorCanvas.chemistryDraw(leave, dx, dy,1,1);
	};

	conditions.children = 2;
	conditions.major = 0;

	for(var i = 0;i < conditions.children;i++){
    	conditions.defaultValue[i] = null;
 	}
	conditions.defaultValue[0]="加热";

	return conditions;
})();

editorCanvas.simbol.prototype.options["DRconditions"] = (function () {
	var conditions = new editorCanvas.operation();

	conditions.regroup = function (leave, size) {
		editorCanvas.chemistryRegroup(leave,size,1,1);
	};

	conditions.draw = function (leave, dx, dy) {
		editorCanvas.chemistryDraw(leave, dx, dy,1,1);
	};

	conditions.children = 2;
	conditions.major = 0;

	for(var i = 0;i < conditions.children;i++){
    	conditions.defaultValue[i] = null;
 	}
	conditions.defaultValue[0]="点燃";

	return conditions;
})();

editorCanvas.simbol.prototype.options["TDconditions"] = (function () {
	var conditions = new editorCanvas.operation();

	conditions.regroup = function (leave, size) {
		editorCanvas.chemistryRegroup(leave,size,1,1);
	};

	conditions.draw = function (leave, dx, dy) {
		editorCanvas.chemistryDraw(leave, dx, dy,1,1);
	};

	conditions.children = 2;
	conditions.major = 0;

	for(var i = 0;i < conditions.children;i++){
    	conditions.defaultValue[i] = null;
 	}
	conditions.defaultValue[0]="通电";

	return conditions;
})();

editorCanvas.simbol.prototype.options["DJconditions"] = (function () {
	var conditions = new editorCanvas.operation();

	conditions.regroup = function (leave, size) {
		editorCanvas.chemistryRegroup(leave,size,1,1);
	};

	conditions.draw = function (leave, dx, dy) {
		editorCanvas.chemistryDraw(leave, dx, dy,1,1);
	};

	conditions.children = 2;
	conditions.major = 0;

	for(var i = 0;i < conditions.children;i++){
    	conditions.defaultValue[i] = null;
 	}
	conditions.defaultValue[0]="电解";

	return conditions;
})();

editorCanvas.simbol.prototype.options["BZconditions"] = (function () {
	var conditions = new editorCanvas.operation();

	conditions.regroup = function (leave, size) {
		editorCanvas.chemistryRegroup(leave,size,1,1);
	};

	conditions.draw = function (leave, dx, dy) {
		editorCanvas.chemistryDraw(leave, dx, dy,1,1);
	};

	conditions.children = 2;
	conditions.major = 0;

	for(var i = 0;i < conditions.children;i++){
    	conditions.defaultValue[i] = null;
 	}
	conditions.defaultValue[0]="爆炸";

	return conditions;
})();

editorCanvas.simbol.prototype.options["FDconditions"] = (function () {
	var conditions = new editorCanvas.operation();

	conditions.regroup = function (leave, size) {
		editorCanvas.chemistryRegroup(leave,size,1,1);
	};

	conditions.draw = function (leave, dx, dy) {
		editorCanvas.chemistryDraw(leave, dx, dy,1,1);
	};

	conditions.children = 2;
	conditions.major = 0;

	for(var i = 0;i < conditions.children;i++){
    	conditions.defaultValue[i] = null;
 	}
	conditions.defaultValue[0]="放电";

	return conditions;
})();

editorCanvas.simbol.prototype.options["CHJconditions"] = (function () {
	var conditions = new editorCanvas.operation();

	conditions.regroup = function (leave, size) {
		editorCanvas.chemistryRegroup(leave,size,1,1);
	};

	conditions.draw = function (leave, dx, dy) {
		editorCanvas.chemistryDraw(leave, dx, dy,1,1);
	};

	conditions.children = 2;
	conditions.major = 0;

	for(var i = 0;i < conditions.children;i++){
    	conditions.defaultValue[i] = null;
 	}
	conditions.defaultValue[0]="催化剂";

	return conditions;
})();

editorCanvas.simbol.prototype.options["JHMconditions"] = (function () {
	var conditions = new editorCanvas.operation();

	conditions.regroup = function (leave, size) {
		editorCanvas.chemistryRegroup(leave,size,1,1);
	};

	conditions.draw = function (leave, dx, dy) {
		editorCanvas.chemistryDraw(leave, dx, dy,1,1);
	};

	conditions.children = 2;
	conditions.major = 0;

	for(var i = 0;i < conditions.children;i++){
    	conditions.defaultValue[i] = null;
 	}
	conditions.defaultValue[0]="酒化酶";

	return conditions;
})();

editorCanvas.simbol.prototype.options["SJconditions"] = (function () {
	var conditions = new editorCanvas.operation();

	conditions.regroup = function (leave, size) {
		editorCanvas.chemistryRegroup(leave,size,1,1);
	};

	conditions.draw = function (leave, dx, dy) {
		editorCanvas.chemistryDraw(leave, dx, dy,1,1);
	};

	conditions.children = 2;
	conditions.major = 0;

	for(var i = 0;i < conditions.children;i++){
    	conditions.defaultValue[i] = null;
 	}
	conditions.defaultValue[0]="△";

	return conditions;
})();

editorCanvas.simbol.prototype.options["MNO2conditions"] = (function () {
	var conditions = new editorCanvas.operation();

	conditions.regroup = function (leave, size) {
		editorCanvas.chemistryRegroup(leave,size,1,1);
	};

	conditions.draw = function (leave, dx, dy) {
		editorCanvas.chemistryDraw(leave, dx, dy,1,1);
	};

	conditions.children = 2;
	conditions.major = 0;

	for(var i = 0;i < conditions.children;i++){
    	conditions.defaultValue[i] = null;
 	}
	conditions.defaultValue[0]="MnO2";

	return conditions;
})();

editorCanvas.simbol.prototype.options["JR2conditions"] = (function () {
	var conditions = new editorCanvas.operation();

	conditions.regroup = function (leave, size) {
		editorCanvas.chemistryRegroup(leave,size,1,2);
	};

	conditions.draw = function (leave, dx, dy) {
		editorCanvas.chemistryDraw(leave, dx, dy,1,2);
	};

	conditions.children = 2;
	conditions.major = 0;

	for(var i = 0;i < conditions.children;i++){
    	conditions.defaultValue[i] = null;
 	}
	conditions.defaultValue[0]="加热";

	return conditions;
})();

editorCanvas.simbol.prototype.options["GW2conditions"] = (function () {
	var conditions = new editorCanvas.operation();

	conditions.regroup = function (leave, size) {
		editorCanvas.chemistryRegroup(leave,size,1,2);
	};

	conditions.draw = function (leave, dx, dy) {
		editorCanvas.chemistryDraw(leave, dx, dy,1,2);
	};

	conditions.children = 2;
	conditions.major = 0;

	for(var i = 0;i < conditions.children;i++){
    	conditions.defaultValue[i] = null;
 	}
	conditions.defaultValue[0]="高温";

	return conditions;
})();

editorCanvas.simbol.prototype.options["CHJ2conditions"] = (function () {
	var conditions = new editorCanvas.operation();

	conditions.regroup = function (leave, size) {
		editorCanvas.chemistryRegroup(leave,size,1,2);
	};

	conditions.draw = function (leave, dx, dy) {
		editorCanvas.chemistryDraw(leave, dx, dy,1,2);
	};

	conditions.children = 2;
	conditions.major = 0;

	for(var i = 0;i < conditions.children;i++){
    	conditions.defaultValue[i] = null;
 	}
	conditions.defaultValue[0]="催化剂";

	return conditions;
})();

editorCanvas.simbol.prototype.options["TD2conditions"] = (function () {
	var conditions = new editorCanvas.operation();

	conditions.regroup = function (leave, size) {
		editorCanvas.chemistryRegroup(leave,size,1,2);
	};

	conditions.draw = function (leave, dx, dy) {
		editorCanvas.chemistryDraw(leave, dx, dy,1,2);
	};

	conditions.children = 2;
	conditions.major = 0;

	for(var i = 0;i < conditions.children;i++){
    	conditions.defaultValue[i] = null;
 	}
	conditions.defaultValue[0]="通电";

	return conditions;
})();

editorCanvas.simbol.prototype.options["MNO22conditions"] = (function () {
	var conditions = new editorCanvas.operation();

	conditions.regroup = function (leave, size) {
		editorCanvas.chemistryRegroup(leave,size,1,2);
	};

	conditions.draw = function (leave, dx, dy) {
		editorCanvas.chemistryDraw(leave, dx, dy,1,2);
	};

	conditions.children = 2;
	conditions.major = 0;

	for(var i = 0;i < conditions.children;i++){
    	conditions.defaultValue[i] = null;
 	}
	conditions.defaultValue[0]="MnO2";

	return conditions;
})();

editorCanvas.simbol.prototype.options["JHM2conditions"] = (function () {
	var conditions = new editorCanvas.operation();

	conditions.regroup = function (leave, size) {
		editorCanvas.chemistryRegroup(leave,size,1,2);
	};

	conditions.draw = function (leave, dx, dy) {
		editorCanvas.chemistryDraw(leave, dx, dy,1,2);
	};

	conditions.children = 2;
	conditions.major = 0;

	for(var i = 0;i < conditions.children;i++){
    	conditions.defaultValue[i] = null;
 	}
	conditions.defaultValue[0]="酒化酶";

	return conditions;
})();

editorCanvas.simbol.prototype.options["M2conditions"] = (function () {
	var conditions = new editorCanvas.operation();

	conditions.regroup = function (leave, size) {
		editorCanvas.chemistryRegroup(leave,size,1,2);
	};

	conditions.draw = function (leave, dx, dy) {
		editorCanvas.chemistryDraw(leave, dx, dy,1,2);
	};

	conditions.children = 2;
	conditions.major = 0;

	for(var i = 0;i < conditions.children;i++){
    	conditions.defaultValue[i] = null;
 	}
	conditions.defaultValue[0]="酶";

	return conditions;
})();

editorCanvas.simbol.prototype.options["TYN1CHJconditions"] = (function () {
	var conditions = new editorCanvas.operation();

	conditions.regroup = function (leave, size) {
		editorCanvas.chemistryRegroup(leave,size,2,1);
	};

	conditions.draw = function (leave, dx, dy) {
		editorCanvas.chemistryDraw(leave, dx, dy,2,1);
	};

	conditions.children = 2;
	conditions.major = 0;

	for(var i = 0;i < conditions.children;i++){
    	conditions.defaultValue[i] = null;
 	}
	conditions.defaultValue[0]="太阳能";
	conditions.defaultValue[1]="催化剂";

	return conditions;
})();

editorCanvas.simbol.prototype.options["CHJ1GWGYconditions"] = (function () {
	var conditions = new editorCanvas.operation();

	conditions.regroup = function (leave, size) {
		editorCanvas.chemistryRegroup(leave,size,2,1);
	};

	conditions.draw = function (leave, dx, dy) {
		editorCanvas.chemistryDraw(leave, dx, dy,2,1);
	};

	conditions.children = 2;
	conditions.major = 0;

	for(var i = 0;i < conditions.children;i++){
    	conditions.defaultValue[i] = null;
 	}
	conditions.defaultValue[0]="催化剂";
	conditions.defaultValue[1]="高温高压";

	return conditions;
})();

editorCanvas.simbol.prototype.options["DFM2conditions"] = (function () {
	var conditions = new editorCanvas.operation();

	conditions.regroup = function (leave, size) {
		editorCanvas.chemistryRegroup(leave,size,1,2);
	};

	conditions.draw = function (leave, dx, dy) {
		editorCanvas.chemistryDraw(leave, dx, dy,1,2);
	};

	conditions.children = 2;
	conditions.major = 0;

	for(var i = 0;i < conditions.children;i++){
    	conditions.defaultValue[i] = null;
 	}
	conditions.defaultValue[0]="淀粉酶";

	return conditions;
})();

editorCanvas.simbol.prototype.options["MNO21SJconditions"] = (function () {
	var conditions = new editorCanvas.operation();

	conditions.regroup = function (leave, size) {
		editorCanvas.chemistryRegroup(leave,size,2,1);
	};

	conditions.draw = function (leave, dx, dy) {
		editorCanvas.chemistryDraw(leave, dx, dy,2,1);
	};

	conditions.children = 2;
	conditions.major = 0;

	for(var i = 0;i < conditions.children;i++){
    	conditions.defaultValue[i] = null;
 	}
	conditions.defaultValue[0]="MnO2";
	conditions.defaultValue[1]="△";

	return conditions;
})();

editorCanvas.simbol.prototype.options["CHJ2SJconditions"] = (function () {
	var conditions = new editorCanvas.operation();

	conditions.regroup = function (leave, size) {
		editorCanvas.chemistryRegroup(leave,size,2,2);
	};

	conditions.draw = function (leave, dx, dy) {
		editorCanvas.chemistryDraw(leave, dx, dy,2,2);
	};

	conditions.children = 2;
	conditions.major = 0;

	for(var i = 0;i < conditions.children;i++){
    	conditions.defaultValue[i] = null;
 	}
	conditions.defaultValue[0]="催化剂";
	conditions.defaultValue[1]="△";

	return conditions;
})();

editorCanvas.simbol.prototype.options["twolinefrac"] = (function(){
	var tlf = new editorCanvas.operation();
	
	tlf.regroup = function(leave,size){
		editorCanvas.chemistryRegroup(leave,size,2,1);
	};
	
	tlf.draw = function(leave,dx,dy){
		editorCanvas.chemistryDraw(leave,dx,dy,2,1);
	};
	
	tlf.children = 2;
	tlf.major = 1;
	
	for(var i = 0;i < tlf.children;i++){
    	tlf.defaultValue[i] = null;
 	}
	
	return tlf;
})();

editorCanvas.simbol.prototype.options["rowfrac"] = (function(){
	var tlf = new editorCanvas.operation();
	
	tlf.regroup = function(leave,size){
		editorCanvas.chemistryRegroup(leave,size,2,2);
	};
	
	tlf.draw = function(leave,dx,dy){
		editorCanvas.chemistryDraw(leave,dx,dy,2,2);
	};
	
	tlf.children = 2;
	tlf.major = 1;
	
	for(var i = 0;i < tlf.children;i++){
    	tlf.defaultValue[i] = null;
 	}
	
	return tlf;
})();

//双向
editorCanvas.simbol.prototype.options["twoarrowfrac"] = (function () {
	var rightleftharpoons = new editorCanvas.operation();

	rightleftharpoons.regroup = function (leave, size) {
		editorCanvas.chemistryRegroup(leave,size,2,3);
	};

	rightleftharpoons.draw = function (leave, dx, dy) {
		editorCanvas.chemistryDraw(leave,dx,dy,2,3);
	};

	rightleftharpoons.children = 2;
	rightleftharpoons.major = 0;
	for(var i = 0;i < rightleftharpoons.children;i++){
    	rightleftharpoons.defaultValue[i] = null;
 	}

	return rightleftharpoons;
})();
//-----------------------------------------------------------------------------------
//*************此处结束化学条件
//-----------------------------------------------------------------------------------







//化学条件式的Regroup
editorCanvas.chemistryRegroup = function(leave,size,conditionsNum,sign){
	editorCanvas.s.regroup(leave.child[0],size*0.5);
	editorCanvas.s.regroup(leave.child[1],size*0.5);

	if(conditionsNum==1){
		leave.level =leave.child[0].level + 1;
		leave.width = leave.child[0].width;
		leave.width += leave.level * size / 4; //根据该元素所在层级画出相应长度的分数线，以此来区分分母和分子
	}else if(conditionsNum==2){
		leave.level = leave.child[0].level > leave.child[1].level ? leave.child[0].level : leave.child[1].level + 1;
		leave.width = leave.child[0].width > leave.child[1].width ? leave.child[0].width : leave.child[1].width;
		leave.width += leave.level * size / 4; //根据该元素所在层级画出相应长度的分数线，以此来区分分母和分子
		}
		
	leave.height = leave.child[0].height + leave.child[1].height+leave.size*1.2;

	if(sign == 1){
		leave.value = "{\\twolinefrac{" + leave.child[0].value + "}{" + leave.child[1].value + "}}";
	}else if(sign ==2){
		leave.value = "{\\rowfrac{" + leave.child[0].value + "}{" + leave.child[1].value + "}}";
	}else if(sign == 3){
		leave.value = "{\\twoarrowfrac{" + leave.child[0].value + "}{" + leave.child[1].value + "}}";
	}
	leave.size = size;
	leave.offset =leave.child[1].height;
}
//化学条件式的draw
editorCanvas.chemistryDraw = function(leave, dx, dy,conditionsNum,sign){
	if(conditionsNum==1){
		editorCanvas.s.transaction(leave.child[0], dx + (leave.width - leave.child[0].width) / 2, dy + leave.size*0.4);
	}else if(conditionsNum==2){
		editorCanvas.s.transaction(leave.child[0], dx + (leave.width - leave.child[0].width) / 2, dy + leave.size*0.4);
		editorCanvas.s.transaction(leave.child[1], dx + (leave.width - leave.child[1].width) / 2, dy + leave.size*0.4 + leave.child[0].height+10);
	}
	if(sign==1){
		editorCanvas.s.ctx.beginPath();
		editorCanvas.s.ctx.moveTo(dx, dy + leave.child[0].height+3 + leave.size*0.4);
		editorCanvas.s.ctx.lineTo(dx + leave.width, dy + leave.child[0].height+3 + leave.size*0.4);
		editorCanvas.s.ctx.moveTo(dx, dy + leave.child[0].height + 8 + leave.size*0.4);
		editorCanvas.s.ctx.lineTo(dx + leave.width, dy + leave.child[0].height + 8 + leave.size*0.4);
		editorCanvas.s.ctx.stroke();
	}else if(sign==2){
		editorCanvas.s.ctx.beginPath();
		editorCanvas.s.ctx.moveTo(dx, dy + leave.child[0].height+6 + leave.size*0.4);
		editorCanvas.s.ctx.lineTo(dx + leave.width, dy + leave.child[0].height+6 + leave.size*0.4);
		editorCanvas.s.ctx.moveTo(dx + leave.width-4, dy + leave.child[0].height +6- 4 + leave.size*0.4);
		editorCanvas.s.ctx.lineTo(dx + leave.width, dy + leave.child[0].height +6 + leave.size*0.4);
		editorCanvas.s.ctx.lineTo(dx + leave.width-4, dy + leave.child[0].height +6 + 4 + leave.size*0.4);
		editorCanvas.s.ctx.stroke();
	}else if(sign == 3){
		editorCanvas.s.ctx.beginPath();
		editorCanvas.s.ctx.moveTo(dx+leave.width,dy+leave.child[0].height +3 + leave.size*0.4);
		editorCanvas.s.ctx.lineTo(dx,dy+leave.child[0].height +3 + leave.size*0.4);
		editorCanvas.s.ctx.lineTo(dx+leave.size/6,dy+leave.child[0].height-leave.size/6 +3 + leave.size*0.4);
		editorCanvas.s.ctx.moveTo(dx,dy+leave.child[0].height+leave.size/6 +3 + leave.size*0.4);
		editorCanvas.s.ctx.lineTo(dx+leave.width,dy+leave.child[0].height+leave.size/6 +3 + leave.size*0.4);
		editorCanvas.s.ctx.lineTo(dx+leave.width-leave.size/6,dy+leave.child[0].height+leave.size/3 +3 + leave.size*0.4);
		editorCanvas.s.ctx.stroke();
	}
}





// 等价
editorCanvas.simbol.prototype.options["arrowfrac"] = (function () {
	var leftrightarrow = new editorCanvas.operation();

	leftrightarrow.regroup = function (leave, size) {
		editorCanvas.chemistryRegroup(leave,size,2,2);
	};

	leftrightarrow.draw = function (leave, dx, dy) {
		editorCanvas.s.transaction(leave.child[0],dx+(leave.width-leave.child[0].width)/2,dy);
		editorCanvas.s.transaction(leave.child[1],dx+(leave.width-leave.child[1].width)/2,dy+leave.child[0].height+leave.size/8);
		editorCanvas.s.ctx.beginPath();
		editorCanvas.s.ctx.moveTo(dx-leave.size/8+leave.width,dy+leave.child[0].height);
		editorCanvas.s.ctx.lineTo(dx+leave.size/8,dy+leave.child[0].height);
		
		editorCanvas.s.ctx.moveTo(dx+leave.size/8,dy+leave.child[0].height+leave.size/8);
		editorCanvas.s.ctx.lineTo(dx-leave.size/8+leave.width,dy+leave.child[0].height+leave.size/8);
		
		editorCanvas.s.ctx.moveTo(dx+leave.size/4,dy+leave.child[0].height-leave.size/8);
		editorCanvas.s.ctx.lineTo(dx,dy+leave.child[0].height+leave.size/16);
		editorCanvas.s.ctx.lineTo(dx+leave.size/4,dy+leave.child[0].height+leave.size/4);
		
		editorCanvas.s.ctx.moveTo(dx+leave.width-leave.size/4,dy+leave.child[0].height-leave.size/8);
		editorCanvas.s.ctx.lineTo(dx+leave.width,dy+leave.child[0].height+leave.size/16);
		editorCanvas.s.ctx.lineTo(dx+leave.width-leave.size/4,dy+leave.child[0].height+leave.size/4);
		
		editorCanvas.s.ctx.stroke();
	};

	leftrightarrow.children = 2;
	leftrightarrow.major = 1;
	
	for(var i = 0;i < leftrightarrow.children;i++){
    	leftrightarrow.defaultValue[i] = null;
 	}

	return leftrightarrow;
})();