define(['jQuery', 'observer', 'PhysicsComponent'], function ($, observer,
    PhysicsComponent) {
    'use strict';

    function PolygonPhysicsComponent(gameObject, points, angle) {
        PhysicsComponent.call(this, gameObject);

        this.points = points;
        this.angle = angle;
        this.findCentroid();
    }

    PolygonPhysicsComponent.prototype =
        Object.create(PhysicsComponent.prototype);
    PolygonPhysicsComponent.prototype.constructor = PolygonPhysicsComponent;

    PolygonPhysicsComponent.prototype.findCentroid = function () {

    };

    PolygonPhysicsComponent.prototype.update = function (context) {

    };

    return PolygonPhysicsComponent;
});
