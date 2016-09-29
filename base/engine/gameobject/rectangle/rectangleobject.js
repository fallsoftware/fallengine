define(['jQuery', 'observer', 'GameObject', 'RectangleGraphicsComponent',
    'RectanglePhysicsComponent'], function ($, observer, GameObject,
    RectangleGraphicsComponent, RectanglePhysicsComponent) {
    'use strict';

    function RectangleObject(x, y, width, height, angle, fillStyle, paddingX,
        paddingY) {
        GameObject.call(this);

        if (height === null || height === undefined) {
            height = width;
        }

        this.addPhysicsComponent(new RectanglePhysicsComponent(this, x, y,
            width, height, angle));

        if (fillStyle === null || fillStyle === undefined) {
            fillStyle = '#ECEFF1';
        }

        if (paddingX === null || paddingX === undefined) {
            paddingX = 0;
        }

        if (paddingY === null || paddingY === undefined) {
            paddingY = paddingX;
        }

        this.addGraphicsComponent(new RectangleGraphicsComponent(this,
            fillStyle, paddingX, paddingY));
    }

    RectangleObject.prototype = Object.create(GameObject.prototype);
    RectangleObject.prototype.constructor = RectangleObject;

    return RectangleObject;
});
