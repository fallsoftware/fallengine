define(['jQuery', 'observer', 'GameComponent'], function ($, observer,
    GameComponent) {
    'use strict';

    function GraphicsComponent(gameObject) {
        GameComponent.call(this, gameObject);
    }

    GameComponent.prototype.rotate = function (context, angle, x, y) {
        context.translate(x, y);
        context.rotate(angle);
        context.translate(-x, -y);
    };

    GraphicsComponent.prototype = Object.create(GameComponent.prototype);
    GraphicsComponent.prototype.constructor = GraphicsComponent;

    return GraphicsComponent;
});
