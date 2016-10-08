define(['GameObject', 'PointPhysicsComponent', 'MovementComponent', 'Vector'],
    function (GameObject, PointPhysicsComponent, MovementComponent, V) {
    'use strict';

    function PointObject(point, speed=new V(0, 0)) {
        GameObject.call(this);
        /*this.addGraphicsComponent(new PointGraphicsComponent(this),
            'rendering');*/
        this.addPhysicsComponent(new PointPhysicsComponent(this, point),
            'data');
        this.addPhysicsComponent(new MovementComponent(this, speed),
            'movement');
        this.x = point.x;
        this.y = point.y;
    }

    PointObject.prototype = Object.create(GameObject.prototype);
    PointObject.prototype.constructor = PointObject;

    return PointObject;
});
