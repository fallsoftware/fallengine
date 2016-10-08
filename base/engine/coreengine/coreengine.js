define(['TimeObject','GameEngine','RenderingEngine', 'MathUtils',
	'ObjectGenerator'], function(TimeObject, GameEngine, RenderingEngine, M,
	ObjectGenerator) {
	'use strict';

	function CoreEngine(canvas) {
		this.fps = 60;
		this.gameObjects = [];
		this.gameEngine = new GameEngine(this.gameObjects);
		this.renderingEngine = new RenderingEngine(this.gameObjects, canvas);
		this.renderingEngine.init();
		this.timeObject = new TimeObject();
		this.running = false;
		this.generateGameObjects();
	}

	CoreEngine.prototype.start = function () {
		this.running = true;
		this.loop();
	};

	CoreEngine.prototype.loop = function () {
		if (this.running) {
			this.timeObject.initialize();
			this.gameEngine.update();
			this.renderingEngine.render();
			var delay = (1000/this.fps) - this.timeObject.getDelta();
			window.setTimeout(this.loop.bind(this), delay);
		}
	};

	CoreEngine.prototype.stop = function () {
		this.running = false;
	};

	CoreEngine.prototype.generateGameObjects = function () {
		var objectGenerator = new ObjectGenerator(M.randomInt(3, 10),
		this.gameObjects, this.gameEngine.physicsEngine,
			this.renderingEngine.canvas.width,
			this.renderingEngine.canvas.height);

		objectGenerator.generate();
	};

	return CoreEngine;
});
