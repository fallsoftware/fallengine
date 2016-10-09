define(['PhysicsComponent'], function (PhysicsComponent) {
    'use strict';

    function CirclePhysicsComponent(gameObject, center, radius, startingAngle,
        endingAngle, counterClockwise) {
        PhysicsComponent.call(this, gameObject);

        this.center = center;
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

    CirclePhysicsComponent.prototype.update = function () {

    };

    CirclePhysicsComponent.prototype.move = function (speed) {
        this.center.x += speed.x;
        this.center.y += speed.y;
    };

    return CirclePhysicsComponent;
});
