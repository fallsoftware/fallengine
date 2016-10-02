define(['jQuery', 'observer', 'GameObject', 'RectangleGraphicsComponent',
    'RectanglePhysicsComponent'], function ($, observer, GameObject,
    RectangleGraphicsComponent, RectanglePhysicsComponent) {
    'use strict';

    function RectangleObject(x, y, width, height, fillStyle) {
        GameObject.call(this);

        if (height === null || height === undefined) {
            height = width;
        }

        this.addPhysicsComponent(new RectanglePhysicsComponent(this, x, y,
            width, height));

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
