define(['PhysicsComponent', 'Point'], function (PhysicsComponent, P) {
    'use strict';

    function OBBPhysicsComponent(gameObject, point, vector, width, length) {
        PhysicsComponent.call(this, gameObject);

        this.point = point;
        this.vector = vector;
        this.width = width;
        this.length = length;

        this.graphicsComponent = gameObject.graphicsComponents['rendering'];
        this.computePoints();
    }

    OBBPhysicsComponent.prototype =
        Object.create(PhysicsComponent.prototype);
    OBBPhysicsComponent.prototype.constructor = OBBPhysicsComponent;

    OBBPhysicsComponent.prototype.update = function (context) {

    };

    OBBPhysicsComponent.prototype.computePoints = function () {
        var points = [];
        var vectorN = this.vector.normalize();
        var vectorP = vectorN.normal();

        points[0] = new P(this.point.x + vectorN.x*this.width/2+vectorP.x*this.length/2,
            this.point.y + vectorP.y*this.length/2+ vectorN.y*this.width/2);
        points[1] = new P(this.point.x + vectorN.x*this.width/2-vectorP.x*this.length/2,
            this.point.y - vectorP.y*this.length/2+ vectorN.y*this.width/2);
        points[2] = new P(this.point.x - vectorN.x*this.width/2-vectorP.x*this.length/2,
            this.point.y - vectorP.y*this.length/2- vectorN.y*this.width/2);
        points[3] = new P(this.point.x - vectorN.x*this.width/2+vectorP.x*this.length/2,
            this.point.y + vectorP.y*this.length/2- vectorN.y*this.width/2);

        this.graphicsComponent.points = points;
    };

    OBBPhysicsComponent.prototype.move = function (speed) {
        this.point.x += speed.x;
        this.point.y += speed.y;

        this.computePoints();
    };

    return OBBPhysicsComponent;
});
