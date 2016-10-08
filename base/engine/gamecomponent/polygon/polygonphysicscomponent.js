define(['PhysicsComponent'], function (PhysicsComponent) {
    'use strict';

    function PolygonPhysicsComponent(gameObject, points) {
        PhysicsComponent.call(this, gameObject);

        this.graphicsComponent = gameObject.graphicsComponents[0]; // not generic
        this.computePoints();
    }

    PolygonPhysicsComponent.prototype.computePoints = function () {
        this.graphicsComponent.points = [];
    };

    PolygonPhysicsComponent.prototype =
        Object.create(PhysicsComponent.prototype);
    PolygonPhysicsComponent.prototype.constructor = PolygonPhysicsComponent;

    PolygonPhysicsComponent.prototype.update = function (context) {

    };

    PolygonPhysicsComponent.prototype.move = function (speed) {
    
    };

    return PolygonPhysicsComponent;
});
