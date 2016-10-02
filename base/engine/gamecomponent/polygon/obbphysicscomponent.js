define(['jQuery', 'observer', 'PhysicsComponent', 'PointObject'], function ($, observer,
    PhysicsComponent, P) {
    'use strict';

    function OBBPhysicsComponent(gameObject, point, vector, width, length) {
        PhysicsComponent.call(this, gameObject);

        this.graphicsComponent = gameObject.graphicsComponents[0]; // not generic
        this.computePoints();
    }

    OBBPhysicsComponent.prototype.computePoints = function () {
        this.graphicsComponent.points = [];
    };

    OBBPhysicsComponent.prototype =
        Object.create(PhysicsComponent.prototype);
    OBBPhysicsComponent.prototype.constructor = OBBPhysicsComponent;

    OBBPhysicsComponent.prototype.update = function (context) {

    };

    return OBBPhysicsComponent;
});
