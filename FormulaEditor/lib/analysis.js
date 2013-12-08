editorCanvas.Analysis = function(_this){
		var self = this;
		self.root = _this.node("undefine");
		self.latex;
		self.count = 0;

		self.distribute = function(text){
			self.latex = text;
			self.checkout();
			self.root = self.analyse(self.latex);
			_this.root = self.root;
			if(!_this.root || _this.root == null){
				_this.root = new editorCanvas.node("shuzi");
				_this.root.value = "";
			}
			//设置size
			_this.s.regroup(_this.root,_this.s.csize||14);
			//绘制公式
			_this.replay();
			// _this.currenttarget = _this.root;
		};

	};
editorCanvas.Analysis.prototype.unary = function(target,type){
	var leave = new editorCanvas.node(type);
	var start = 0;
	
	start = editorCanvas.a.getter(target,'{','}');
	leave.child[0] = editorCanvas.a.analyse(target.substring(1,start));
	
	if(start < target.length-1)
	{
		if(target.charAt(start+1) == '^')
		{return editorCanvas.a.exponent(target.substring(start+2),leave);}
		if(target.charAt(start+1) == '_')
		{return editorCanvas.a.subscript(target.substring(start+2),leave);}
		
		var branch = new editorCanvas.node("right");
		branch.child[0] = leave;
		branch.child[1] = editorCanvas.a.analyse(target.substring(start+1));
		return branch;
	}
	else
	{return leave;}
};
editorCanvas.Analysis.prototype.binary = function(target,type){
	var leave = new editorCanvas.node(type);
	var step = 0;
	var middle = 0;
	
	step = editorCanvas.a.getter(target,'{','}');
	leave.child[0] = editorCanvas.a.analyse(target.substring(1,step));
	
	if(target.charAt(step+1) == '_' || target.charAt(step+1) == '^')
	{step++;}
	middle = step;
	step = editorCanvas.a.getter(target.substring(step+1),'{','}')+middle+1;
	leave.child[1] = editorCanvas.a.analyse(target.substring(middle+2,step));
	if(step < target.length-1)
	{
		if(target.charAt(step+1) == '^')
		{return editorCanvas.a.exponent(target.substring(step+2),leave);}
		if(target.charAt(step+1) == '_')
		{return editorCanvas.a.subscript(target.substring(step+2),leave);}
		
		var branch = new editorCanvas.node("right");
		branch.child[0] = leave;
		branch.child[1] = editorCanvas.a.analyse(target.substring(step+1,target.length));
		return branch;
	}
	else
	{return leave;}
};

//p1= {; p2=}
editorCanvas.Analysis.prototype.getter = function(target,p1,p2){
	var count = 0;
	for(var i = 0;i < target.length;i++){
		if(target.charAt(i) == p1){
			if(i >0 && target.charAt(i-1)=="\\"){
				if(i >1 && target.charAt(i-2)=="\\"){
					count++;
				}
			}else{
				count++;
			}
		}
		if(target.charAt(i) == p2){
			if(i >0 && target.charAt(i-1)=="\\"){
				if(i >1 && target.charAt(i-2)=="\\"){
					count--;
				}
			}else{
				count--;
			}	
			if(count == 0){
				return i;
			}
		}
	}
	return -1;
};
editorCanvas.Analysis.prototype.getter2 = function(target,p1,p2){
	var count = 0;
	for(var i = 0;i < target.length;i++)
	{
		if(target.charAt(i) == '\\')
		{
			if(target.substr(i+1,p1.length) == p1)
			{
				count++;
			}
			
			if(target.substr(i+1,p2.length) == p2)
			{
				count--;
				if(count == 0)
				{
					return i;
				}
			}
		}
	}
	return -1;
}
editorCanvas.Analysis.prototype.checkout = function(){
	this.latex = this.latex.replace(/(\\[a-z]*)\s([a-z])/g,"$1{$2}")
				 .replace(/\s|\n/g,"")
				 .replace(/({)<em>(.*?)<\/em>(.)/gi,function(a,b,c,d){
					if(d=="}"){
						return b+"\\"+"em{"+c+"}"+d					
					}else{
						return a;
					}
				}).replace(/^<em>(.*?)<\/em>$/gi,"\\em{$1}")
				  .replace(/<em>|<\/em>/gi,"")
				  .replace(/&nbsp;/g,"")
				  .replace(/&amp;/g,"&")
				  .replace(/&gt;/g,">")
				  .replace(/&lt;/g,"<")
				  .replace(/(\\begin{)\\em{(.*?)}(.*?)/gi,"$1$2$3")
				  .replace(/(\\begin{.*?}{)\\em{(.*?)}(.*?)/gi,"$1$2$3")
				  .replace(/\\\[|\\\]/g,"")
				  .replace(/\\text/g,"");
};
editorCanvas.Analysis.prototype.analyse = function(target){
	//递归 如果大于100则不再分析
	if(this.count > 100){
		return new editorCanvas.node("undefine");
	}
	this.count++;
	if(target.charAt(0) != '\\'){
		var start = 0;
		if(target.charAt(0) == '{'){
			start = this.getter(target,'{','}');
			if(start+1 == target.length){
				return this.analyse(target.substring(1,start));
			}
			
			if(start == -1){
				return this.options['shuzi'](target);
			}
			
			switch(target.charAt(start+1)){
				case '^':
					return this.options['exponent'](target);
				case '_':
					return this.options['subscript'](target);
				default:
					return this.options['shuzi'](target.substring(1,start)+target.substring(start+1));
			}
		}else{
			return this.options["shuzi"](target);
		}
	}else{
		var lregexp = /[a-zA-Z]/;
		if(lregexp.test(target.substr(1,1))){
			for(var i = 1;i < target.length;i++){
				if(!lregexp.test(target.substr(i,1))){
					if(!this.options[target.substring(1,i)] || this.options[target.substring(1,i)] == null){	
						var t = new editorCanvas.node("right");
						t.child[0] = new editorCanvas.node("shuzi");
						t.child[0].value = target.substring(1,i);
						t.child[1] = this.analyse(target.substring(i+1));
						return t;
					}
					return this.options[target.substring(1,i)](target.substring(i,target.length),target.substring(1,i));
				}
			}
			if(!this.options[target.substring(1)] || this.options[target.substring(1)] == null){	
				return this.analyse(target.substring(1));
			}
			return this.options[target.substring(1)]("",target.substring(1));
		}else{
			switch(target.charAt(1)){
				case '{':
					return this.options["shuzi"](target);
				case '}':
					return this.options["shuzi"](target);
				case ',':
				case '_':
					return this.options["translate"](target);
				case '^':
					return this.options["translate"](target);
				default:
					break;
			}
		}
	}
	return this.analyse(target.substring(1));
};

editorCanvas.Analysis.prototype.options = [];
editorCanvas.Analysis.prototype.options["translate"] = function(target){
	var leave = new editorCanvas.node("right");
	leave.child[0] = new editorCanvas.node("shuzi");
	leave.child[0].value = target.substring(1,2);
	leave.child[1] = editorCanvas.a.analyse(target.substring(2));
	return leave;
};
editorCanvas.Analysis.prototype.options["next"] = function(target){
	var leave = new editorCanvas.node("right");
	for(var i = 0;i < target.length;i++)
	{
		switch(target.charAt(i))
		{
			case '\\':
				leave.child[0] = editorCanvas.a.options["shuzi"](target.substring(0,i));
				leave.child[1] = editorCanvas.a.analyse(target.substring(i));
				if(leave.child[1].type == "shuzi")
				{
					leave.child[0].value += leave.child[1].value;
					return leave.child[0];
				}
				return leave;
				
			case '{':
				if(editorCanvas.a.getter(target,'{','}') != -1)
				{
					leave.child[0] = editorCanvas.a.options["shuzi"](target.substring(0,i));
					leave.child[1] = editorCanvas.a.analyse(target.substring(i));
					return leave;
				}	
			default:
				break;
		}
	}
	return null;
};
editorCanvas.Analysis.prototype.options["shuzi"] = function(target){
	for(var i = 0;i < target.length;i++)
	{
		switch(target.charAt(i))
		{
			case '\\':
				return editorCanvas.a.options["next"](target);
				break;
			case '^':
				return editorCanvas.a.options["exponent"](target);
				break;
			case '_':
				return editorCanvas.a.options["subscript"](target);
				break;
			case '{':
				if(editorCanvas.a.getter(target,'{','}') != -1)
				{return editorCanvas.a.options["next"](target);}
				break;
			default:
				break;
		}
	}
	var leave = new editorCanvas.node("shuzi");
	leave.value = target;
	return leave;
};
editorCanvas.Analysis.prototype.options["sqrt"] = function(target){
	var leave = new editorCanvas.node("radicent");
	var step = 0;
	var middle = 0;
	
	if(target.charAt(0) != '[')
	{
		step = -1;
		leave.child[0] = editorCanvas.a.analyse("");
	}
	else{
		step = editorCanvas.a.getter(target,'[',']');
		leave.child[0] = editorCanvas.a.analyse(target.substring(1,step));
	}

	middle = step;
	step = editorCanvas.a.getter(target.substring(step+1),'{','}')+middle+1;
	leave.child[1] = editorCanvas.a.analyse(target.substring(middle+2,step));
	if(step < target.length-1)
	{
		if(target.charAt(step+1) == '^')
		{return editorCanvas.a.exponent(target.substring(step+2),leave);}
		if(target.charAt(step+1) == '_')
		{return editorCanvas.a.subscript(target.substring(step+2),leave);}
		
		var branch = new editorCanvas.node("right");
		branch.child[0] = leave;
		branch.child[1] = editorCanvas.a.analyse(target.substring(step+1,target.length));
		return branch;
	}
	else
	{return leave;}
};

editorCanvas.Analysis.prototype.exponent = function(target,child){
	var leave = new editorCanvas.node("exponent");
	var branch = null;
	leave.child[0] = child;
	var start = 0;
	var middle = 0;
	if(target.charAt(0) != '{' || editorCanvas.a.getter(target.substring(0),'{','}') == -1)
	{
		start = 1;
		leave.child[1] = editorCanvas.a.analyse(target.charAt(0));
	}
	else
	{
		start = editorCanvas.a.getter(target,'{','}');
		leave.child[1] = editorCanvas.a.analyse(target.substring(1,start));
	};
	
	if(target.charAt(start+1) == '_')
	{
		middle = start+2;
		branch = new editorCanvas.node("supsub");
		branch.child[0] = leave.child[0];
		branch.child[1] = leave.child[1];
		if(target.charAt(middle) != '{' || editorCanvas.a.getter(target.substring(start),'{','}') == -1)
		{
			start = middle;
			branch.child[2] = editorCanvas.a.analyse(target.charAt(middle));
		}
		else
		{
			start = editorCanvas.a.getter(target.substring(middle),'{','}');
			branch.child[2] = editorCanvas.a.analyse(target.substring(middle));
		}
	};
	
	if(start < target.length-1)
	{
		var right = new editorCanvas.node("right");
		if(branch == null)
		{
			right.child[0] = leave;
			right.child[1] = editorCanvas.a.analyse(target.substring(start+1));
		}
		else
		{
			right.child[0] = branch;
			right.child[1] = editorCanvas.a.analyse(target.substring(start+1));
		}
		return right;
	}
	else
	{
		if(branch == null)
		{return leave;}
		else
		{return branch;}
	};
};

editorCanvas.Analysis.prototype.subscript = function(target,child)
{
	var leave = new editorCanvas.node("subscript");
	var branch = null;
	leave.child[0] = child;
	var start = 0;
	var middle = 0;
	if(target.charAt(0) != '{' || editorCanvas.a.getter(target.substring(0),'{','}') == -1)
	{
		start = 1;
		leave.child[1] = editorCanvas.a.analyse(target.charAt(0));
	}
	else
	{
		start = editorCanvas.a.getter(target,'{','}');
		leave.child[1] = editorCanvas.a.analyse(target.substring(1,start));
	}
	
	if(target.charAt(start+1) == '^')
	{
		middle = start+2;
		branch = new editorCanvas.node("supsub");
		branch.child[0] = leave.child[0];
		branch.child[2] = leave.child[1];
		if(target.charAt(middle) != '{' || editorCanvas.a.getter(target.substring(start),'{','}') == -1)
		{
			start = middle;
			branch.child[1] = editorCanvas.a.analyse(target.charAt(middle));
		}
		else
		{
			start = editorCanvas.a.getter(target.substring(middle),'{','}');
			branch.child[1] = editorCanvas.a.analyse(target.substring(middle));
		}
	}
	
	if(start < target.length-1)
	{
		var right = new editorCanvas.node("right");
		if(branch == null)
		{
			right.child[0] = leave;
			right.child[1] = editorCanvas.a.analyse(target.substring(start+1));
		}
		else
		{
			right.child[0] = branch;
			right.child[1] = editorCanvas.a.analyse(target.substring(start+1));
		}
		return right;
	}
	else
	{
		if(branch == null)
		{return leave;}
		else
		{return branch;}
	}
}

editorCanvas.Analysis.prototype.options["exponent"] = function(target){
	var leave = new editorCanvas.node("exponent");
	var start = 0;
	var middle = 0;
	
	if(target.charAt(0) == '{')
	{
		start = editorCanvas.a.getter(target,'{','}');
		leave.child[0] = editorCanvas.a.analyse(target.substring(1,start));
	}
	else
	{
		while(target.charAt(start) != '^' && start < target.length)
		{
			start++;
		}
		leave.child[0] = editorCanvas.a.analyse(target.substring(0,start));
		start--;
	}
	
	if(target.charAt(start+1) == '^')
	{start++;}
	
	if(target.charAt(start+1) != '{')
	{	
		middle = start+1;
		leave.child[1] = editorCanvas.a.analyse(target.charAt(start+1));
	}
	else
	{
		middle = editorCanvas.a.getter(target.substring(start+1),'{','}')+start+1;
		leave.child[1] = editorCanvas.a.analyse( target.substring(start+2,middle));
	}
	
	if(middle < target.length-1)
	{
		if(target.charAt(middle+1) == '_')
		{
			start = middle+2;
			var branch = new editorCanvas.node("supsub");
			branch.child[0] = leave.child[0];
			branch.child[1] = leave.child[1];
			middle = editorCanvas.a.getter(target.substring(start),'{','}')+start;
			branch.child[2] = editorCanvas.a.analyse(target.substring(start+1,middle));
			leave = null;
			if(middle < target.length-1)
			{
				var trunk = new editorCanvas.node("right");
				trunk.child[0] = branch;
				trunk.child[1] = editorCanvas.a.analyse(target.substring(middle+1));
				return trunk;
			}
		}
		else
		{
			var branch = new editorCanvas.node("right");
			branch.child[0] = leave;
			branch.child[1] = editorCanvas.a.analyse(target.substring(middle+1));
		}
		return branch;
	}
	else
	{return leave;}
};

editorCanvas.Analysis.prototype.options["subscript"] = function(target){
	var leave = new editorCanvas.node("subscript");
	var start = 0;
	var middle = 0;
	
	if(target.charAt(0) == '{')
	{
		start = editorCanvas.a.getter(target,'{','}');
		leave.child[0] = editorCanvas.a.analyse(target.substring(1,start));
	}
	else
	{
		while(target.charAt(start) != '_' && start < target.length)
		{
			start++;
		}
		leave.child[0] = editorCanvas.a.analyse(target.substring(0,start));
		start--;
	}
	
	if(target.charAt(start+1) == '_')
	{start++;}
	
	if(target.charAt(start+1) != '{')
	{	
		middle = start+1;
		leave.child[1] = editorCanvas.a.analyse(target.charAt(start+1));
	}
	else
	{
		middle = editorCanvas.a.getter(target.substring(start+1),'{','}')+start+1;
		leave.child[1] = editorCanvas.a.analyse( target.substring(start+2,middle));
	}
	
	if(middle < target.length-1)
	{
		if(target.charAt(middle+1) == '^')
		{
			start = middle+2;
			var branch = new editorCanvas.node("supsub");
			branch.child[0] = leave.child[0];
			branch.child[2] = leave.child[1];
			middle = editorCanvas.a.getter(target.substring(start),'{','}')+start;
			branch.child[1] = editorCanvas.a.analyse(target.substring(start+1,middle));
			leave = null;
			if(middle < target.length-1)
			{
				var trunk = new editorCanvas.node("right");
				trunk.child[0] = branch;
				trunk.child[1] = editorCanvas.a.analyse(target.substring(middle+1));
				return trunk;
			}
		}
		else
		{
			var branch = new editorCanvas.node("right");
			branch.child[0] = leave;
			branch.child[1] = editorCanvas.a.analyse(target.substring(middle+1));
		}
		return branch;
	}
	else
	{return leave;}
};

editorCanvas.bigone = function(target,type){
	var leave = new editorCanvas.node(type);
	var start = 0;
	var middle = 0;
	
	if(target.substring(0,7) == '\\limits')
	{target = target.substring(7);}
	if(target.charAt(0) == '^')
	{
		start = editorCanvas.a.getter(target.substring(1),'{','}')+1;
		leave.child[1] = editorCanvas.a.analyse(target.substring(2,start));
	}else if(target.charAt(0) == '_')
	{
		start = editorCanvas.a.getter(target.substring(1),'{','}')+1;
		leave.child[0] = editorCanvas.a.analyse(target.substring(2,start));
	}
	
	if(target.charAt(start+1) == '^')
	{
		middle = editorCanvas.a.getter(target.substring(start+2),'{','}')+start+2;
		leave.child[1] = editorCanvas.a.analyse(target.substring(start+3,middle));
	}
	else if(target.charAt(start+1) == '_')
	{
		middle = editorCanvas.a.getter(target.substring(start+2),'{','}')+start+2;
		leave.child[0] = editorCanvas.a.analyse(target.substring(start+3,middle));
	}
	
	if(target.charAt(middle+1) != '{')
	{
		start = middle+1;
		leave.child[2] = editorCanvas.a.analyse(target.charAt(middle+1));
	}
	else
	{
		start = editorCanvas.a.getter(target.substring(middle+1),'{','}')+middle+1;
		leave.child[2] = editorCanvas.a.analyse(target.substring(middle+2,start));
	}
	
	if(target.charAt(start+1) == '^')
	{
		var t =leave.child[2];
		leave.child[2] = new editorCanvas.node("supsub");
		leave.child[2].child[0] = t;
		middle = editorCanvas.a.getter(target.substring(start+2),'{','}')+start+2;
		leave.child[2].child[1] = editorCanvas.a.analyse(target.substring(start+3,middle));
		start = middle;
	}
	else if(target.charAt(start+1) == '_')
	{
		var t =leave.child[2];
		leave.child[2] = new editorCanvas.node("supsub");
		leave.child[2].child[0] = t;
		middle = editorCanvas.a.getter(target.substring(start+2),'{','}')+start+2;
		leave.child[2].child[2] = editorCanvas.a.analyse(target.substring(start+3,middle));
		start = middle;
	}
	
	if(target.charAt(start+1) == '^')
	{
		middle = editorCanvas.a.getter(target.substring(start+2),'{','}')+start+2;
		leave.child[2].child[1] = editorCanvas.a.analyse(target.substring(start+3,middle));
		start = middle;
	}
	else if(target.charAt(start+1) == '_')
	{
		middle = editorCanvas.a.getter(target.substring(start+2),'{','}')+start+2;
		leave.child[2].child[2] = editorCanvas.a.analyse(target.substring(start+3,middle));
		start = middle;
	}
	
	if(start < target.length-1)
	{	
		var branch = new editorCanvas.node("right");
		branch.child[0] = leave;
		branch.child[1] = editorCanvas.a.analyse(target.substring(start+1));
		return branch;
	}
	else
	{return leave;}
};

editorCanvas.Analysis.prototype.options["sum"] = function(target){
	return editorCanvas.bigone(target,"sum");
};

editorCanvas.Analysis.prototype.options["bigcup"] = function(target){
	return editorCanvas.bigone(target,"bigcup");
};

editorCanvas.Analysis.prototype.options["bigcap"] = function(target){
	return editorCanvas.bigone(target,"bigcap");
};

editorCanvas.Analysis.prototype.options["mathop"] = function(target){
	var leave = new editorCanvas.node("updown");
	var step = 0;
	var middle = 0;
	
	step = editorCanvas.a.getter(target,'{','}');
	leave.child[0] = editorCanvas.a.analyse(target.substring(1,step));
	
	if(target.substr(step+1,7) == "\\limits"){step += 7;}
	
	step++;
	middle = editorCanvas.a.getter(target.substring(step+1),'{','}')+step+1;
	
	if(target.charAt(step) == '_')
	{
		leave.child[2] = editorCanvas.a.analyse(target.substring(step+2,middle));
		
		if(target.charAt(middle+1) != '^')
		{
			leave.child[1] = editorCanvas.a.analyse(target.substring(step+2,middle));
			leave.type = "down";
			
			if(middle < target.length-1)
			{
				var branch = new editorCanvas.node("right");
				branch.child[0] = leave;
				branch.child[1] = editorCanvas.a.analyse(target.substring(middle+1));
				return branch;
			}
			else
			{
				return leave;
			}
		}	
	}
	else if(target.charAt(step) == '^')
	{
		leave.child[1] = editorCanvas.a.analyse(target.substring(step+2,middle));

		if(target.charAt(middle+1) != '_')
		{
			leave.type = "up";
			
			if(middle < target.length-1)
			{
				var branch = new editorCanvas.node("right");
				branch.child[0] = leave;
				branch.child[1] = editorCanvas.a.analyse(target.substring(middle+1));
				return branch;
			}
			else
			{
				return leave;
			}
		}
	}
	else
	{
		if(step < target.length-1)
		{
			var branch = new editorCanvas.node("right");
			branch.child[0] = leave.child[0];
			branch.child[1] = editorCanvas.a.analyse(target.substring(step));
			return branch;
		}
		else
		{return leave.child[0];}
	}
	
	middle++;
	step = editorCanvas.a.getter(target.substring(middle+1),'{','}')+middle+1;
	
	if(target.charAt(middle) == '^')
	{leave.child[1] = editorCanvas.a.analyse(target.substring(middle+2,step));}
	else if(target.charAt(middle) == '_')
	{leave.child[2] = editorCanvas.a.analyse(target.substring(middle+2,step));}
	
	if(step < target.length-1)
	{
		if(target.charAt(step+1) == '^')
		{return editorCanvas.a.exponent(target.substring(step+2),leave);}
		if(target.charAt(step+1) == '_')
		{return editorCanvas.a.subscript(target.substring(step+2),leave);}
		
		var branch = new editorCanvas.node("right");
		branch.child[0] = leave;
		branch.child[1] = editorCanvas.a.analyse(target.substring(step+1,target.length));
		return branch;
	}
	else
	{return leave;}
};
editorCanvas.Analysis.prototype.options["em"] = function(target){
	return editorCanvas.a.unary(target,"em");
};

editorCanvas.Analysis.prototype.options["overline"] = function(target){
	return editorCanvas.a.unary(target,"overline");
};

editorCanvas.Analysis.prototype.options["underline"] = function(target){
	return editorCanvas.a.unary(target,"underline");
};

editorCanvas.Analysis.prototype.options["widehat"] = function(target){
	return editorCanvas.a.unary(target,"widehat");
};

editorCanvas.Analysis.prototype.options["overrightarrow"] = function(target){
	return editorCanvas.a.unary(target,"overrightarrow");
};

editorCanvas.Analysis.prototype.options["underrightarrow"] = function(target){
	return editorCanvas.a.unary(target,"underrightarrow");
};

editorCanvas.Analysis.prototype.options["frac"] = function(target){
	return editorCanvas.a.binary(target,"fraction");
};

editorCanvas.Analysis.prototype.options["twolinefrac"] = function(target){
	return editorCanvas.a.binary(target,"twolinefrac");
};

editorCanvas.Analysis.prototype.options["rowfrac"] = function(target){
	return editorCanvas.a.binary(target,"rowfrac");
};

editorCanvas.Analysis.prototype.options["underset"] = function(target){
	return editorCanvas.a.binary(target,"underset");
};

editorCanvas.Analysis.prototype.options["overbrace"] = function(target){
	return editorCanvas.a.binary(target,"overbrace");
};

editorCanvas.Analysis.prototype.options["underbrace"] = function(target){
	return editorCanvas.a.binary(target,"underbrace");
};

editorCanvas.Analysis.prototype.options["transfer"] = function(target){
	return editorCanvas.a.binary(target,"transfer");
};

editorCanvas.Analysis.prototype.options["twoarrowfrac"] = function(target){
	return editorCanvas.a.binary(target,"twoarrowfrac");
};

editorCanvas.Analysis.prototype.options["arrowfrac"] = function(target){
	return editorCanvas.a.binary(target,"arrowfrac");
};

editorCanvas.Analysis.prototype.options["left"] = function(target){
	var leave = new editorCanvas.node("bracket");
	var start = 0;
	
	start = editorCanvas.a.getter2("\\left"+target,"left","right")-5;

	if(target.charAt(0) == '\\' && target.charAt(1) == '{')
	{
		leave.arg[0] = "{";
		leave.child[0] = editorCanvas.a.analyse(target.substring(2,start));
	}
	else
	{
		if(target.charAt(0) == '.')
		{leave.arg[0] = "";}
		else
		{leave.arg[0] = target.charAt(0);}
		leave.child[0] = editorCanvas.a.analyse(target.substring(1,start));
	}
	
	if(target.charAt(start+6) == '\\' && target.charAt(start+7) == '}')
	{
		leave.arg[1] = "}";
		start++;
	}
	else
	{
		if(target.charAt(start+6) == '.')
		{leave.arg[1] = "";}
		else
		{leave.arg[1] = target.charAt(start+6);}
	}

	start += 6;
	if(start < target.length-1)
	{
		if(target.charAt(start+1) == '^')
		{return editorCanvas.a.exponent(target.substring(start+2),leave);}
		if(target.charAt(start+1) == '_')
		{return editorCanvas.a.subscript(target.substring(start+2),leave);}
		
		var branch = new editorCanvas.node("right");
		branch.child[0] = leave;
		branch.child[1] = editorCanvas.a.analyse(target.substring(start+1));
		return branch;
	}
	else
	{return leave;}
};

editorCanvas.Analysis.prototype.options["matrix"] = function(target){
	var leave = new editorCanvas.node("matrix");
	var start = 0;
	target = target.substring(8);
	var count = 0;
	var count2 = 1;
	var count3 = 0;
	
	for(var i = 0;i < target.length;i++)
	{
		if(target.charAt(i) == '\\')
		{
			if(target.charAt(i+1) == '\\' && count2 == 1)
			{
				leave.child[count++] = editorCanvas.a.analyse(target.substring(start,i));
				start = i+2;
				count3++;
				i++;
			}
			else 
			{
				if(target.substr(i+1,5) == 'begin')
				{count2++;}
				if(target.substr(i+1,3) == 'end')
				{
					count2--;
					if(count2 == 0)
					{
						if(start+1 < i)
						{
							leave.child[count++] = editorCanvas.a.analyse(target.substring(start,i));
							start = i;
							count3++;
						}
						break;
					}
				}
			}
		}
		else if(target.charAt(i) == '&' && count2 == 1)
		{
			leave.child[count++] = editorCanvas.a.analyse(target.substring(start,i));
			start = i+1;
		}
	}
	leave.arg[0] = count/count3;
	leave.arg[1] = count3;
	
	if(count == 0)
	{leave.child[1] = new editorCanvas.node("shuzi");leave.child[1].value = "";}
	
	start += 12;
	if(start < target.length-1)
	{
		if(target.charAt(start+1) == '^')
		{return editorCanvas.a.exponent(target.substring(start+2),leave);}
		if(target.charAt(start+1) == '_')
		{return editorCanvas.a.subscript(target.substring(start+2),leave);}
		
		var branch = new editorCanvas.node("right");
		branch.child[0] = leave;
		branch.child[1] = editorCanvas.a.analyse(target.substring(start+1));
		return branch;
	}
	else
	{return leave;}
};

editorCanvas.Analysis.prototype.options["begin"] = function(target){
	var leave = new editorCanvas.node("equation");
	var start = 0;
	var middle = 0;
	var eq = null;
	var count = 0;
	var count2 = 1;
	var t;
	
	if(target.charAt(0) == '{'){
		if(target.substring(0,8) == "{matrix}"){
			return this.matrix(target);
		}
		t = editorCanvas.a.getter(target,'{','}');
		target = target.substring(t+1);
		if(target.charAt(0) == '{'){
			t = editorCanvas.a.getter(target,'{','}');
			target = target.substring(t+1);
		}
	}
	
	for(var i = 0;i < target.length;i++){
		if(target.charAt(i) == '\\'){
			if(target.charAt(i+1) == '\\'){
				count++
				start = i+2;
			}
			if(target.substr(i+1,3) == 'end'){
				start = i;
				break;
			}
		}else if(target.charAt(i) == '{'){
			t = editorCanvas.a.getter(target.substring(i),'{','}');
			leave.child[count] = editorCanvas.a.analyse(target.substring(i,i+t+1));
			i +=t;
		}
	}
	
	if(count == 0){
		leave.child[1] = new editorCanvas.node("shuzi");
		leave.child[1].value = "";
	}
	
	if(count == 2){
		leave.type = "equation3";
	}
	
	start += 4;
	start = editorCanvas.a.getter(target.substring(start),'{','}')+start;
	
	if(start < target.length-1)
	{
		if(target.charAt(start+1) == '^')
		{return editorCanvas.a.exponent(target.substring(start+2),leave);}
		if(target.charAt(start+1) == '_')
		{return editorCanvas.a.subscript(target.substring(start+2),leave);}
		
		var branch = new editorCanvas.node("right");
		branch.child[0] = leave;
		branch.child[1] = editorCanvas.a.analyse(target.substring(start+1));
		return branch;
	}
	else
	{return leave;}
};

//特殊符号-----------------------------------------------------------------------------
editorCanvas.signs = {
	"theta":"θ",
	"sigma":"σ",
	"alpha":"α",
	"delta":"δ",
	"Delta":"Δ",
	"beta":"β",
	"varnothing":"∅",
	"partial":"ð",
	"Phi":"Φ",
	"xi":"ξ",
	"bot" : "⊥",
	"mu":"μ",
	"tau":"τ",
	"neg":"¬",
	"pm":"±",
	"Omega":"Ω",
	"eta":"η",
	"varepsilon":"ε",
	"lamda":"λ",
	"upsilon":"υ",
	"vartheta":"ϑ",
	"gamma":"γ",
	"pi":"π",
	"notin":"∉",
	"supseteq":"⊇",
	"forall":"∀",
	"backepsilon":"∍",
	"exists":"∃",
	"infty":"∞",
	"omega":"ω",
	"varphi":"φ",
	"parallel":"∥",
	"triangleq":"≜",
	"measuredangle":"∡",
	"Leftrightarrow":"⇔",
	"rightleftharpoons":"⇌",
	"in":"∈",
	"int":"∫",
	"cup":"∪",
	"cap":"∩",
	"subset":"⊂",
	"supset":"⊃",
	"lim":"lim",
	"to":"→",
	"circ":"○",
	"odot":"⊙",
	"angle":"∠",
	"mp":"∓",
	"bullet":"•",
	"centerdot":"•",
	"cdot":"•",
	"zeta":"ζ",
	",":" ",
	"le":"≤",
	"ge":"≥",
	"div":"÷",
	"subseteq":"⊆",
	"supseteq":"⊇",
	"vartriangle":"△",
	"wedge":"∧",
	"vee":"∨",
	"leftrightarrow":"↔",
	"uparrow":"↑",
	"downarrow":"↓",
	"because":"∵",
	"therefore":"∴",
	"Rightarrow":"⇒",
	"Leftarrow":"⇐",
	"prec":"≺",
	"succ":"≻",
	"triangleleft":"⊲",
	"triangleright":"⊳",
	"sim":"∼",
	"approx":"≈",
	"simeq":"≃",
	"cong":"≅",
	"ne":"≠",
	"equiv":"≡",
	"oplus":"⊕",
	"square":"□",
	"smallint":"∫",
	"sin":"sin",
	"cos":"cos",
	"tan":"tan",
	"cot":"cot",
	"arcsin":"arcsin",
	"arccos":"arccos",
	"arctan":"arctan",
	"arccot":"arccot",
	"times":"×"
	// "rhomboid":"▱", 平行四边形
};

for(var i in editorCanvas.signs){
	editorCanvas.Analysis.prototype.options[i] = function(target,index){
		return editorCanvas.a.analyse(editorCanvas.signs[index]+target);
	};
}

editorCanvas.Analysis.prototype.options["not"] = function(target){
	if(target.substr(0,7) == "\\subset"){
		target = target.substring(8);
	}
	return editorCanvas.a.analyse("⊄"+target);
};