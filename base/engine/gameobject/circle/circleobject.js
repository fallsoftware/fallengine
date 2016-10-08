define(['GameObject', 'CircleGraphicsComponent', 'CirclePhysicsComponent',
    'MovementComponent'], function (GameObject, CircleGraphicsComponent,
    CirclePhysicsComponent, MovementComponent) {
    'use strict';

    function CircleObject(center, radius, startingAngle, endingAngle,
        counterClockwise, speed, fillStyle, backgroundSrc, paddingX, paddingY) {
        GameObject.call(this);
        this.addPhysicsComponent(new CirclePhysicsComponent(this, center, radius,
            startingAngle, endingAngle, counterClockwise));
        this.addPhysicsComponent(new MovementComponent(this, speed));

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
