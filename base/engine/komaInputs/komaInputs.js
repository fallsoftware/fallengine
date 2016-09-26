define(['jQuery', 'observer', 'KomaInputContext'], function ($, o, C) {
    'use strict';
    
    function KomaInputs(inputContexts) {
        
        if (inputContexts !== undefined) {
            this.inputContexts = inputContexts;
        } else {
            this.getDefaultInputContexts();
        }
    }
    
    KomaInputs.prototype.getDefaultInputContexts = function () {
        var callback = function (data, status, xhr) {
                this.inputContexts = data;
            };
        
        $.getJSON('../scripts/komaInputs/defaultInputs.json', callback.bind(this));
    };
    
    KomaInputs.prototype.errorRawInput = function (input) {
        if (input !== undefined) {
            console.log("Input entered (" + String.fromCharCode(input) + ") is invalid. Will map the default input instead");
        }
    };

    return KomaInputs;
});