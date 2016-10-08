define(['GraphicsComponent'], function (GraphicsComponent) {
    'use strict';

    function CircleGraphicsComponent(gameObject, fillStyle, backgroundSrc,
        paddingX, paddingY) {
        GraphicsComponent.call(this, gameObject);
        this.fillStyle = fillStyle;
        this.backgroundSrc = backgroundSrc;
        this.paddingX = paddingX;
        this.paddingY = paddingY;
        this.circleData = this.gameObject.physicsComponents['data']; // not generic
    }

    CircleGraphicsComponent.prototype
        = Object.create(GraphicsComponent.prototype);
    CircleGraphicsComponent.prototype.constructor = CircleGraphicsComponent;

    CircleGraphicsComponent.prototype.draw = function (context) {
        context.beginPath();
        context.arc(this.circleData.x, this.circleData.y,
            this.circleData.radius, this.circleData.startingAngle,
            this.circleData.endingAngle, this.circleData.counterClockwise);
        context.closePath();
        context.fill();
    }

    CircleGraphicsComponent.prototype.drawBackground = function (context) {
        var background = new Image();

        background.src = this.backgroundSrc;
        background.onload = (function() {
            this.draw(context);
            context.clip();

            var ratio = this.getRatio(background);

            context.drawImage(background,
                this.circleData.x-this.circleData.radius+this.paddingX/2,
                this.circleData.y-this.circleData.radius+this.paddingY/2,
                background.width/ratio-this.paddingX,
                background.height/ratio-this.paddingY);
            context.restore();
        }).bind(this);
    }

    CircleGraphicsComponent.prototype.getRatio = function (background) {
        var maxImageLength = Math.max(background.width, background.height);
        return maxImageLength / (this.circleData.radius*2);
    }

    CircleGraphicsComponent.prototype.update = function (context) {
        context.save();
        context.fillStyle = this.fillStyle;

        if (this.backgroundSrc !== null && this.backgroundSrc !== undefined &&
            this.backgroundSrc !== '') {
            this.drawBackground(context);
        } else {
            this.draw(context);
            context.restore();
        }
    };

    return CircleGraphicsComponent;
});
