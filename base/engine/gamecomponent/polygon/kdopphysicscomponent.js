define(['PhysicsComponent', 'Point'], function (PhysicsComponent, P) {
    'use strict';

    function KDopPhysicsComponent(gameObject, polygon, axis, min, max) {
        PhysicsComponent.call(this, gameObject);
		this.center=new P(0,0)
    	this.k = axis.length * 2;
    	this.axis = axis;

        if (polygon !== undefined && polygon !== null) {
            this.buildKDop(polygon);
        } else {
            this.min = min;
            this.max = max;
        }

        this.graphicsComponent = gameObject.graphicsComponents['rendering'];
        this.computePoints();
		this.computeCenter();
    }

    KDopPhysicsComponent.prototype =
        Object.create(PhysicsComponent.prototype);
    KDopPhysicsComponent.prototype.constructor = KDopPhysicsComponent;

    KDopPhysicsComponent.prototype.update = function () {

    };

    KDopPhysicsComponent.prototype.computePoints = function () {
        var points = [];
        // (1, -1) (0, 1) (1, 1) (1, 0)
        var d1, d2, l1, a1, a2, k1, b1, b2, k2, c1, c2;
        a1 = this.axis[0].x;
        a2 = this.axis[0].y;
        k1 = this.min[0];
        d1 = a1;
        d2 = a2;
        l1 = k1;

        for (var i = 1; i <= this.k; i++) {
            if (i == this.k) {
                b1 = d1;
                b2 = d2;
                k2 = l1;
            } else {
                var currentAxis = this.axis[i % (this.k/2)];

                if (i < this.k/2) {
                    k2 = this.min[i];
                } else {
                    k2 = this.max[i % (this.k/2)];
                }

                b1 = currentAxis.x;
                b2 = currentAxis.y;
            }

            if (b1 == 0) {
                c2 = k2 / b2;
                c1 = (k1 - (c2/a2)) / a1;
            } else if (b2 == 0){
                c1 = k2 / b1;
                c2 = (k1 - (c1/a1)) / a2;
            } else if (a1 == 0){
                c2 = k1 / a2;
                c1 = (k2 - (c2/b2)) / b1;
            } else if (a2 == 0){
                c1 = k1 / a1;
                c2 = (k2 - (c1/b1)) / b2;
            } else {
                c1 = (k1*b2 - k2*a2) / (a1*b2 - b1*a2);
                c2 = (k1 - (a2*c2)) / a1;
            }

            points.push(new P(c1, c2));
            a1 = b1;
            a2 = b2;
            k1 = k2;
        }

        this.graphicsComponent.points = points;
    };

	KDopPhysicsComponent.prototype.computeCenter = function () {
		var points = this.graphicsComponent.points;
		var size = points.length;
		var totX = 0;
		var totY = 0;

		for (var i = 0; i < size-1; i++) {
			totX += points[i].x;
			totY += points[i].y;
		}

		this.center = new P(totX/size, totY/size);
	};

    KDopPhysicsComponent.prototype.buildKDop = function (points) {
        this.min = [];
        this.max = [];

    	for (var i = 0; i < this.k/2; i++) {
    		this.min[i] = Infinity;
    		this.max[i] = -Infinity;
    	}

    	for (var point of points) {
    		for (var i = 0; i < this.k/2; i++) {
    			var value = this.axis[i].x * point.x + this.axis[i].y * point.y;
    			if (value < this.min[i]) {
    				this.min[i] = value;
    			}

    			if (value > this.max[i]) {
    				this.max[i] = value;
    			}
    		}
    	}
    };

    KDopPhysicsComponent.prototype.move = function (speed) {
        for (var i = 0; i < this.k/2; i++) {
            var value = speed.x*this.axis[i].x + speed.y*this.axis[i].y;
            this.min[i] += value;
            this.max[i] += value;
        }

		var points = this.graphicsComponent.points;
		var size = points.length;

		for (var i = 0; i < size; i++) {
			points[i].x += speed.x;
			points[i].y += speed.y;
		}

		this.graphicsComponent.points = points;
    };

    return KDopPhysicsComponent;
});
