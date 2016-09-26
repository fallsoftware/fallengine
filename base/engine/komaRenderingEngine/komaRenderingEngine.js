define(['jQuery', 'observer'], function ($, o) {
    'use strict';
    
    function KomaRenderingEngine() {
    }
    
    KomaRenderingEngine.prototype.render = function (scene) {
        console.log("Rendering scene...");
        // render scene
    };

    return KomaRenderingEngine;
});