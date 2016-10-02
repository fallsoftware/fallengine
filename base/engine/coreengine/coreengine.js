<<<<<<< HEAD
define(['TimeObject','GameEngine','RenderingEngine', 'MarioObject',
	'CircleObject', 'RectangleObject', 'PolygonObject', 'AABBObject', 'Point'], function(TimeObject,
	GameEngine, RenderingEngine, MarioObject, CircleObject, RectangleObject,
	PolygonObject, AABBObject, P) {
=======
define(['TimeObject','GameEngine','RenderingEngine'], function(TimeObject,
	GameEngine, RenderingEngine) {
>>>>>>> 17f07f62bb6f83cdf034a641e8801c0860e9ea8c
	'use strict';

	function CoreEngine(canvas) {
		this.fps = 60;
		this.gameObjects = [];
		this.generateGameObjects();
		this.gameEngine = new GameEngine(this.gameObjects);
		this.renderingEngine = new RenderingEngine(this.gameObjects, canvas);
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
<<<<<<< HEAD
		this.gameObjects.push(new MarioObject());
        this.gameObjects.push(
            new CircleObject(250, 250, 25, 0, Math.PI * 2, true, '#eceff1',
            '../engine/gamecomponent/circle/elements/background.png', 20));
        /*this.gameObjects.push(
            new RectangleObject(200, 500, 100, 150, '#eceff1'));*/
		/*this.gameObjects.push(
            new PolygonObject([[10, 0], [100, 50], [50, 100], [0, 90]], 70, '#eceff1'));*/
		this.gameObjects.push(
			new AABBObject(new P(10, 10), new P(100, 150), '#eceff1'));
=======

>>>>>>> 17f07f62bb6f83cdf034a641e8801c0860e9ea8c
	}

	return CoreEngine;
});
