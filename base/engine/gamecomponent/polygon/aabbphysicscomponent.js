define(['PhysicsComponent', 'Point'], function (PhysicsComponent, P) {
    'use strict';

    function AABBPhysicsComponent(gameObject, p1, p2) {
        PhysicsComponent.call(this, gameObject);
        this.p1 = new P(Math.min(p1.x, p2.x), Math.min(p1.y, p2.y));
        this.p2 = new P(Math.max(p1.x, p2.x), Math.max(p1.y, p2.y));

        this.graphicsComponent = gameObject.graphicsComponents[0]; // not generic
        this.computePoints();
    }

    AABBPhysicsComponent.prototype =
        Object.create(PhysicsComponent.prototype);
    AABBPhysicsComponent.prototype.constructor = AABBPhysicsComponent;

    AABBPhysicsComponent.prototype.computePoints = function () {
        this.graphicsComponent.points = [new P(this.p1.x, this.p1.y),
                                        new P(this.p2.x, this.p1.y),
                                        new P(this.p2.x, this.p2.y),
                                        new P(this.p1.x, this.p2.y)];
    };

    AABBPhysicsComponent.prototype.update = function (context) {

    };

    AABBPhysicsComponent.prototype.move = function (speed) {
        this.p1.x += speed.x;
        this.p1.y += speed.y;
        this.p2.x += speed.x;
        this.p2.y += speed.y;

        this.computePoints();
    };

    return AABBPhysicsComponent;
});
