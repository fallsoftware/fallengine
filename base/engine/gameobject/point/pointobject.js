define(['GameObject', 'PointPhysicsComponent'], function (GameObject,
    PointPhysicsComponent) {
    'use strict';

    function Point(x, y) {
        GameObject.call(this);
        //this.addGraphicsComponent(new PointGraphicsComponent(this));
        this.addPhysicsComponent(new PointPhysicsComponent(this, x, y));
    }

    Point.prototype = Object.create(GameObject.prototype);
    Point.prototype.constructor = Point;

    return Point;
});
