define([], function () {
    'use strict';

    function Vector(x, y) {
        this.x = x;
        this.y = y;
    }

    this.Vector.prototype.length = function () {
        return Math.sqrt(this.x*this.x + this.y*this.y);
    }

    this.Vector.prototype.normalize = function () {
        var length = this.lenth();

        return new Vector(x/length, y/length);
    }

    return Vector;
});
