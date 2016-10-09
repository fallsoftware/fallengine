define(['PhysicsComponent', 'Point'], function (PhysicsComponent, P) {
    'use strict';

    function AABBPhysicsComponent(gameObject, p1, p2) {
        PhysicsComponent.call(this, gameObject);
        this.p1 = new P(Math.min(p1.x, p2.x), Math.min(p1.y, p2.y));
        this.p2 = new P(Math.max(p1.x, p2.x), Math.max(p1.y, p2.y));
		this.center=new P((p1.x+p2.x)/2,(p1.y+p2.y)/2);
        this.graphicsComponent = gameObject.graphicsComponents['rendering'];

        if (this.graphicsComponent !== undefined
            && this.graphicsComponent !== null) {
            this.computePoints();
        }
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

    AABBPhysicsComponent.prototype.update = function () {

    };

    AABBPhysicsComponent.prototype.move = function (speed) {
        this.p1.x += speed.x;
        this.p1.y += speed.y;
        this.p2.x += speed.x;
        this.p2.y += speed.y;

        this.computePoints();
		this.center=new P((this.p1.x+this.p2.x)/2,(this.p1.y+this.p2.y)/2);
    };

    return AABBPhysicsComponent;
});
