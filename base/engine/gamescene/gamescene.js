define(['jQuery', 'observer'], function ($, observer) {
    'use strict';

    function GameScene(context, seamLessBackground, background,
      gameObjects) {
        if (seamLessBackground !== undefined) {
            this.context = context;
        } else {
            this.context = undefined;
        }

        if (seamLessBackground !== undefined) {
            this.seamLessBackground = seamLessBackground;
        } else {
            this.seamLessBackground = undefined;
        }

        if (background !== undefined) {
            this.background = background;
        } else {
            this.background = undefined;
        }

        if (gameObjects !== undefined) {
            this.gameObjects = gameObjects;
        } else {
            this.gameObjects = [];
        }
    }

    GameScene.prototype = new Subject();

    return GameScene;
});
