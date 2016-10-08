define(['TimeObject','GameEngine','RenderingEngine', 'CircleObject',
	'RectangleObject', 'PolygonObject', 'AABBObject', 'OBBObject', 'KDopObject',
	'Point', 'Vector'], function(TimeObject, GameEngine, RenderingEngine,
		CircleObject, RectangleObject, PolygonObject, AABBObject, OBBObject,
		KDopObject, P, V) {
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
        this.gameObjects.push(
            new CircleObject(250, 250, 25, 0, Math.PI * 2, true, new V(10, 0),
			'#eceff1',
            '../engine/gamecomponent/circle/elements/background.png', 19));
		this.gameObjects.push(
            new CircleObject(260, 260, 25, 0, Math.PI * 2, true, new V(10, 0),
			'#eceff1',
            '../engine/gamecomponent/circle/elements/background.png', 19));
		this.gameObjects.push(
			new AABBObject(new P(10, 10), new P(100, 150), new V(4, 1), '#eceff1'));
		this.gameObjects.push(
			new OBBObject(new P(200, 200), new V(4, 1), 200, 100, new V(4, 1),
				'#eceff1'));
		var polygon = [new P(300, 100), new P(500, 400), new P(100, 500)];
		this.gameObjects.push(
			new KDopObject(polygon, [new V(1, -1),
				new V(1, 0),
				new V(1, 1),
				new V(0, 1)], new V(4, 1), '#eceff1'));
	}

	return CoreEngine;
});
