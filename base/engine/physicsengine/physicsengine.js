define(['Point', 'Vector', 'KDopObject', 'MathUtils'], function (P, V,
    KDopObject, M) {
    'use strict';

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

    PhysicsEngine.prototype.CircleEdge = function (circle, edge) {
        var circleCenter = new P(circle.physicsComponents[0].x,
            circle.physicsComponents[0].y);
        var radius = circle.physicsComponents[0].radius;
        var p1 = edge.physicsComponents[0].p1;
        var p2 = edge.physicsComponents[0].p2;

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
        this.CircleEdge(circle, edge);
    }

    PhysicsEngine.prototype.CircleOBB = function (circle, OBB) {

    };

    PhysicsEngine.prototype.CircleKDop = function (circle, KDop) {

    };

    PhysicsEngine.prototype.AABBCircle = function (AABB, circle) {
        this.CircleAABB(circle, AABB);
    };

    PhysicsEngine.prototype.AABBAABB = function (AABB1, AABB2) {

    };

    PhysicsEngine.prototype.AABBOBB = function (AABB, OBB) {

    };

    PhysicsEngine.prototype.AABBKDop = function (AABB, KDop) {

    };

    PhysicsEngine.prototype.OBBCircle = function (OBB, circle) {
        this.CircleOBB(circle, OBB);
    };

    PhysicsEngine.prototype.OBBAABB = function (OBB, AABB) {
        this.AABBOBB(AABB, OBB);
    };

    PhysicsEngine.prototype.OBBOBB = function (OBB1, OBB2) {

    };

    PhysicsEngine.prototype.OBBKDop = function (OBB, KDop) {

    };

    PhysicsEngine.prototype.KDopCircle = function (KDop, circle) {
        this.CircleKDop(circle, KDop);
    };

    PhysicsEngine.prototype.KDopAABB = function (KDop, AABB) {
        this.AABBKDop(AABB, KDop);
    };

    PhysicsEngine.prototype.KDopOBB = function (KDop, OBB) {
        this.OBBKDop(OBB, KDop);
    };

    PhysicsEngine.prototype.KDopKDop = function (KDop1, KDop2) {

    };

    PhysicsEngine.prototype.createCollisionsHashmap = function () {
        this.computeCollisions = [];
        this.computeCollisions['CircleObjectCircleObject'] = this.CircleCircle;
        this.computeCollisions['CircleObjectAABBObject'] = this.CircleAABB;
        this.computeCollisions['CircleObjectOBBObject'] = this.CircleOBB;
        this.computeCollisions['CircleObjectKDopObject'] = this.CircleKDop;
        this.computeCollisions['AABBObjectCircleObject'] = this.AABBACircle;
        this.computeCollisions['AABBObjectAABBObject'] = this.AABBAABB;
        this.computeCollisions['AABBObjectOBBObject'] = this.AABBOBB;
        this.computeCollisions['AABBObjectKDopObject'] = this.AABBKDop;
        this.computeCollisions['OBBObjectCircleObject'] = this.OBBCircle;
        this.computeCollisions['OBBObjectAABBObject'] = this.OBBAABB;
        this.computeCollisions['OBBObjectOBBObject'] = this.OBBOBB;
        this.computeCollisions['OBBObjectKDopObject'] = this.OBBKDop;
        this.computeCollisions['KDopObjectCircleObject'] = this.KDopCircle;
        this.computeCollisions['KDopObjectAABBObject'] = this.KDopAABB;
        this.computeCollisions['KDopObjectOBBObject'] = this.KDopOBB;
        this.computeCollisions['KDopObjectKDopObject'] = this.KDopKDop;
    };

    return PhysicsEngine;
});
