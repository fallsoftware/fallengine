define(['GameObject', 'CircleGraphicsComponent', 'CirclePhysicsComponent',
    'MovementComponent'], function (GameObject, CircleGraphicsComponent,
    CirclePhysicsComponent, MovementComponent) {
    'use strict';

    function CircleObject(center, radius, startingAngle, endingAngle,
        counterClockwise, speed, fillStyle) {
        GameObject.call(this);
        this.addPhysicsComponent(new CirclePhysicsComponent(this, center,
            radius, startingAngle, endingAngle, counterClockwise), 'data');
        this.addPhysicsComponent(new MovementComponent(this, speed),
            'movement');

        if (fillStyle === null || fillStyle === undefined) {
            fillStyle = '#eceff1';
        }

        this.addGraphicsComponent(new CircleGraphicsComponent(this, fillStyle),
            'rendering');
    }

    CircleObject.prototype = Object.create(GameObject.prototype);
    CircleObject.prototype.constructor = CircleObject;

    return CircleObject;
});
