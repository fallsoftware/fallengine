define([], function () {
    'use strict';

    function Vector(x, y) {
        this.x = x;
        this.y = y;
    }

    Vector.prototype.length = function () {
        return Math.sqrt(this.x*this.x + this.y*this.y);
    };

    Vector.prototype.normalize = function () {
        var length = this.length();

        return new Vector(this.x/length, this.y/length);
    };
    
    Vector.prototype.normal = function () {
        return new Vector(-this.y, this.x);
    };

    return Vector;
});
