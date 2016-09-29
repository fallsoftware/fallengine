define(['jQuery', 'observer', 'GameComponent'], function ($, observer,
    GameComponent) {
    'use strict';

    function RectanglePhysicsComponent(gameObject, x, y, width, height) {
        GameComponent.call(this, gameObject);

        this.x = x;
        this.y = y;
        this.width = width;

        if (height !== null || height !== undefined) {
            this.height = height;
        } else {
            this.height = this.width;
        }
    }

    RectanglePhysicsComponent.prototype =
        Object.create(GameComponent.prototype);
    RectanglePhysicsComponent.prototype.constructor = RectanglePhysicsComponent;

    RectanglePhysicsComponent.prototype.update = function (context) {

    };

    return RectanglePhysicsComponent;
});
