define(['TimeObject','GameEngine','RenderingEngine', 'MarioObject',
	'CircleObject', 'RectangleObject'], function(TimeObject, GameEngine,
	RenderingEngine, MarioObject, CircleObject, RectangleObject) {
	'use strict';

	function CoreEngine(canvas) {
		this.fps = 60;
		this.gameObjects = [];
		this.generateGameObjects();
		this.gameEngine = new GameEngine(this.gameObjects);
		this.renderingEngine = new RenderingEngine(this.gameObjects, canvas);
		this.renderingEngine.init();
		this.timeObject = new TimeObject();
		this.running = false;
	}

	CoreEngine.prototype.start = function () {
		this.running = true;
		this.loop();
	}

	CoreEngine.prototype.loop = function () {
		if (this.running) {
			this.timeObject.initialize();
			this.gameEngine.update();
			this.renderingEngine.render();
			var delay = (1000/this.fps) - this.timeObject.getDelta();
			window.setTimeout(this.loop.bind(this), delay);
		}
	}

	CoreEngine.prototype.stop = function () {
		this.running = false;
	}

	CoreEngine.prototype.generateGameObjects = function () {
		this.gameObjects.push(new MarioObject());
        this.gameObjects.push(
            new CircleObject(250, 250, 25, 0, Math.PI * 2, true, '#eceff1',
            '../engine/gamecomponent/circle/elements/background.png', 20));
        this.gameObjects.push(
            new RectangleObject(200, 500, 100, 150, 0, '#eceff1',
            '../engine/gamecomponent/rectangle/elements/background.png', 20));
        this.gameObjects.push(
            new RectangleObject(300, 200, 30, 30, -123*Math.PI/180, '#e6ee9c',
            '../engine/gamecomponent/rectangle/elements/background.png'));
        this.gameObjects.push(
            new RectangleObject(500, 300, 200, 100, 70, '#f8bbd0',
            '../engine/gamecomponent/rectangle/elements/background.png', 20));
	}

	return CoreEngine;
});
