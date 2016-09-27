define(['jQuery', 'observer'], function ($, observer) {
    'use strict';

    function RenderingEngine() {
    }

    RenderingEngine.prototype.render = function (scene) {
        console.log("Rendering scene...");
        // render scene
    };

    return RenderingEngine;
});
