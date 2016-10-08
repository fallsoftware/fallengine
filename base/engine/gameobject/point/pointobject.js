define(['GameObject', 'PointPhysicsComponent', 'MovementComponent'],
    function (GameObject, PointPhysicsComponent, MovementComponent) {
    'use strict';

    function PointObject(x, y, speed) {
        GameObject.call(this);
        //this.addGraphicsComponent(new PointGraphicsComponent(this));
        this.addPhysicsComponent(new PointPhysicsComponent(this, x, y));
        this.addPhysicsComponent(new MovementComponent(this, speed));
    }

    PointObject.prototype = Object.create(GameObject.prototype);
    PointObject.prototype.constructor = PointObject;

    return PointObject;
});
