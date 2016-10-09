define(['GameObject', 'PointPhysicsComponent', 'PointGraphicsComponent',
    'MovementComponent', 'Vector'], function (GameObject,
    PointPhysicsComponent, PointGraphicsComponent, MovementComponent, V) {
    'use strict';

    function PointObject(point, speed=new V(0, 0), fillStyle) {
        GameObject.call(this);

        if (fillStyle === null || fillStyle === undefined) {
            fillStyle = '#ECEFF1';
        }

        this.addPhysicsComponent(new PointPhysicsComponent(this, point),
            'data');
        this.addGraphicsComponent(new PointGraphicsComponent(this, fillStyle),
            'rendering');
        this.addPhysicsComponent(new MovementComponent(this, speed),
            'movement');
    }

    PointObject.prototype = Object.create(GameObject.prototype);
    PointObject.prototype.constructor = PointObject;

    return PointObject;
});
