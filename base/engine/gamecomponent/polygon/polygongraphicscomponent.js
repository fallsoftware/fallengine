define(['jQuery', 'observer', 'GraphicsComponent'], function ($, observer,
    GraphicsComponent) {
    'use strict';

    function PolygonGraphicsComponent(gameObject, fillStyle) {
        GraphicsComponent.call(this, gameObject);
        this.fillStyle = fillStyle;
        this.points = [];
        // not generic:
        //this.polygonData = this.gameObject.physicsComponents[0];
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

    PolygonGraphicsComponent.prototype.getRatio = function (background) {
        var maxRectangleLength =
            Math.min(this.rectangleData.width, this.rectangleData.height);
        var maxImageLength = Math.max(background.width, background.height);
        var ratio = 1;

        if (maxImageLength > maxRectangleLength) {
            ratio = maxRectangleLength / maxImageLength;
        }

        return ratio;
    }

    PolygonGraphicsComponent.prototype.update = function (context) {
        context.save();
        context.fillStyle = this.fillStyle;
        this.draw(context);
    };

    return PolygonGraphicsComponent;
});
