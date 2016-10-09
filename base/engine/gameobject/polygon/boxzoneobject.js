define(['GameObject', 'AABBObject', 'AABBPhysicsComponent'],
    function (GameObject, AABBObject, AABBPhysicsComponent) {
    'use strict';

    function BoxZoneObject(p1, p2) {
        GameObject.call(this);
        this.createContainerHashmap();
        this.addPhysicsComponent(new AABBPhysicsComponent(this, p1, p2),
            'data');
        this.top = this.physicsComponents['data'].p1.y;
        this.right = this.physicsComponents['data'].p2.x;
        this.bottom = this.physicsComponents['data'].p2.y;
        this.left = this.physicsComponents['data'].p1.x;
    }

    BoxZoneObject.prototype = Object.create(AABBObject.prototype);
    BoxZoneObject.prototype.constructor = BoxZoneObject;

    BoxZoneObject.prototype.contains = function (gameObject) {
        return this.checkIfContains[gameObject.constructor.name](gameObject);
    };

    BoxZoneObject.prototype.createContainerHashmap = function () {
        this.checkIfContains = [];
        this.checkIfContains['PointObject'] = this.containsPoint.bind(this);
        this.checkIfContains['CircleObject'] = this.containsCircle.bind(this);
        this.checkIfContains['AABBObject'] = this.containsAABB.bind(this);
        this.checkIfContains['OBBObject'] = this.containsOBB.bind(this);
        this.checkIfContains['KDopObject'] = this.containsKDop.bind(this);
    };

    BoxZoneObject.prototype.containsPoint = function (point) {
        var position = point.physicsComponents['data'].point;
        var speed = point.physicsComponents['movement'].speed;
        var ifContains = true;

        if (position.x > this.right) {
            speed.x = -Math.abs(speed.x);
            ifContains = false;
        }

        if (position.x < this.left){
            speed.x = Math.abs(speed.x);
            ifContains = false;
        }

        if (position.y > this.bottom) {
            speed.y = -Math.abs(speed.y)
            ifContains = false;
        }

        if (position.y < this.top) {
            speed.y = Math.abs(speed.y)
            ifContains = false;
        }

        return ifContains;
    };

    BoxZoneObject.prototype.containsCircle = function (circle) {
        var center = circle.physicsComponents['data'].center;
        var radius = circle.physicsComponents['data'].radius;
        var speed = circle.physicsComponents['movement'].speed;
        var left = center.x - radius;
        var right = center.x + radius;
        var top = center.y - radius;
        var bottom = center.y + radius;
        var ifContains = true;

        if (right > this.right) {
            speed.x = -Math.abs(speed.x);
            ifContains = false;
        }

        if (left < this.left) {
            speed.x = Math.abs(speed.x);
            ifContains = false;
        }

        if (bottom > this.bottom) {
            speed.y = -Math.abs(speed.y)
            ifContains = false;
        }

        if (top < this.top) {
            speed.y = Math.abs(speed.y)
            ifContains = false;
        }

        return ifContains;
    };

    BoxZoneObject.prototype.containsAABB = function (AABB) {
        var left = AABB.physicsComponents['data'].p1.x;
        var right = AABB.physicsComponents['data'].p2.x;
        var top = AABB.physicsComponents['data'].p1.y;
        var bottom = AABB.physicsComponents['data'].p2.y;
        var speed = AABB.physicsComponents['movement'].speed;
        var ifContains = true;

        if (right > this.right) {
            speed.x = -Math.abs(speed.x);
            ifContains = false;
        }

        if (left < this.left) {
            speed.x = Math.abs(speed.x);
            ifContains = false;
        }

        if (bottom > this.bottom) {
            speed.y = -Math.abs(speed.y)
            ifContains = false;
        }

        if (top < this.top) {
            speed.y = Math.abs(speed.y)
            ifContains = false;
        }

        return ifContains;
    };

    BoxZoneObject.prototype.containsOBB = function (OBB) {
        var points = OBB.graphicsComponents['rendering'].points;
        var size = points.length
        var right = -Infinity;
        var left = Infinity;
        var top = Infinity;
        var bottom = -Infinity;
        var speed = OBB.physicsComponents['movement'].speed;
        var ifContains = true;

        for (var i = 0; i < size; i++) {
            if (points[i].x < left) {
                left = points[i].x;
            }

            if (points[i].x > right) {
                right = points[i].x;
            }

            if (points[i].y < top) {
                top = points[i].y;
            }

            if (points[i].y > bottom) {
                bottom = points[i].y;
            }
        }

        if (right > this.right) {
            speed.x = -Math.abs(speed.x);
            ifContains = false;
        }

        if (left < this.left){
            speed.x = Math.abs(speed.x);
            ifContains = false;
        }

        if (bottom > this.bottom) {
            speed.y = -Math.abs(speed.y)
            ifContains = false;
        }

        if (top < this.top) {
            speed.y = Math.abs(speed.y)
            ifContains = false;
        }

        return ifContains;
    };

    BoxZoneObject.prototype.containsKDop = function (KDop) {
        var left = KDop.physicsComponents['data'].min[1];
        var right = KDop.physicsComponents['data'].max[1];
        var top = KDop.physicsComponents['data'].min[3];
        var bottom = KDop.physicsComponents['data'].max[3];
        var speed = KDop.physicsComponents['movement'].speed;
        var ifContains = true;

        if (right > this.right) {
            speed.x = -Math.abs(speed.x);
            ifContains = false;
        }

        if (left < this.left){
            speed.x = Math.abs(speed.x);
            ifContains = false;
        }

        if (bottom > this.bottom) {
            speed.y=-Math.abs(speed.y)
            ifContains = false;
        }

        if (top < this.top)
        {
            speed.y=Math.abs(speed.y)
            ifContains = false;
        }

        return ifContains;
    };

    return BoxZoneObject;
});
