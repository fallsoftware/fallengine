define(['jQuery', 'observer', 'GraphicsComponent'], function ($, observer,
    GraphicsComponent) {
    'use strict';

    function RectangleGraphicsComponent(gameObject, fillStyle, backgroundSrc,
        paddingX, paddingY) {
        GraphicsComponent.call(this, gameObject);
        this.fillStyle = fillStyle;
        this.backgroundSrc = backgroundSrc;
        this.paddingX = paddingX;
        this.paddingY = paddingY;
        // not generic:
        this.rectangleData = this.gameObject.physicsComponents[0];
    }

    RectangleGraphicsComponent.prototype =
        Object.create(GraphicsComponent.prototype);
    RectangleGraphicsComponent.prototype.constructor =
        RectangleGraphicsComponent;

    RectangleGraphicsComponent.prototype.draw = function (context) {
        context.beginPath();

        if (this.rectangleData.angle !== null) {
            this.rotate(context, this.rectangleData.angle,
                this.rectangleData.x+this.rectangleData.width/2,
                this.rectangleData.y+this.rectangleData.width/2);
        }

        context.rect(this.rectangleData.x, this.rectangleData.y,
            this.rectangleData.width, this.rectangleData.height);
        context.closePath();
        context.fill();
    }

    RectangleGraphicsComponent.prototype.drawImage = function (context) {
        var background = new Image();

        background.src = this.backgroundSrc;
        background.onload = (function() {
            this.draw(context);
            context.clip();

            var ratio = this.getRatio(background);

            context.drawImage(background,
                this.rectangleData.x+this.rectangleData.width/2-
                    (background.width*ratio)/2+this.paddingX/2,
                this.rectangleData.y
                    +this.rectangleData.height/2-(background.height*ratio)/2+
                    this.paddingY/2,
                background.width*ratio-this.paddingX,
                background.height*ratio-this.paddingY);
                context.restore();
        }).bind(this);
    }

    RectangleGraphicsComponent.prototype.getRatio = function (background) {
        var maxRectangleLength =
            Math.min(this.rectangleData.width, this.rectangleData.height);
        var maxImageLength = Math.max(background.width, background.height);
        var ratio = 1;

        if (maxImageLength > maxRectangleLength) {
            ratio = maxRectangleLength / maxImageLength;
        }

        return ratio;
    }

    RectangleGraphicsComponent.prototype.update = function (context) {
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

    return RectangleGraphicsComponent;
});
