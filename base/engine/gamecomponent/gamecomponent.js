define(['jQuery', 'observer'], function ($, observer) {
    'use strict';

    function GameComponent() {
    }

    GameComponent.prototype.onImageLoad = function () {
        console.log('Loading image...');
    };

    GameComponent.prototype.update = function (context) {
    };

    return GameComponent;
});
