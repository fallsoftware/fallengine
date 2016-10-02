define(['jQuery', 'observer', 'GameObject', 'CircleGraphicsComponent',
    'CirclePhysicsComponent'], function ($, observer, GameObject,
    CircleGraphicsComponent, CirclePhysicsComponent) {
    'use strict';

    function CircleObject(x, y, radius, startingAngle, endingAngle,
        counterClockwise, fillStyle, backgroundSrc, paddingX, paddingY) {
        GameObject.call(this);
        this.addPhysicsComponent(new CirclePhysicsComponent(this, x, y, radius,
            startingAngle, endingAngle, counterClockwise));

        if (fillStyle === null || fillStyle === undefined) {
            fillStyle = '#ECEFF1';
        }

        if (paddingX === null || paddingX === undefined) {
            paddingX = 0;
        }

        if (paddingY === null || paddingY === undefined) {
            paddingY = paddingX;
        }

        this.addGraphicsComponent(new CircleGraphicsComponent(this, fillStyle,
            backgroundSrc, paddingX, paddingY));
    }

    CircleObject.prototype = Object.create(GameObject.prototype);
    CircleObject.prototype.constructor = CircleObject;

    return CircleObject;
});
