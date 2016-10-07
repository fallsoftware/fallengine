define(['GameObject', 'PolygonGraphicsComponent', 'KDopPhysicsComponent'],
    function (GameObject, PolygonGraphicsComponent, KDopPhysicsComponent) {
    'use strict';

    function KDopObject(polygon, axis, fillStyle) {
        GameObject.call(this);

        this.addGraphicsComponent(new PolygonGraphicsComponent(this,
            fillStyle));
        this.addPhysicsComponent(new KDopPhysicsComponent(this, polygon, axis));

        if (fillStyle === null || fillStyle === undefined) {
            fillStyle = '#ECEFF1';
        }
    }

    KDopObject.prototype = Object.create(GameObject.prototype);
    KDopObject.prototype.constructor = KDopObject;

    return KDopObject;
});
