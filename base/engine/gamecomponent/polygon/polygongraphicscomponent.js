define(['GraphicsComponent'], function (GraphicsComponent) {
    'use strict';

    function PolygonGraphicsComponent(gameObject, fillStyle) {
        GraphicsComponent.call(this, gameObject);
        this.fillStyle = fillStyle;
        this.points = [];
    }

    PolygonGraphicsComponent.prototype =
        Object.create(GraphicsComponent.prototype);
    PolygonGraphicsComponent.prototype.constructor =
        PolygonGraphicsComponent;

    PolygonGraphicsComponent.prototype.drawPolygon = function (context) {
        var pointsSize = this.points.length;

        context.moveTo(this.points[0].x, this.points[0].y);

        for (var i = 1; i < pointsSize; i++) {
            context.lineTo(this.points[i].x, this.points[i].y);
        }
    }

    PolygonGraphicsComponent.prototype.draw = function (context) {
        context.beginPath();
        this.drawPolygon(context);
        context.closePath();
        context.fill();
    }

    PolygonGraphicsComponent.prototype.update = function (context) {
        context.save();
        context.fillStyle = this.fillStyle;
        this.draw(context);
    };

    return PolygonGraphicsComponent;
});
