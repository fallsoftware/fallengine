define(['jQuery', 'observer', 'GameObject', 'PolygonGraphicsComponent',
    'KDopPhysicsComponent'], function ($, observer, GameObject,
    PolygonGraphicsComponent, KDopPhysicsComponent) {
    'use strict';

    function KDopObject(points, fillStyle) {
        GameObject.call(this);
        this.addPhysicsComponent(new KDopPhysicsComponent(this, points,
            angle));

        if (fillStyle === null || fillStyle === undefined) {
            fillStyle = '#ECEFF1';
        }

        this.addGraphicsComponent(new PolygonGraphicsComponent(this,
            fillStyle));
    }

    KDopObject.prototype = Object.create(GameObject.prototype);
    KDopObject.prototype.constructor = KDopObject;

    return KDopObject;
});
