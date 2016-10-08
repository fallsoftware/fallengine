define(['GameObject', 'PolygonGraphicsComponent', 'AABBPhysicsComponent',
    'MovementComponent'], function (GameObject, PolygonGraphicsComponent,
    AABBPhysicsComponent, MovementComponent) {
    'use strict';

    function AABBObject(p1, p2, speed, fillStyle) {
        GameObject.call(this);

        if (fillStyle === null || fillStyle === undefined) {
            fillStyle = '#ECEFF1';
        }

        this.addGraphicsComponent(new PolygonGraphicsComponent(this,
            fillStyle), 'rendering');

        this.addPhysicsComponent(new AABBPhysicsComponent(this, p1, p2),
            'data');
        this.addPhysicsComponent(new MovementComponent(this, speed),
            'movement');
    }

    AABBObject.prototype = Object.create(GameObject.prototype);
    AABBObject.prototype.constructor = AABBObject;

    return AABBObject;
});
