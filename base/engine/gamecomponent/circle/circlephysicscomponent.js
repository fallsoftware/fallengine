define(['PhysicsComponent'], function (PhysicsComponent) {
    'use strict';

    function CirclePhysicsComponent(gameObject, x, y, radius, startingAngle,
        endingAngle, counterClockwise) {
        PhysicsComponent.call(this, gameObject);

        this.x = x;
        this.y = y;
        this.radius = radius;

        if (startingAngle !== null || startingAngle !== undefined) {
            this.startingAngle = startingAngle;
        } else {
            this.startingAngle = 0;
        }

        if (endingAngle !== null || endingAngle !== undefined) {
            this.endingAngle = endingAngle;
        } else {
            this.endingAngle = Math.PI * 2;
        }

        if (counterClockwise !== null || counterClockwise !== undefined) {
            this.counterClockwise = counterClockwise;
        } else {
            this.counterClockwise = false;
        }
    }

    CirclePhysicsComponent.prototype
        = Object.create(PhysicsComponent.prototype);
    CirclePhysicsComponent.prototype.constructor = CirclePhysicsComponent;

    CirclePhysicsComponent.prototype.update = function (context) {

    };

    return CirclePhysicsComponent;
});
