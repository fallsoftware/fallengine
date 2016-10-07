define([], function () {
    'use strict';

    function GameComponent(gameObject) {
        this.gameObject = gameObject;
    }

    GameComponent.prototype.onImageLoad = function () {
        console.log('Loading image...');
    };

    GameComponent.prototype.update = function (context) {
    };

    return GameComponent;
});
