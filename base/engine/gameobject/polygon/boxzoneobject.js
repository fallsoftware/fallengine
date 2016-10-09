define(['AABBObject', 'AABBPhysicsComponent'], function (AABBObject,
    AABBPhysicsComponent) {
    'use strict';

    function BoxZoneObject(p1, p2) {
        AABBObject.call(this, p1, p2, null, null);
        this.createContainerHashmap();

        this.addPhysicsComponent(new AABBPhysicsComponent(this, p1, p2),
            'data');
    }

    BoxZoneObject.prototype = Object.create(AABBObject.prototype);
    BoxZoneObject.prototype.constructor = BoxZoneObject;

    BoxZoneObject.prototype.contains = function (gameObject) {
        this.checkIfContains[gameObject.constructor.name](gameObject);

        return true;
    };

    BoxZoneObject.prototype.createContainerHashmap = function () {
        this.checkIfContains = [];
        this.checkIfContains['PointObject'] = this.containsPoint.bind(this);
        this.checkIfContains['CircleObject'] = this.containsCircle.bind(this);
        this.checkIfContains['AABBObject'] = this.containsAABB.bind(this);
        this.checkIfContains['OBBObject'] = this.containsOBB.bind(this);
        this.checkIfContains['KDopObject'] = this.containsKDop.bind(this);
    };

    BoxZoneObject.prototype.containsPoint = function (gameObject) {
    };

    BoxZoneObject.prototype.containsCircle = function (gameObject) {
    };

    BoxZoneObject.prototype.containsAABB = function (gameObject) {
    };

    BoxZoneObject.prototype.containsOBB = function (gameObject) {
    };

    BoxZoneObject.prototype.containsKDop = function (gameObject) {
    };

    return BoxZoneObject;
});
