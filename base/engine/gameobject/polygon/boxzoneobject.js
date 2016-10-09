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

        if (position.x > this.right || position.x < this.left) {
            speed.x = -speed.x;
            ifContains = false;
        }

        if (position.y > this.bottom || position.y < this.top) {
            speed.y = -speed.y;
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

        if (right > this.right || left < this.left) {
            speed.x = -speed.x;
            ifContains = false;
        }

        if (bottom > this.bottom || top < this.top) {
            speed.y = -speed.y;
            ifContains = false;
        }

        return ifContains;
    };

    BoxZoneObject.prototype.containsAABB = function (AABB) {
    };

    BoxZoneObject.prototype.containsOBB = function (OBB) {
    };

    BoxZoneObject.prototype.containsKDop = function (KDop) {
    };

    return BoxZoneObject;
});
