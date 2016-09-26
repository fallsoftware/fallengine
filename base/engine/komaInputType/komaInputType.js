define([], function () {
    'use strict';
    
    function KomaInputType(type, input) {
        this[input] = type;
    }

    return KomaInputType;
});