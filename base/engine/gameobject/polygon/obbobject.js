define(['jQuery', 'observer', 'GameObject', 'PolygonGraphicsComponent',
    'OBBPhysicsComponent'], function ($, observer, GameObject,
    PolygonGraphicsComponent, OBBPhysicsComponent) {
    'use strict';

    function OBBObject(point, vector, width, length, fillStyle) {
        GameObject.call(this);
        this.addPhysicsComponent(new OBBPhysicsComponent(this, point, vector,
            width, length));

        if (fillStyle === null || fillStyle === undefined) {
            fillStyle = '#ECEFF1';
        }

        this.addGraphicsComponent(new PolygonGraphicsComponent(this,
            fillStyle));
    }

    OBBObject.prototype = Object.create(GameObject.prototype);
    OBBObject.prototype.constructor = OBBObject;

    return OBBObject;
});
