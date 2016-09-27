define(['jQuery', 'observer', 'InputContext'], function ($, observer, InputContext) {
    'use strict';

    function Inputs(inputContexts) {
        if (inputContexts !== undefined) {
            this.inputContexts = inputContexts;
        } else {
            this.getDefaultInputContexts();
        }
    }

    Inputs.prototype.getDefaultInputContexts = function () {
        var callback = function (data, status, xhr) {
            this.inputContexts = data;
        };

        $.getJSON('../engine/inputs/defaultinputs.json', callback.bind(this));
    };

    Inputs.prototype.errorRawInput = function (input) {
        if (input !== undefined) {
            console.log("Input entered (" + String.fromCharCode(input) +
            ") is invalid. Will map the default input instead");
        }
    };

    return Inputs;
});
