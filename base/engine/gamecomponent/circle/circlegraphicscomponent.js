define(['GraphicsComponent'], function (GraphicsComponent) {
    'use strict';

    function CircleGraphicsComponent(gameObject, fillStyle, backgroundSrc,
        paddingX, paddingY) {
        GraphicsComponent.call(this, gameObject);
        this.fillStyle = fillStyle;
        this.backgroundSrc = backgroundSrc;
        this.paddingX = paddingX;
        this.paddingY = paddingY;
        this.circleData = this.gameObject.physicsComponents['data'];
        if (this.backgroundSrc !== null && this.backgroundSrc !== undefined &&
            this.backgroundSrc !== '') {
            this.background = new Image();
            this.background.onload = (function() {
            }).bind(this);
            this.background.src = this.backgroundSrc;
            this.getRatio();
        }
    };

    CircleGraphicsComponent.prototype
        = Object.create(GraphicsComponent.prototype);
    CircleGraphicsComponent.prototype.constructor = CircleGraphicsComponent;

    CircleGraphicsComponent.prototype.draw = function (context) {
        context.beginPath();
        context.arc(this.circleData.center.x, this.circleData.center.y,
            this.circleData.radius, this.circleData.startingAngle,
            this.circleData.endingAngle, this.circleData.counterClockwise);
        context.closePath();
        context.fill();
    };

    CircleGraphicsComponent.prototype.drawBackground = function (context) {
        this.draw(context);
        context.clip();
        context.drawImage(this.background,
            this.circleData.center.x-this.circleData.radius+this.paddingX/2,
            this.circleData.center.y-this.circleData.radius+this.paddingY/2,
            this.background.width/this.ratio-this.paddingX,
            this.background.height/this.ratio-this.paddingY);
        context.restore();
    };

    CircleGraphicsComponent.prototype.getRatio = function () {
        var maxImageLength = Math.max(this.background.width,
            this.background.height);
        this.ratio =  maxImageLength / (this.circleData.radius*2);
    };

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
