define(['jQuery', 'observer'],
    function ($, observer) {
    'use strict';

    function RenderingEngine(gameObjects, canvas) {
        if (canvas !== null && canvas !== undefined) {
            this.canvas = canvas;
            $(this.init(canvas));
            window.addEventListener('resize', this.setCanvas.bind(this));
            this.setCanvas();
        } else {
            this.canvas = null;
        }

        this.defaultColor = '#69f0ae';
        this.gameObjects = gameObjects;
    }

    RenderingEngine.prototype.initWebGL = function (canvas) {
        this.graphicLibrary = null;

        try {
            this.graphicLibrary = canvas.getContext('webgl')
                || canvas.getContext('experimental-webgl');
        } catch(exeption) {
            alert('Unknown exception!');
        }

        if (!this.graphicLibrary) {
            alert('WebGL not initialized. Maybe your web browser does not \
                support it.');
        }
    }

    RenderingEngine.prototype.render = function (scene) {
        this.context.fillStyle = this.defaultColor;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        var length = this.gameObjects.length;

        for (var gameObject of this.gameObjects) {
            gameObject.update(this.context);
        }
    };

    RenderingEngine.prototype.init = function (canvas) {
        this.initWebGL(canvas);

        if (this.graphicLibrary) {
            this.graphicLibrary.clearColor(0.0, 0.0, 0.0, 1.0);
            this.graphicLibrary.enable(this.graphicLibrary.DEPTH_TEST);
            this.graphicLibrary.depthFunc(this.graphicLibrary.LEQUAL);
            this.graphicLibrary.clear(this.graphicLibrary.COLOR_BUFFER_BIT
                | this.graphicLibrary.DEPTH_BUFFER_BIT);
        }
    }

    RenderingEngine.prototype.setCanvas = function () {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    return RenderingEngine;
});
