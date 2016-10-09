define(['GameObject', 'PolygonGraphicsComponent', 'KDopPhysicsComponent',
    'MovementComponent'], function (GameObject, PolygonGraphicsComponent,
    KDopPhysicsComponent, MovementComponent) {
    'use strict';

    function KDopObject(polygon, axis, speed, fillStyle, min, max) {
        GameObject.call(this);

        if (fillStyle === null || fillStyle === undefined) {
            fillStyle = '#eceff1';
        }

        this.addGraphicsComponent(new PolygonGraphicsComponent(this,
            fillStyle), 'rendering');
        this.addPhysicsComponent(new KDopPhysicsComponent(this, polygon, axis,
            min, max), 'data');
        this.addPhysicsComponent(new MovementComponent(this, speed),
            'movement');
    }

    KDopObject.prototype = Object.create(GameObject.prototype);
    KDopObject.prototype.constructor = KDopObject;

    return KDopObject;
});
