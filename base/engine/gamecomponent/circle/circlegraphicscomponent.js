define(['GraphicsComponent'], function (GraphicsComponent) {
    'use strict';

    function CircleGraphicsComponent(gameObject, fillStyle) {
        GraphicsComponent.call(this, gameObject);
        this.fillStyle = fillStyle;
        this.circleData = this.gameObject.physicsComponents['data'];
    };

    CircleGraphicsComponent.prototype
        = Object.create(GraphicsComponent.prototype);
    CircleGraphicsComponent.prototype.constructor = CircleGraphicsComponent;

    CircleGraphicsComponent.prototype.draw = function (context) {
        context.save();
        context.fillStyle = this.fillStyle;
        context.beginPath();
        context.arc(this.circleData.center.x, this.circleData.center.y,
            this.circleData.radius, this.circleData.startingAngle,
            this.circleData.endingAngle, this.circleData.counterClockwise);
        context.closePath();
        context.fill();
        context.restore();
    };

    CircleGraphicsComponent.prototype.update = function (context) {
        this.draw(context);
    };

    return CircleGraphicsComponent;
});
