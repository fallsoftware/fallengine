define(['CircleObject', 'PointObject', 'AABBObject', 'OBBObject', 'KDopObject',
    'Point', 'Vector', 'MathUtils'], function(CircleObject, PointObject,
    AABBObject, OBBObject, KDopObject, P, V, M) {
	'use strict';

	function ObjectGenerator(number, gameObjects, physicsEngine, maxWidth,
        maxHeight) {
        this.number = number;
        this.gameObjects = gameObjects;
        this.physicsEngine = physicsEngine;
        this.maxWidth = maxWidth;
        this.maxHeight = maxHeight;
        this.objectTypes = ['PointObject', 'CircleObject', 'AABBObject',
            'OBBObject', 'KDopObject'];
        this.createObjectsHashmap();
        this.createColorBank();
	}

	ObjectGenerator.prototype.generate = function () {
        for (var i = 1; i < this.number; i++) {
            this.generateGameObject();
        }
	};

    ObjectGenerator.prototype.generateGameObject = function () {
        var size = this.objectTypes.length;
        var newGameObject;

        do {
            newGameObject
                = this.objectGenerators[this.objectTypes[
                M.randomInt(0, size-1)]]();
        } while (this.checkIfCollisions(newGameObject));

        this.gameObjects.push(newGameObject);
    };

    ObjectGenerator.prototype.generatePoint = function () {
            return new P(M.randomInt(0, this.maxWidth),
                M.randomInt(0, this.maxHeight));
    };

    ObjectGenerator.prototype.generateSpeed = function () {
            return new V(M.randomInt(0, 10),
                M.randomInt(0, 10));
    };

    ObjectGenerator.prototype.checkIfCollisions = function (newGameObject) {
        for (var gameObject of this.gameObjects) {
            if (newGameObject != gameObject
                && this.physicsEngine.computePhysics(gameObject,
                newGameObject)) {
                return true;
            }
        }

        return false;
    };

    ObjectGenerator.prototype.generatePointObject = function () {
        return new PointObject(this.generatePoint(), this.generateSpeed());
	};

    ObjectGenerator.prototype.generateCircleObject = function () {
        var images = ['',
            '../engine/gamecomponent/circle/elements/background.png'];

        return new CircleObject(this.generatePoint(),
            M.randomInt(2, 80), 0, Math.PI * 2, true,
            this.generateSpeed(), this.getColor(),
            images[M.randomInt(0, images.length-1)], this.generatePadding());
	};

    ObjectGenerator.prototype.generateAABBObject = function () {
        var point = this.generatePoint();

        return new AABBObject(point, new P(point.x + this.generateLength(),
            point.y, this.generateLength()));
	};

    ObjectGenerator.prototype.generateOBBObject = function () {
        return new OBBObject(this.generatePoint(), new V(M.randomInt(0, 20),
            M.randomInt(0, 20)), this.generateLength(), this.generateLength(),
            this.generateSpeed(), this.getColor());
	};

    ObjectGenerator.prototype.generateKDopObject = function () {
        var maxLength;
        var min = [M.randomInt(-250, 250), M.randomInt(0, 250),
            M.randomInt(0, 250), M.randomInt(0, 250)];
        var max = [];

        for (var i = 0; i < 4; i++) {
            max.push(min[i] + M.randomInt(0, 500));
        }

        return new KDopObject(null, [new V(1, -1),
            new V(1, 0),
            new V(1, 1),
            new V(0, 1)], this.generateSpeed(), this.getColor(), min, max);
	};

    ObjectGenerator.prototype.createObjectsHashmap = function () {
        this.objectGenerators = [];
        this.objectGenerators['PointObject']
            = this.generatePointObject.bind(this);
        this.objectGenerators['CircleObject']
            = this.generateCircleObject.bind(this);
        this.objectGenerators['AABBObject']
            = this.generateAABBObject.bind(this);
        this.objectGenerators['OBBObject'] = this.generateOBBObject.bind(this);
        this.objectGenerators['KDopObject']
            = this.generateKDopObject.bind(this);
    };

    ObjectGenerator.prototype.createColorBank = function () {
        this.colorBank = ['#3d5afe', '#ff5722', '#ff9800', '#ff1744',
            '#ba68C8'];
    };

    ObjectGenerator.prototype.getColor = function () {
        return this.colorBank[M.randomInt(0, this.colorBank.length-1)];
    };

    ObjectGenerator.prototype.generatePadding = function () {
        return M.randomInt(0, 40);
    };

    ObjectGenerator.prototype.generateLength = function () {
        return M.randomInt(10, 200);
    }

	return ObjectGenerator;
});

/*this.gameObjects.push(
    new CircleObject(new P(250, 250), 25, 0, Math.PI * 2, true,
    new V(10, 0), '#3d5afe',
    '../engine/gamecomponent/circle/elements/background.png', 19));
this.gameObjects.push(
    new CircleObject(new P(260, 260), 25, 0, Math.PI * 2, true,
    new V(10, 0), '#ff5722',
    '../engine/gamecomponent/circle/elements/background.png', 19));
this.gameObjects.push(
    new AABBObject(new P(10, 10), new P(100, 150), new V(4, 1),
    '#ff9800'));
this.gameObjects.push(
    new OBBObject(new P(200, 200), new V(4, 1), 200, 100, new V(4, 1),
        '#ff1744'));
var polygon = [new P(300, 100), new P(500, 400), new P(100, 500)];
this.gameObjects.push(
    new KDopObject(polygon, [new V(1, -1),
        new V(1, 0),
        new V(1, 1),
        new V(0, 1)], new V(4, 1), '#ba68C8'));*/
