define([], function () {
    'use strict';

    function MathUtils() {
    }

    MathUtils.clamp = function (val, min, max) {
        return Math.max(min, Math.min(max, val));
    };

    MathUtils.randomInt = function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);

        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    return MathUtils;
});
