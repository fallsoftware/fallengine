define([], function () {
    'use strict';

    function Vector(x, y) {
        this.x = x;
        this.y = y;
    }

    Vector.prototype.length = function () {
        return Math.sqrt(this.x*this.x + this.y*this.y);
    };

    Vector.prototype.lengthSquare = function () {
        return (this.x*this.x + this.y*this.y);
    };

    Vector.prototype.normalize = function () {
        var length = this.length();

        return new Vector(this.x/length, this.y/length);
    };

    Vector.prototype.normal = function () {
        return (new Vector(-this.y, this.x)).normalize();
    };

    Vector.prototype.dot = function (vector) {
        return this.x * vector.x + this.y * vector.y;
    };
	Vector.prototype.equals=function (vector){
		return (this.x==vector.x && this.y==vector.y)
	}
    return Vector;
});
