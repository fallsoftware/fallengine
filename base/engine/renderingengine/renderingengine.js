define(['jQuery', 'observer'],
    function ($, observer) {
    'use strict';

    function RenderingEngine(gameObjects, canvas) {
        if (canvas != undefined) {
            this.canvas = canvas;
            this.context = canvas.getContext('2d');
            this.setCanvas();
        } else {
            this.canvas = null;
        }

        this.defaultColor = '#69f0ae';
        this.gameObjects = gameObjects;
    }

    RenderingEngine.prototype.render = function (scene) {
        this.context.fillStyle = this.defaultColor;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        var length = this.gameObjects.length;

        for (var gameObject of this.gameObjects) {
            gameObject.update(this.context);
        }
    };

    RenderingEngine.prototype.init = function () {
        this.context.fillStyle = this.defaultColor;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    };

    RenderingEngine.prototype.setCanvas = function () {
        this.canvas.width = 1280;
        this.canvas.height = 600;
    };

    return RenderingEngine;
});
