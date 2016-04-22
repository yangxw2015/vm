function dray(obj){
	var x=0;
	var y=0;
	
	var down = "ontouchstart" in obj ? "touchstart" : "mousedown";
	var move = "ontouchmove" in obj ? "touchmove" : "mousemove";
	var end = "ontouchend" in obj ? "touchend" : "mouseup";
	
	obj.addEventListener(down,function(ev){
		if(down=="touchstart"){//移动端
			var disX=ev.targetTouches[0].pageX-x;
			var disY=ev.targetTouches[0].pageY-y;
		
			var id=ev.targetTouches[0].identifier;
		}else{
			var disX = ev.pageX-x;
			var disY = ev.pageY-y;	
		}
				
		function fnMove(ev){
			if(down=="touchstart"){//移动端
				if(ev.targetTouches[0].identifier==id){
					x=ev.targetTouches[0].pageX - disX;
					y=ev.targetTouches[0].pageY - disY;
					//限定边界
					if(x>0){
						x=0;	
					}else if(x<document.documentElement.clientWidth - obj.offsetWidth){
						x = document.documentElement.clientWidth - obj.offsetWidth;
					}
					
					if(y>0){
						y=0;	
					}else if(y<document.documentElement.clientHeight - obj.offsetHeight){
						y = document.documentElement.clientHeight - obj.offsetHeight;
					}
					obj.style.transform = "translate("+x+"px,"+y+"px)";	
				}
			}else{
				x=ev.pageX - disX;
				y=ev.pageY - disY;	
				//限定边界
				if(x>0){
					x=0;	
				}else if(x<document.documentElement.clientWidth - obj.offsetWidth){
					x = document.documentElement.clientWidth - obj.offsetWidth;
				}
				
				if(y>0){
					y=0;	
				}else if(y<document.documentElement.clientHeight - obj.offsetHeight){
					y = document.documentElement.clientHeight - obj.offsetHeight;
				}
				obj.style.transform = "translate("+x+"px,"+y+"px)";	
			}						
		}		
		function fnEnd(ev){
			if(down=="touchstart"){//移动端
				if(ev.changedTouches[0].identifier==id){
					document.removeEventListener(move,fnMove,false);
					document.removeEventListener(end,fnMove,false);		
				}
			}else{
				document.removeEventListener(move,fnMove,false);
				document.removeEventListener(end,fnMove,false);		
			}
			
		}
		document.addEventListener(move,fnMove,false);
		document.addEventListener(end,fnEnd,false);
		ev.preventDefault();
	},false);		
};