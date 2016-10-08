define(['jQuery', 'observer', 'GameObject', 'PolygonGraphicsComponent',
    'PolygonPhysicsComponent', 'MovementComponent'], function ($, observer,
    GameObject, PolygonGraphicsComponent, PolygonPhysicsComponent,
    MovementComponent) {
    'use strict';

    function PolygonObject(points, speed, fillStyle, angle, backgroundSrc,
        paddingX, paddingY) {
        GameObject.call(this);
        this.addPhysicsComponent(new PolygonPhysicsComponent(this, points,
            angle));
        this.addPhysicsComponent(new MovementComponent(this));

        if (fillStyle === null || fillStyle === undefined) {
            fillStyle = '#ECEFF1';
        }

        if (paddingX === null || paddingX === undefined) {
            paddingX = 0;
        }

        if (paddingY === null || paddingY === undefined) {
            paddingY = paddingX;
        }

        this.addGraphicsComponent(new PolygonGraphicsComponent(this, fillStyle,
            backgroundSrc, paddingX, paddingY));
    }

    PolygonObject.prototype = Object.create(GameObject.prototype);
    PolygonObject.prototype.constructor = PolygonObject;

    return PolygonObject;
});
