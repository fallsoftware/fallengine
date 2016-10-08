define(['GameComponent', 'Vector'], function (GameComponent, V) {
    'use strict';

    function MovementComponent(gameObject, speed=new V(0, 0)) {
        GameComponent.call(this, gameObject);

        this.speed = speed;

        this.physics = gameObject.physicsComponents[0];
    }

    MovementComponent.prototype = Object.create(GameComponent.prototype);
    MovementComponent.prototype.constructor = MovementComponent;

    MovementComponent.prototype.update = function (context) {
        this.physics.move(this.speed);
    };

    MovementComponent.prototype.setSpeed = function (speed) {
        this.speed = speed;
    };

    MovementComponent.prototype.inverseSpeedX = function () {
        this.speed.x = -this.speed.x;
    };

    MovementComponent.prototype.inverseSpeedY = function () {
        this.speed.y = -this.speed.y;
    };

    return MovementComponent;
});
