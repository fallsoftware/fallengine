define(['jQuery', 'observer', 'GraphicsComponent'], function ($, observer,
    GraphicsComponent) {
    'use strict';

    function PolygonGraphicsComponent(gameObject, fillStyle, backgroundSrc,
        paddingX, paddingY) {
        GraphicsComponent.call(this, gameObject);
        this.fillStyle = fillStyle;
        this.backgroundSrc = backgroundSrc;
        this.paddingX = paddingX;
        this.paddingY = paddingY;
        // not generic:
        this.polygonData = this.gameObject.physicsComponents[0];
    }

    PolygonGraphicsComponent.prototype =
        Object.create(GraphicsComponent.prototype);
    PolygonGraphicsComponent.prototype.constructor =
        PolygonGraphicsComponent;

    PolygonGraphicsComponent.prototype.drawPolygon = function (context) {
        var points = this.polygonData.points;
        var pointsSize = points.length;

        context.moveTo(points[0][0], points[0][1]);

        for (var i = 1; i < pointsSize; i++) {
            context.lineTo(points[i][0], points[i][1]);
        }
    }

    PolygonGraphicsComponent.prototype.draw = function (context) {
        context.beginPath();

        if (this.polygonData.angle !== null) {
            /*this.rotate(context, this.rectangleData.angle,
                this.rectangleData.x+this.rectangleData.width/2,
                this.rectangleData.y+this.rectangleData.width/2);*/
        }

        this.drawPolygon(context);

        context.closePath();
        context.fill();
    }

    PolygonGraphicsComponent.prototype.drawImage = function (context) {
        var background = new Image();

        background.src = this.backgroundSrc;
        background.onload = (function() {
            this.draw(context);
            context.clip();

            //var ratio = this.getRatio(background);

            /*context.drawImage(background,
                this.rectangleData.x+this.rectangleData.width/2-
                    (background.width*ratio)/2+this.paddingX/2,
                this.rectangleData.y
                    +this.rectangleData.height/2-(background.height*ratio)/2+
                    this.paddingY/2,
                background.width*ratio-this.paddingX,
                background.height*ratio-this.paddingY);*/
                context.restore();
        }).bind(this);
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

        if (this.backgroundSrc !== null && this.backgroundSrc !== undefined &&
            this.backgroundSrc !== '') {
            this.drawImage(context);
        } else {
            this.draw(context);
            context.restore();
        }
    };

    return PolygonGraphicsComponent;
});
