define(['PhysicsComponent'], function (PhysicsComponent) {
    'use strict';

    function PointPhysicsComponent(gameObject, x, y) {
        PhysicsComponent.call(this, gameObject);
        this.x = x;
        this.y = y;

        //this.graphicsComponent = gameObject.graphicsComponent[0]; // not generic
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
