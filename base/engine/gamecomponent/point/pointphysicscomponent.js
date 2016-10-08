define(['PhysicsComponent'], function (PhysicsComponent) {
    'use strict';

    function PointPhysicsComponent(gameObject, point) {
        PhysicsComponent.call(this, gameObject);
        this.point = point;
    }

    PointPhysicsComponent.prototype =
        Object.create(PhysicsComponent.prototype);
    PointPhysicsComponent.prototype.constructor = PointPhysicsComponent;

    PointPhysicsComponent.prototype.update = function (context) {

    };

    PointPhysicsComponent.prototype.move = function (speed) {
        this.x += speed.x;
        this.y += speed.y;
    };

    return PointPhysicsComponent;
});
