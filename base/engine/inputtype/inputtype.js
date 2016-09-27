define([], function () {
    'use strict';

    function InputType(type, input) {
        this[input] = type;
    }

    return InputType;
});
