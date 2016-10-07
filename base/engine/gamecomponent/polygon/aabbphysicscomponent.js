define(['PhysicsComponent', 'Point'], function (PhysicsComponent, P) {
    'use strict';

    function AABBPhysicsComponent(gameObject, p1, p2) {
        PhysicsComponent.call(this, gameObject);
        this.p1 = p1;
        this.p2 = p2;

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

    return AABBPhysicsComponent;
});
