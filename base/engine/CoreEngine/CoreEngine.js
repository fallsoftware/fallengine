define(['TimeObject','GameEngine','RenderingEngine'],function(t,g,r){
	'use strict';
	function CoreEngine(){
		this.fps = 60;
		this.gameEngine= new g();
		this.renderingEngine = new r();
		this.timeObject
		this.running=false;
	}
	CoreEngine.prototype.start = function(){
		this.running=true;
		this.loop();
	}
	CoreEngine.prototype.loop = function(){
		if(this.running){
			t.initialize();
			this.physicEngine.Refresh();
			this.renderingEngine.Refresh();
			var delay = (1000/this.fps)-t.getDelta();
			setTimeout(this.loop,delay);
		}
	}
	CoreEngine.prototype.stop(){
		this.running=false;
	}
});