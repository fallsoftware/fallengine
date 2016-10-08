define(['GameObject', 'PointPhysicsComponent', 'MovementComponent'],
    function (GameObject, PointPhysicsComponent, MovementComponent) {
    'use strict';

    function PointObject(x, y, speed) {
        GameObject.call(this);
        /*this.addGraphicsComponent(new PointGraphicsComponent(this), 
            'rendering');*/
        this.addPhysicsComponent(new PointPhysicsComponent(this, x, y), 'data');
        this.addPhysicsComponent(new MovementComponent(this, speed),
            'movement');
    }

    PointObject.prototype = Object.create(GameObject.prototype);
    PointObject.prototype.constructor = PointObject;

    return PointObject;
});
