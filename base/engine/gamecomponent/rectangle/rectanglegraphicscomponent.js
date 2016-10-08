define(['GraphicsComponent'], function (GraphicsComponent) {
    'use strict';

    function RectangleGraphicsComponent(gameObject, fillStyle) {
        GraphicsComponent.call(this, gameObject);
        this.fillStyle = fillStyle;
        this.rectangleData = this.gameObject.physicsComponents['data'];
    }

    RectangleGraphicsComponent.prototype =
        Object.create(GraphicsComponent.prototype);
    RectangleGraphicsComponent.prototype.constructor =
        RectangleGraphicsComponent;

    RectangleGraphicsComponent.prototype.draw = function (context) {
        context.beginPath();
        context.rect(this.rectangleData.x, this.rectangleData.y,
            this.rectangleData.width, this.rectangleData.height);
        context.closePath();
        context.fill();
    }

    RectangleGraphicsComponent.prototype.update = function (context) {
        context.fillStyle = this.fillStyle;
        this.draw(context);
    };

    return RectangleGraphicsComponent;
});
