define(['jQuery', 'observer', 'GameObject', 'PolygonGraphicsComponent',
    'AABBPhysicsComponent'], function ($, observer, GameObject,
    PolygonGraphicsComponent, AABBPhysicsComponent) {
    'use strict';

    function AABBObject(p1, p2, fillStyle) {
        GameObject.call(this);

        if (fillStyle === null || fillStyle === undefined) {
            fillStyle = '#ECEFF1';
        }

        this.addGraphicsComponent(new PolygonGraphicsComponent(this,
            fillStyle));

        this.addPhysicsComponent(new AABBPhysicsComponent(this, p1, p2));
    }

    AABBObject.prototype = Object.create(GameObject.prototype);
    AABBObject.prototype.constructor = AABBObject;

    return AABBObject;
});
