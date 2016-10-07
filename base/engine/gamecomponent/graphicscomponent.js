define(['GameComponent'], function (GameComponent) {
    'use strict';

    function GraphicsComponent(gameObject) {
        GameComponent.call(this, gameObject);
    }

    GraphicsComponent.prototype = Object.create(GameComponent.prototype);
    GraphicsComponent.prototype.constructor = GraphicsComponent;

    return GraphicsComponent;
});
