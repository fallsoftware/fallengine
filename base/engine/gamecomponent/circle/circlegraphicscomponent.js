define(['jQuery', 'observer', 'GameComponent'], function ($, observer,
    GameComponent) {
    'use strict';

    function CircleGraphicsComponent(gameObject, fillStyle, paddingX, paddingY) {
        GameComponent.call(this, gameObject);
        this.fillStyle = '#eceff1';
        this.paddingX = 20;
        this.paddingY = 20;
        this.circleData = this.gameObject.physicsComponents[0]; // not generic
    }

    CircleGraphicsComponent.prototype = Object.create(GameComponent.prototype);
    CircleGraphicsComponent.prototype.constructor = CircleGraphicsComponent;

    /*Child.prototype = Object.create(Parent.prototype);
    Child.prototype.constructor = Child;
    Parent.call(this, name);*/

    CircleGraphicsComponent.prototype.update = function (context) {
        var background = new Image();

        background.src =
            '../engine/gamecomponent/circle/elements/background.png';
        background.onload = (function() {
            context.save();
            context.fillStyle = this.fillStyle;
            context.beginPath();
            context.arc(this.circleData.x, this.circleData.y,
                this.circleData.radius, this.circleData.startingAngle,
                this.circleData.endingAngle, this.circleData.counterClockwise);
            context.closePath();
            context.fill();
            context.clip();
            context.drawImage(background,
                this.circleData.x-this.circleData.radius+this.paddingX/2,
                this.circleData.y-this.circleData.radius+this.paddingY/2,
                this.circleData.radius*2-this.paddingX,
                this.circleData.radius*2-this.paddingY);
            context.restore();
        }).bind(this);
    };

    return CircleGraphicsComponent;
});
