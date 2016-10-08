define(['GameObject', 'PointPhysicsComponent'], function (GameObject,
    PointPhysicsComponent) {
    'use strict';

    function PointObject(x, y) {
        GameObject.call(this);
        //this.addGraphicsComponent(new PointGraphicsComponent(this));
        this.addPhysicsComponent(new PointPhysicsComponent(this, x, y));
    }

    PointObject.prototype = Object.create(GameObject.prototype);
    PointObject.prototype.constructor = PointObject;

    return PointObject;
});
