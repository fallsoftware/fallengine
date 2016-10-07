define(['GameObject', 'PolygonGraphicsComponent',
    'OBBPhysicsComponent'], function (GameObject,
    PolygonGraphicsComponent, OBBPhysicsComponent) {
    'use strict';

    function OBBObject(point, vector, width, length, fillStyle) {
        GameObject.call(this);

        this.addGraphicsComponent(new PolygonGraphicsComponent(this,
            fillStyle));
        
        this.addPhysicsComponent(new OBBPhysicsComponent(this, point, vector,
            width, length));

        if (fillStyle === null || fillStyle === undefined) {
            fillStyle = '#ECEFF1';
        }
    }

    OBBObject.prototype = Object.create(GameObject.prototype);
    OBBObject.prototype.constructor = OBBObject;

    return OBBObject;
});
