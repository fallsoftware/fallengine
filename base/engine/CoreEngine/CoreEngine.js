define(['TimeObject','GameEngine','RenderingEngine'], function(TimeObject,
	GameEngine, RenderingEngine) {
	'use strict';

	function CoreEngine() {
		this.fps = 60;
		this.gameEngine = new GameEngine();
		this.renderingEngine = new RenderingEngine();
		this.timeObject = new TimeObject();
		this.running = false;
	}

	CoreEngine.prototype.start = function() {
		this.running = true;
		this.loop();
	}

	CoreEngine.prototype.loop = function() {
		if (this.running) {
			this.timeObject.initialize();
			this.gameEngine.update();
			this.renderingEngine.render();
			var delay = (1000/this.fps) - this.timeObject.getDelta();
			setTimeout(this.loop, delay);
		}
	}

	CoreEngine.prototype.stop = function() {
		this.running = false;
	}

    return CoreEngine;
});
