define([], function () {
    'use strict';

    function Edge(p1, p2) {
        this.p1 = p1;
        this.p2 = p2;
        this.dx =  p1.x - p2.x;
        this.dy =  p1.y - p2.y;
    }

    Edge.prototype.length = function () {
        return Math.sqrt(this.dx*this.dx + this.dy*this.dy);
    };

    Edge.prototype.lengthSquare = function () {
        return (this.dx*this.dx + this.dy*this.dy);
    };

    Edge.prototype.normalize = function () {
        var length = this.length();

        return new Vector(this.dx/length, this.dy/length);
    };

    Edge.prototype.normal = function () {
        return new Vector(-this.dy, this.dx);
    };

    return Edge;
});
