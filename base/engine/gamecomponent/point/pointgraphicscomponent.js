define(['GraphicsComponent'], function (GraphicsComponent) {
    'use strict';

    function PointGraphicsComponent(gameObject, fillStyle) {
        GraphicsComponent.call(this, gameObject);
        this.fillStyle = fillStyle;
        this.pointData = this.gameObject.physicsComponents['data'].point;
    }

    PointGraphicsComponent.prototype
        = Object.create(GraphicsComponent.prototype);
    PointGraphicsComponent.prototype.constructor = PointGraphicsComponent;

    PointGraphicsComponent.prototype.draw = function (context) {
        context.beginPath();
        context.arc(this.pointData.x, this.pointData.y, 5, 0, Math.PI * 2,
            true);
        context.closePath();
        context.fill();
    };

    PointGraphicsComponent.prototype.update = function (context) {
        context.save();
        context.fillStyle = this.fillStyle;
        this.draw(context);
        context.restore();
    };

    return PointGraphicsComponent;
});
