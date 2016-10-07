define([], function () {
    'use strict';

    function MathUtils() {
    }

    MathUtils.clamp = function (val, min, max) {
        return Math.max(min, Math.min(max, val));
    };

    return MathUtils;
});
