define(['jQuery', 'observer', 'GameObject', 'RectangleGraphicsComponent',
    'RectanglePhysicsComponent', 'MovementComponent'], function ($, observer,
    GameObject, RectangleGraphicsComponent, RectanglePhysicsComponent,
    MovementComponent) {
    'use strict';

    function RectangleObject(x, y, width, height, speed, fillStyle) {
        GameObject.call(this);

        if (height === null || height === undefined) {
            height = width;
        }

        this.addPhysicsComponent(new RectanglePhysicsComponent(this, x, y,
            width, height));
        this.addPhysicsComponent(new MovementComponent(this, speed));

        if (fillStyle === null || fillStyle === undefined) {
            fillStyle = '#ECEFF1';
        }

        this.addGraphicsComponent(new RectangleGraphicsComponent(this,
            fillStyle));
    }

    RectangleObject.prototype = Object.create(GameObject.prototype);
    RectangleObject.prototype.constructor = RectangleObject;

    return RectangleObject;
});
