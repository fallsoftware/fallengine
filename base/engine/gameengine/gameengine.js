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

    GameEngine.prototype.update = function (step) {
        this.getInput();

        if (this.currentScene.context === "MAIN_MENU") {
            //window.alert('Button pressed!');
        }

        this.physicsEngine.update();

        this.input = -1;
    };

    return GameEngine;
});
