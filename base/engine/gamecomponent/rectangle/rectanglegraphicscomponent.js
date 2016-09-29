define(['jQuery', 'observer', 'GameComponent'], function ($, observer,
    GameComponent) {
    'use strict';

    function RectangleGraphicsComponent(gameObject, fillStyle, paddingX, paddingY) {
        GameComponent.call(this, gameObject);
        this.fillStyle = fillStyle;
        this.paddingX = paddingX;
        this.paddingY = paddingY;
        // not generic:
        this.rectangleData = this.gameObject.physicsComponents[0];
    }

    RectangleGraphicsComponent.prototype =
        Object.create(GameComponent.prototype);
    RectangleGraphicsComponent.prototype.constructor =
        RectangleGraphicsComponent;

    RectangleGraphicsComponent.prototype.update = function (context) {
        var background = new Image();

        background.src =
            '../engine/gamecomponent/circle/elements/background.png';
        background.onload = (function() {
            context.save();
            context.fillStyle = this.fillStyle;
            context.beginPath();

            if (this.rectangleData.angle !== null) {
                context.translate(
                    this.rectangleData.x+this.rectangleData.width/2,
                    this.rectangleData.y+this.rectangleData.width/2);
                context.rotate(this.rectangleData.angle);
                context.translate(
                    -this.rectangleData.x-this.rectangleData.width/2,
                    -this.rectangleData.y-this.rectangleData.width/2);
            }

            context.rect(this.rectangleData.x, this.rectangleData.y,
                this.rectangleData.width, this.rectangleData.height);
            context.closePath();
            context.fill();
            context.clip();

            this.paddingX = 0;
            this.paddingY = 0;

            var maxRectangleLength =
                Math.min(this.rectangleData.width, this.rectangleData.height);
            var maxImageLength = Math.max(background.width, background.height);
            var ratio = 1;

            if (maxImageLength > maxRectangleLength) {
                ratio = maxRectangleLength / maxImageLength;
            }


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
    };

    return RectangleGraphicsComponent;
});
