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
        this.objectTypes = ['CircleObject', 'AABBObject',
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
            return new V(M.randomInt(-10, 10), M.randomInt(-10, 10));
    };

    ObjectGenerator.prototype.checkIfCollisions = function (newGameObject) {
        for (var gameObject of this.gameObjects) {
            if (newGameObject != gameObject
                && this.physicsEngine.isCollision(gameObject,
                newGameObject)) {
                return true;
            }

            if (!this.physicsEngine.bounds.contains(newGameObject)) {
                return true;
            }
        }

        return false;
    };

    ObjectGenerator.prototype.generatePointObject = function () {
        return new PointObject(this.generatePoint(), this.generateSpeed(),
            this.getColor());
	};

    ObjectGenerator.prototype.generateCircleObject = function () {
        return new CircleObject(this.generatePoint(),
            M.randomInt(20, 100), 0, Math.PI * 2, true,
            this.generateSpeed(), this.getColor());
	};

    ObjectGenerator.prototype.generateAABBObject = function () {
        var point = this.generatePoint();

        return new AABBObject(point, new P(point.x + this.generateLength(),
            point.y + this.generateLength()), this.generateSpeed(),this.getColor());
	};

    ObjectGenerator.prototype.generateOBBObject = function () {
        return new OBBObject(this.generatePoint(), new V(M.randomInt(0, 20),
            M.randomInt(0, 20)), this.generateLength(), this.generateLength(),
            this.generateSpeed(), this.getColor());
	};

    ObjectGenerator.prototype.generateKDopObject = function () {
        var maxLength = 250;
        var minx = M.randomInt(0, maxLength);
        var maxx = M.randomInt(minx, minx+maxLength);
        var miny = M.randomInt(0, maxLength);
        var maxy = M.randomInt(miny, miny+maxLength);
        var dif = Math.min(maxx-minx, maxy-miny)
        var mina = M.randomInt(minx+miny, minx+miny+dif);
        var maxa = M.randomInt(maxx+maxy-dif, maxx+maxy);
        var minb = M.randomInt(minx-maxy, Math.min(2*minx-mina, -2*maxy+maxa));
        var maxb = M.randomInt(Math.max(2*maxx-maxa, mina-2*miny), maxx-miny);
        var min = [minb, minx, mina, miny];
        var max = [maxb, maxx, maxa, maxy];

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
            '#ba68C8', '#f06292', '#2196f3', '#006064', '#009688', '#00c853',
            '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ffa000', '#ff5722',
            '#795548', '#bcaaa4', '#a1887f', '#4e342e', '#9e9e9e', '#607d8b',
            '#b0bec5'];
    };

    ObjectGenerator.prototype.getColor = function () {
        return this.colorBank[M.randomInt(0, this.colorBank.length-1)];
    };

    ObjectGenerator.prototype.generateLength = function () {
        return M.randomInt(10, 200);
    };

	return ObjectGenerator;
});
