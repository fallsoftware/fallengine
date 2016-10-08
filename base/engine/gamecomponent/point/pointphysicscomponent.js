define(['PhysicsComponent'], function (PhysicsComponent) {
    'use strict';

    function PointPhysicsComponent(gameObject, x, y) {
        PhysicsComponent.call(this, gameObject);
        this.x = x;
        this.y = y;
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
