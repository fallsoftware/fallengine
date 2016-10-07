define(['GameComponent'], function (GameComponent) {
    'use strict';

    function PhysicsComponent(gameObject) {
        GameComponent.call(this, gameObject);
    }

    PhysicsComponent.prototype = Object.create(GameComponent.prototype);
    PhysicsComponent.prototype.constructor = PhysicsComponent;

    return PhysicsComponent;
});
