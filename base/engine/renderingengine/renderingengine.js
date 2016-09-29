define(['jQuery', 'observer', 'MarioObject', 'CircleObject'], function ($,
    observer, MarioObject, CircleObject) {
    'use strict';

    function RenderingEngine(canvas) {
        if (canvas != undefined) {
            this.canvas = canvas;
            this.context = canvas.getContext('2d');
            window.addEventListener('resize', this.setCanvas.bind(this));
            this.setCanvas();
        } else {
            this.canvas = null;
        }

        this.defaultColor = '#69f0ae';
        this.gameObjects = [];
        this.gameObjects.push(new MarioObject());
        this.gameObjects.push(
            new CircleObject(250, 250, 25, 0, Math.PI * 2, true, '#eceff1',
                20));
    }

    RenderingEngine.prototype.render = function (scene) {
        this.context.fillStyle = this.defaultColor;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        var length = this.gameObjects.length;

        for (var gameObject of this.gameObjects) {
            gameObject.update(this.context);
        }
    };

    RenderingEngine.prototype.init = function (scene) {
        this.context.fillStyle = this.defaultColor;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    RenderingEngine.prototype.setCanvas = function () {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    return RenderingEngine;
});
