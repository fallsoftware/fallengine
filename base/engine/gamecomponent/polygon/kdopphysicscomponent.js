define(['jQuery', 'observer', 'PhysicsComponent'], function ($, observer,
    PhysicsComponent) {
    'use strict';

    function KDopPhysicsComponent(gameObject, points) {
        PhysicsComponent.call(this, gameObject);

        this.graphicsComponent = gameObject.graphicsComponents[0]; // not generic
        this.computePoints();
    }

    KDopPhysicsComponent.prototype.computePoints = function () {
        this.graphicsComponent.points = [];
    };

    KDopPhysicsComponent.prototype =
        Object.create(PhysicsComponent.prototype);
    KDopPhysicsComponent.prototype.constructor = KDopPhysicsComponent;

    KDopPhysicsComponent.prototype.update = function (context) {

    };

    return KDopPhysicsComponent;
});
