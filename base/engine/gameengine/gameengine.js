define(['jQuery', 'Inputs','PhysicsEngine'], function ($, Inputs,
    PhysicsEngine) {
    'use strict';

    function GameEngine(gameObjects, width, height) {
        this.currentScene = {"context":"MAIN_MENU"};
        this.gameObjects = gameObjects;
        this.input = -1;
        this.getDefaultInputContexts();
        this.physicsEngine = new PhysicsEngine(gameObjects, width, height);
    }

    GameEngine.prototype.getDefaultInputContexts = function () {
        var callback = function (data, status, xhr) {
            this.keyBindings = data;
        };

        $.getJSON('https://raw.githubusercontent.com/fallsoftware/fallengine/master/base/engine/inputs/defaultinputs.json', callback.bind(this));
    };

    GameEngine.prototype.getInput = function () {
        var gameEngine = this;

        $(window).keypress(function (ev) {
            gameEngine.input = ev.keyCode;
        });
    };

    GameEngine.prototype.updateInputs = function () {
        var size = this.gameObjects.length;

        for (var i = 0; i < size; i++) {
            this.gameObjects[i].updateInputs(this.input);
        }
    };

    GameEngine.prototype.update = function () {
        this.getInput();

        if (this.currentScene.context === "MAIN_MENU") {
            //window.alert('Button pressed!');
        }

        this.physicsEngine.update();

        this.input = -1;
    };

    return GameEngine;
});
