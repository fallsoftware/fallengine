define(['jQuery', 'observer', 'GameComponent'], function ($, observer,
    GameComponent) {
    'use strict';

    function PhysicsComponent(gameObject) {
        GameComponent.call(this, gameObject);
    }

    PhysicsComponent.prototype = Object.create(GameComponent.prototype);
    PhysicsComponent.prototype.constructor = PhysicsComponent;

    return PhysicsComponent;
});
