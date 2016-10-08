define(['Point', 'Vector', 'KDopObject', 'MathUtils', 'Edge', 'PointObject',
    'OBBObject'], function (P, V, KDopObject, M, E, PointObject, OBBObject) {
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

    function PhysicsEngine(gameObjects) {
        this.gameObjects = gameObjects;
        this.createCollisionsHashmap();
    }

    PhysicsEngine.prototype = Object.create(Observer.prototype);
    PhysicsEngine.prototype.constructor = PhysicsEngine;

    PhysicsEngine.prototype.update = function () {
        var size = this.gameObjects.length,
            i = 0, j = 0;

        for (i = 0; i < size; i++) {
            for (j = i; j < size; j++) {
                if (i != j) this.computePhysics(this.gameObjects[i],
                    this.gameObjects[j]);
            }
        }
    };

    PhysicsEngine.prototype.computePhysics = function (gameObject1,
        gameObject2) {
        this.computeCollisions[gameObject1.constructor.name
            + gameObject2.constructor.name](gameObject1, gameObject2);
    };

    PhysicsEngine.prototype.CircleCircle = function (circle1, circle2) {
        var circle1Physics = circle1.physicsComponents[0];
        var circle2Physics = circle2.physicsComponents[0];
        var distance = (new V(circle2Physics.x-circle1Physics.x,
            circle2Physics.y-circle1Physics.y)).lengthSquare();
        var minDistance = (circle1Physics.radius + circle2Physics.radius)
            * (circle1Physics.radius + circle2Physics.radius);

        if (distance < minDistance) {
            return true;
        } else {
            return false;
        }
    };

    PhysicsEngine.prototype.CircleAABB = function (circle, AABB) {
        var circleCenter = new P(circle.physicsComponents[0].x,
            circle.physicsComponents[0].y);
        var radius = circle.physicsComponents[0].radius;
        var p1 = AABB.physicsComponents[0].p1;
        var p2 = AABB.physicsComponents[0].p2;

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
        var points = OBB.graphicsComponents[0].points;
        var center = new PointObject(circle.physicsComponents[0].x,
            circle.physicsComponents[0].y);

        if (this.OBBPoint(center, OBB)) {
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
        var points = KDop.graphicsComponents[0].points;
        var center = new PointObject(circle.physicsComponents[0].x,
            circle.physicsComponents[0].y);

        if (this.KDopPoint(center, KDop)) {
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
        var center circle.physicalComponents[0].center;
        var radius circle.physicalComponents[0].radius;
        var p = new P(point.pphysicalComponents[0].x,
            point.pphysicalComponents[0].y);

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
        var p11 = AABB1.physicalComponents[0].p1;
        var p21 = AABB1.physicalComponents[0].p2;
        var p12 = AABB2.physicalComponents[0].p1;
        var p22 = AABB2.physicalComponents[0].p2;

        var minX1 = Math.min(p11.x, p12.x);
        var maxX1 = Math.max(p11.x, p12.x);
        var minY1 = Math.min(p11.y, p12.y);
        var maxY1 = Math.max(p11.y, p12.y);

        var minX2 = Math.min(p21.x, p22.x);
        var maxX2 = Math.max(p21.x, p22.x);
        var minY2 = Math.min(p21.y, p22.y);
        var maxY2 = Math.max(p21.y, p22.y);

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
        var p1 = AABB.physicalComponents[0].p1;
        var p2 = AABB.physicalComponents[0].p2;

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
        axis.push(OBB1.physicalComponents[0].vector.normalize());
        axis.push(axis[0].normal());
        axis.push(OBB2.physicalComponents[0].vector.normalize());
        axis.push(axis[2].normal());

        return this.SATTheorem(axis, OBB1.graphicsComponents[0].points,
            OBB2.graphicsComponents[0].points);
    };

    PhysicsEngine.prototype.OBBKDop = function (OBB, KDop) {
        var axis = [];
        axis.push(OBB.physicalComponents[0].vector.normalize());
        axis.push(axis[0].normal());
        axis.concat(KDop.physicalComponents[0].axis);

        return this.SATTheorem(axis, OBB1.graphicsComponents[0].points,
            KDop.graphicsComponents[0].points);
    };

    PhysicsEngine.prototype.OBBPoint = function (OBB, point) {
        var vectorNormalized = OBB.physicsComponents[0].vector.normalize();

        var points = OBB.graphicsComponent[0].points;
        var p1 = points[0], p2 = points[2];
        var p = new P(point.physicsComponents[0].x,
            point.physicsComponents[0].y);

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
        var KDopPhysics1 = KDop1.physicalComponents[0];
        var KDopPhysics2 = KDop2.physicalComponents[0];
        var axis = KDopPhysics1.axis;
        axis.concat(KDopPhysics2.axis);

        if (KDopPhysics1.k == KDopPhysics2.k) {
            var size = KDopPhysics1.axis.length;

            for (var i = 0; i < size; i++) {
                if (KDopPhysics1.axis[i] != KDopPhysics2.axis[i]) {

                    return this.SATTheorem(axis,
                        KDop1.graphicsComponents[0].points,
                        KDop2.graphicsComponents[0].points);
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
            KDop1.graphicsComponents[0].points,
            KDop2.graphicsComponents[0].points);
    };

    PhysicsEngine.prototype.KDopPoint = function (KDop, point) {
        var min = KDop.physicalComponents[0].min;
        var max = KDop.physicalComponents[0].max;
        var axis = KDop.physicalComponents[0].axis;
        var size = axis.length;
        var x = point.physicalComponents[0].x
        var y = point.physicalComponents[0].y

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
        if (point1.physicalComponents[0].x != point2.physicalComponents[0].x) {
            return false;
        }

        if (point1.physicalComponents[0].y != point2.physicalComponents[0].y) {
            return false;
        }

        return true;
    };

    PhysicsEngine.prototype.CircleEdge = function (circle, edge) {
        var circleCenter = new P(circle.physicsComponents[0].x,
            circle.physicsComponents[0].y);
        var radius = circle.physicsComponents[0].radius;
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

        if (circleCenterNormalize - Math.min(p1DotNormalize, p2DotNormalize)
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

        edges.push(new E(points[size-1]), points[0]);

        return edges;
    }

    PhysicsEngine.prototype.SATTHeorem = function (axis, points1, points2) {
        var size = axis.length;
        var size1 = points1.length;
        var size2 = points2.length;
        var min1 = Infinity, min2 = Infinity;
        var max1 = -Infinity, max2 = -Infinity;
        var value;

        for (var i = 0; i < size; i++) {
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
    }

    PhysicsEngine.prototype.getOBBFromAABB = function (AABB) {
        var p1 = AABB.physicalComponents[0].p1;
        var p2 = AABB.physicalComponents[0].p2;
        var width = p2.x - p1.x;
        var length = p2.y - p1.y;
        var vector = new V(1, 0);
        var center = new P((p1.x +p2.x)/2), (p1.y +p2.y)/2));

        return new OBBOject(center, vector, width, length);
    }

    PhysicsEngine.prototype.createCollisionsHashmap = function () {
        this.computeCollisions = [];
        this.computeCollisions['CircleObjectCircleObject'] = this.CircleCircle;
        this.computeCollisions['CircleObjectAABBObject'] = this.CircleAABB;
        this.computeCollisions['CircleObjectOBBObject'] = this.CircleOBB;
        this.computeCollisions['CircleObjectKDopObject'] = this.CircleKDop;
        this.computeCollisions['CircleObjectPointObject'] = this.CirclePoint;
        this.computeCollisions['AABBObjectCircleObject'] = this.AABBACircle;
        this.computeCollisions['AABBObjectAABBObject'] = this.AABBAABB;
        this.computeCollisions['AABBObjectOBBObject'] = this.AABBOBB;
        this.computeCollisions['AABBObjectKDopObject'] = this.AABBKDop;
        this.computeCollisions['AABBObjectPointObject'] = this.AABBPoint;
        this.computeCollisions['OBBObjectCircleObject'] = this.OBBCircle;
        this.computeCollisions['OBBObjectAABBObject'] = this.OBBAABB;
        this.computeCollisions['OBBObjectOBBObject'] = this.OBBOBB;
        this.computeCollisions['OBBObjectKDopObject'] = this.OBBKDop;
        this.computeCollisions['OBBObjectPointObject'] = this.OBBPoint;
        this.computeCollisions['KDopObjectCircleObject'] = this.KDopCircle;
        this.computeCollisions['KDopObjectAABBObject'] = this.KDopAABB;
        this.computeCollisions['KDopObjectOBBObject'] = this.KDopOBB;
        this.computeCollisions['KDopObjectKDopObject'] = this.KDopKDop;
        this.computeCollisions['KDopObjectPointObject'] = this.KDopPoint;
        this.computeCollisions['PointObjectCircleObject'] = this.PointCircle;
        this.computeCollisions['PointObjectAABBObject'] = this.PointAABB;
        this.computeCollisions['PointObjectOBBObject'] = this.PointOBB;
        this.computeCollisions['PointObjectKDopObject'] = this.PointKDop;
        this.computeCollisions['PointObjectPointObject'] = this.PointPoint;
        this.computeCollisions['CircleObjectEdge'] = this.CircleEdge;
        this.computeCollisions['EdgeCircleObject'] = this.EdgeCircle;
    };

    return PhysicsEngine;
});
