define(['Point', 'Vector', 'KDopObject', 'MathUtils', 'Edge', 'PointObject',
    'OBBObject', 'BoxZoneObject'], function (P, V, KDopObject, M, E,
    PointObject, OBBObject, BoxZoneObject) {
    'use strict';

    Array.prototype.contains = function (v) {
        for (var i = 0; i < this.length; i++) {
            if (this[i] === v) return true;
        }

            return false;
    };

    Array.prototype.unique = function() {
        var arr = [];
        for (var i = 0; i < this.length; i++) {
            if (!arr.contains(this[i])) {
                arr.push(this[i]);
            }
        }

        return arr;
    };

    function PhysicsEngine(gameObjects, width, height) {
        this.gameObjects = gameObjects;
        this.createCollisionsHashmap();
        this.bounds = new BoxZoneObject(new P(0, 0), new P(width, height));
		this.collided = [];
		this.collidedM = [];
    }

    PhysicsEngine.prototype = Object.create(Observer.prototype);
    PhysicsEngine.prototype.constructor = PhysicsEngine;

    PhysicsEngine.prototype.update = function () {
        var size = this.gameObjects.length,
            i = 0, j = 0;

        for (i = 0; i < size; i++) {
            this.gameObjects[i].updatePhysics();

            for (j = i; j < size; j++) {
                if (i != j) {
                    this.computePhysics(this.gameObjects[i],
                        this.gameObjects[j]);
                }
            }
        }

		this.collidedM = this.collided;
		this.collided = [];
        this.checkBox();
    };

    PhysicsEngine.prototype.checkBox = function () {
        var size = this.gameObjects.length;

        for (var i = 0; i < size; i++) {
            this.bounds.contains(this.gameObjects[i])
        }
    };

    PhysicsEngine.prototype.computePhysics = function (gameObject1,
        gameObject2) {
        if (this.isCollision(gameObject1,gameObject2)) {
            this.handleCollision(gameObject1, gameObject2);
        }
    };

    PhysicsEngine.prototype.isCollision = function (gameObject1, gameObject2) {
        return this.computeCollisions[gameObject1.constructor.name
            + gameObject2.constructor.name](gameObject1,gameObject2);
    };

    PhysicsEngine.prototype.handleCollision = function (gameObject1,
        gameObject2) {
		this.collided['' + gameObject1.id + ',' + gameObject2.id] = 0;
        var tmpX = gameObject1.physicsComponents['movement'].speed.x;
        var tmpY = gameObject1.physicsComponents['movement'].speed.y;
        gameObject1.physicsComponents['movement'].speed.x
            = gameObject2.physicsComponents['movement'].speed.x;
        gameObject1.physicsComponents['movement'].speed.y
            = gameObject2.physicsComponents['movement'].speed.y;
        gameObject2.physicsComponents['movement'].speed.x = tmpX;
        gameObject2.physicsComponents['movement'].speed.y = tmpY;
		if (this.collidedM["" + gameObject1.id + ',' + gameObject2.id]
            != undefined) {
			var c1 = gameObject1.physicsComponents['data'].center;
			var c2 = gameObject2.physicsComponents['data'].center;
			var diFx = c1.x - c2.x;
			var diFy = c1.y - c2.y;
			gameObject1.physicsComponents['movement'].speed.x=Math.sign(diFx)
                * Math.abs(gameObject1.physicsComponents['movement'].speed.x);
			gameObject2.physicsComponents['movement'].speed.x=-Math.sign(diFx)
                * Math.abs(gameObject2.physicsComponents['movement'].speed.x);
			gameObject1.physicsComponents['movement'].speed.y
                = Math.sign(diFy)
                * Math.abs(gameObject1.physicsComponents['movement'].speed.y);
			gameObject2.physicsComponents['movement'].speed.y =
                -Math.sign(diFy)
                * Math.abs(gameObject2.physicsComponents['movement'].speed.y);
		}

	};

    PhysicsEngine.prototype.CircleCircle = function (circle1, circle2) {
        var circle1Physics = circle1.physicsComponents['data'];
        var circle2Physics = circle2.physicsComponents['data'];
        var distance = (new V(circle2Physics.center.x-circle1Physics.center.x,
            circle2Physics.center.y-circle1Physics.center.y)).lengthSquare();
        var minDistance = (circle1Physics.radius + circle2Physics.radius)
            * (circle1Physics.radius + circle2Physics.radius);

        if (distance < minDistance) {
            return true;
        } else {
            return false;
        }
    };

    PhysicsEngine.prototype.CircleAABB = function (circle, AABB) {
        var circleCenter = circle.physicsComponents['data'].center;
        var radius = circle.physicsComponents['data'].radius;
        var p1 = AABB.physicsComponents['data'].p1;
        var p2 = AABB.physicsComponents['data'].p2;

        if (circleCenter.x > Math.min(p1.x, p2.x)
            && circleCenter.x < Math.max(p1.x, p2.x)
            && circleCenter.y > Math.min(p1.y, p2.y)
            && circleCenter.y < Math.max(p1.y, p2.y)) {
                return true;
            }

        var closestPoint = new P(M.clamp(circleCenter.x,
            Math.min(p1.x, p2.x), Math.max(p1.x, p2.x)),
            M.clamp(circleCenter.y,
            Math.min(p1.y, p2.y), Math.max(p1.y, p2.y)));

        var toClosest = (new V(circleCenter.x - closestPoint.x,
            circleCenter.y - closestPoint.y)).lengthSquare();

        if (toClosest < radius*radius) {
            return true;
        }

        return false;s
    };

    PhysicsEngine.prototype.CircleOBB = function (circle, OBB) {
        var points = OBB.graphicsComponents['rendering'].points;
        var center = circle.physicsComponents['data'].center;

        if (this.OBBPoint(OBB, new PointObject(center, new V(0, 0)))) {
            return true;
        }

        var edges = this.getEdges(points);
        var size = edges.length;

        for (var i = 0; i < size; i++) {
            if (this.CircleEdge(circle, edges[i])) {
                return true;
            }
        }

        return false;
    };

    PhysicsEngine.prototype.CircleKDop = function (circle, KDop) {
        var points = KDop.graphicsComponents['rendering'].points;
        var center = circle.physicsComponents['data'].center;

        if (this.KDopPoint(KDop, new PointObject(center, new V(0, 0)))) {
            return true;
        }

        var edges = this.getEdges(points);
        var size = edges.length;

        for (var i = 0; i < size; i++) {
            if (this.CircleEdge(circle, edges[i])) {
                return true;
            }
        }

        return false;
    };

    PhysicsEngine.prototype.CirclePoint = function (circle, point) {
        var center = circle.physicsComponents['data'].center;
        var radius = circle.physicsComponents['data'].radius;
        var p = new P(point.physicsComponents['data'].point.x,
            point.physicsComponents['data'].point.y);

        var v = new V(p.x - center.x, p.y - center.y);

        if (v.lengthSquare() < radius*radius) {
            return true;
        }

        return false;
    };

    PhysicsEngine.prototype.AABBCircle = function (AABB, circle) {
        return this.CircleAABB(circle, AABB);
    };

    PhysicsEngine.prototype.AABBAABB = function (AABB1, AABB2) {
        var p11 = AABB1.physicsComponents['data'].p1;
        var p12 = AABB1.physicsComponents['data'].p2;
        var p21 = AABB2.physicsComponents['data'].p1;
        var p22 = AABB2.physicsComponents['data'].p2;

        var minX1 = p11.x;
        var maxX1 = p12.x;
        var minY1 = p11.y;
        var maxY1 = p12.y;

        var minX2 = p21.x;
        var maxX2 = p22.x;
        var minY2 = p21.y;
        var maxY2 = p22.y;

        if (maxX1 < minX2 || minX1 > maxX2) {
            return false;
        }

        if (maxY1 < minY2 || minY1 > maxY2) {
            return false;
        }

        return true;
    };

    PhysicsEngine.prototype.AABBOBB = function (AABB, OBB) {
        var newOBB = this.getOBBFromAABB(AABB);

        return this.OBBOBB(newOBB, OBB);
    };

    PhysicsEngine.prototype.AABBKDop = function (AABB, KDop) {
        var newOBB = this.getOBBFromAABB(AABB);

        return this.OBBKDop(newOBB, KDop);
    };

    PhysicsEngine.prototype.AABBPoint = function (AABB, point) {
        var p1 = AABB.physicsComponents['data'].p1;
        var p2 = AABB.physicsComponents['data'].p2;

        if (point.x < p1.x && point.x > p2.x) {
            return false;
        }

        if (point.y < p1.y && point.y > p2.y) {
            return false;
        }

        return true;
    };

    PhysicsEngine.prototype.OBBCircle = function (OBB, circle) {
        return this.CircleOBB(circle, OBB);
    };

    PhysicsEngine.prototype.OBBAABB = function (OBB, AABB) {
        return this.AABBOBB(AABB, OBB);
    };

    PhysicsEngine.prototype.OBBOBB = function (OBB1, OBB2) {
        var axis = [];
        axis.push(OBB1.physicsComponents['data'].vector.normalize());
        axis.push(axis[0].normal());
        axis.push(OBB2.physicsComponents['data'].vector.normalize());
        axis.push(axis[2].normal());

        return this.SATTheorem(axis,
            OBB1.graphicsComponents['rendering'].points,
            OBB2.graphicsComponents['rendering'].points);
    };

    PhysicsEngine.prototype.OBBKDop = function (OBB, KDop) {
        var axis = [];
        axis.push(OBB.physicsComponents['data'].vector.normalize());
        axis.push(axis[0].normal());
        axis=axis.concat(KDop.physicsComponents['data'].axis);

        return this.SATTheorem(axis, OBB.graphicsComponents['rendering'].points,
            KDop.graphicsComponents['rendering'].points);
    };

    PhysicsEngine.prototype.OBBPoint = function (OBB, point) {
        var vectorNormalized = OBB.physicsComponents['data'].vector.normalize();

        var points = OBB.graphicsComponents['rendering'].points;
        var p1 = points[0], p2 = points[2];
        var p = new P(point.physicsComponents['data'].point.x,
            point.physicsComponents['data'].point.y);

        var p1DotNormalize = vectorNormalized.dot(p1);
        var p2DotNormalize = vectorNormalized.dot(p2);
        var pDotNormalize = vectorNormalized.dot(p);

        if (pDotNormalize < Math.min(p1DotNormalize, p2DotNormalize)
            || pDotNormalize > Math.max(p1DotNormalize, p2DotNormalize)) {
            return false;
        }

        var vectorNormal = vectorNormalized.normal();
        var p1DotNormal = vectorNormal.dot(p1);
        var p2DotNormal = vectorNormal.dot(p2);
        var pDotNormal = vectorNormal.dot(p);

        if (pDotNormal < Math.min(p1DotNormal, p2DotNormal)
            || pDotNormal > Math.max(p1DotNormal, p2DotNormal)) {
            return false;
        }


        return true;
    };

    PhysicsEngine.prototype.KDopCircle = function (KDop, circle) {
        return this.CircleKDop(circle, KDop);
    };

    PhysicsEngine.prototype.KDopAABB = function (KDop, AABB) {
        return this.AABBKDop(AABB, KDop);
    };

    PhysicsEngine.prototype.KDopOBB = function (KDop, OBB) {
        return this.OBBKDop(OBB, KDop);
    };

    PhysicsEngine.prototype.KDopKDop = function (KDop1, KDop2) {
        var KDopPhysics1 = KDop1.physicsComponents['data'];
        var KDopPhysics2 = KDop2.physicsComponents['data'];
        var axis = KDopPhysics1.axis;
        axis.concat(KDopPhysics2.axis);

        if (KDopPhysics1.k == KDopPhysics2.k) {
            var size = KDopPhysics1.axis.length;

            for (var i = 0; i < size; i++) {
                if (KDopPhysics1.axis[i].equals(KDopPhysics2.axis[i])) {

                    return this.SATTheorem(axis,
                        KDop1.graphicsComponents['rendering'].points,
                        KDop2.graphicsComponents['rendering'].points);
                }
            }

            for (var i = 0; i < KDopPhysics1.k/2; i++) {
                if (KDopPhysics1.min[i] > KDopPhysics2.max[i]
                    || KDopPhysics1.max[i] < KDopPhysics2.min[i]) {
                    return false;
                }

                return true;
            }

        }

        return this.SATTheorem(axis,
            KDop1.graphicsComponents['rendering'].points,
            KDop2.graphicsComponents['rendering'].points);
    };

    PhysicsEngine.prototype.KDopPoint = function (KDop, point) {
        var min = KDop.physicsComponents['data'].min;
        var max = KDop.physicsComponents['data'].max;
        var axis = KDop.physicsComponents['data'].axis;
        var size = axis.length;
        var x = point.physicsComponents['data'].point.x;
        var y = point.physicsComponents['data'].point.y;

        for (var i = 0; i < size; i++) {
            var value = axis[i].x * x + axis[i].y * y;

            if (value < min[i] || value > max[i]) {
                return false;
            }
        }

        return true;
    };

    PhysicsEngine.prototype.PointCircle = function (point, circle) {
        return this.CirclePoint(circle, point);
    };

    PhysicsEngine.prototype.PointAABB = function (point, AABB) {
        return this.AABBPoint(AABB, point);
    };

    PhysicsEngine.prototype.PointOBB = function (point, OBB) {
        return this.OBBPoint(OBB, point);
    };

    PhysicsEngine.prototype.PointKDop = function (point, KDop) {
        return this.KDopPoint(KDop, point);
    };

    PhysicsEngine.prototype.PointPoint = function (point1, point2) {
        if (point1.physicsComponents['data'].point.x
            != point2.physicsComponents['data'].point.x) {
            return false;
        }

        if (point1.physicsComponents['data'].point.y
            != point2.physicsComponents['data'].point.y) {
            return false;
        }

        return true;
    };

    PhysicsEngine.prototype.CircleEdge = function (circle, edge) {
        var circleCenter = circle.physicsComponents['data'].center;
        var radius = circle.physicsComponents['data'].radius;
        var p1 = edge.p1;
        var p2 = edge.p2;

        var distance1 = new V(circleCenter.x - p1.x, circleCenter.y - p1.y);
        var distance2 = new V(circleCenter.x - p2.x, circleCenter.y - p2.y);

        if (distance1.lengthSquare() < radius*radius
            || distance2.lengthSquare() < radius*radius) {
            return true;
        }

        var edgeNormal = edge.normal();
        var edgeNormalize = edge.normalize();
        var p1DotNormal = edgeNormal.dot(p1);
        var p1DotNormalize = edgeNormalize.dot(p1);
        var p2DotNormalize = edgeNormalize.dot(p2);
        var circleCenterNormal = edgeNormal.dot(circleCenter);
        var circleCenterNormalize = edgeNormalize.dot(circleCenter);

        if (Math.abs(circleCenterNormal - p1DotNormal) > radius) {
            return false;
        }

        if (circleCenterNormalize< Math.max(p1DotNormalize, p2DotNormalize)
            && circleCenterNormalize > Math.min(p1DotNormalize, p2DotNormalize)
            && circleCenterNormalize - Math.min(p1DotNormalize, p2DotNormalize)
            > radius
            && circleCenterNormalize - Math.max(p1DotNormalize, p2DotNormalize)
            < radius) {
            return true;
        }

        return false;
    }

    PhysicsEngine.prototype.EdgeCircle = function (edge, circle) {
        return this.CircleEdge(circle, edge);
    }

    PhysicsEngine.prototype.getEdges = function (points) {
        var edges = [];
        var size = points.length;

        if (points.length < 1) {
            return null;
        }

        for (var i = 1; i < size; i++) {
            edges.push(new E(points[i-1], points[i]));
        }

        edges.push(new E(points[size-1], points[0]));

        return edges;
    }

    PhysicsEngine.prototype.SATTheorem = function (axis, points1, points2) {
        var size = axis.length;
        var size1 = points1.length;
        var size2 = points2.length;
        var min1 = Infinity, min2 = Infinity;
        var max1 = -Infinity, max2 = -Infinity;
        var value;

        for (var i = 0; i < size; i++) {
            min1 = Infinity;
            min2 = Infinity;
            max1 = -Infinity;
            max2 = -Infinity;

            for (var j = 0; j < size1; j++) {
                value = points1[j].x * axis[i].x + points1[j].y * axis[i].y;

                if (value > max1) {
                    max1 = value;
                }

                if (value < min1) {
                    min1 = value;
                }
            }

            for (var j = 0; j < size2; j++) {
                value = points2[j].x * axis[i].x + points2[j].y * axis[i].y;

                if (value > max2) {
                    max2 = value;
                }

                if (value < min2) {
                    min2 = value;
                }
            }

            if (min1 > max2 || min2 > max1) {
                return false;
            }
        }

        return true;
    };

    PhysicsEngine.prototype.getOBBFromAABB = function (AABB) {
        var p1 = AABB.physicsComponents['data'].p1;
        var p2 = AABB.physicsComponents['data'].p2;
        var width = p2.x - p1.x;
        var length = p2.y - p1.y;
        var vector = new V(1, 0);
        var center = new P((p1.x +p2.x)/2, (p1.y +p2.y)/2);

        return new OBBObject(center, vector, width, length);
    };

    PhysicsEngine.prototype.createCollisionsHashmap = function () {
        this.computeCollisions = [];
        this.computeCollisions['CircleObjectCircleObject']
            = this.CircleCircle.bind(this);
        this.computeCollisions['CircleObjectAABBObject']
            = this.CircleAABB.bind(this);
        this.computeCollisions['CircleObjectOBBObject']
            = this.CircleOBB.bind(this);
        this.computeCollisions['CircleObjectKDopObject']
            = this.CircleKDop.bind(this);
        this.computeCollisions['CircleObjectPointObject']
            = this.CirclePoint.bind(this);
        this.computeCollisions['AABBObjectCircleObject']
            = this.AABBCircle.bind(this);
        this.computeCollisions['AABBObjectAABBObject']
            = this.AABBAABB.bind(this);
        this.computeCollisions['AABBObjectOBBObject']
            = this.AABBOBB.bind(this);
        this.computeCollisions['AABBObjectKDopObject']
            = this.AABBKDop.bind(this);
        this.computeCollisions['AABBObjectPointObject']
            = this.AABBPoint.bind(this);
        this.computeCollisions['OBBObjectCircleObject']
            = this.OBBCircle.bind(this);
        this.computeCollisions['OBBObjectAABBObject']
            = this.OBBAABB.bind(this);
        this.computeCollisions['OBBObjectOBBObject']
            = this.OBBOBB.bind(this);
        this.computeCollisions['OBBObjectKDopObject']
            = this.OBBKDop.bind(this);
        this.computeCollisions['OBBObjectPointObject']
            = this.OBBPoint.bind(this);
        this.computeCollisions['KDopObjectCircleObject']
            = this.KDopCircle.bind(this);
        this.computeCollisions['KDopObjectAABBObject']
            = this.KDopAABB.bind(this);
        this.computeCollisions['KDopObjectOBBObject']
            = this.KDopOBB.bind(this);
        this.computeCollisions['KDopObjectKDopObject']
            = this.KDopKDop.bind(this);
        this.computeCollisions['KDopObjectPointObject']
            = this.KDopPoint.bind(this);
        this.computeCollisions['PointObjectCircleObject']
            = this.PointCircle.bind(this);
        this.computeCollisions['PointObjectAABBObject']
            = this.PointAABB.bind(this);
        this.computeCollisions['PointObjectOBBObject']
            = this.PointOBB.bind(this);
        this.computeCollisions['PointObjectKDopObject']
            = this.PointKDop.bind(this);
        this.computeCollisions['PointObjectPointObject']
            = this.PointPoint.bind(this);
        this.computeCollisions['CircleObjectEdge'] = this.CircleEdge.bind(this);
        this.computeCollisions['EdgeCircleObject'] = this.EdgeCircle.bind(this);
    };

    return PhysicsEngine;
});
