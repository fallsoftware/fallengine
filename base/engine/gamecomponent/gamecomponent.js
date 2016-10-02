define(['jQuery', 'observer'], function ($, observer) {
    'use strict';

    function GameComponent(gameObject) {
        this.gameObject = gameObject;
    }

    GameComponent.prototype.onImageLoad = function () {
    };

    GameComponent.prototype.update = function (context) {
    };

    return GameComponent;
});
