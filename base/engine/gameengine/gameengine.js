define(['jQuery', 'observer', 'Inputs','PhysicsEngine'], function ($, observer,
  Inputs, PhysicsEngine) {
    'use strict';

    function GameEngine() {
        this.currentScene = {"context":"MAIN_MENU"};
        this.input = -1;
        this.getDefaultInputContexts();
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
            console.log("Keypress!" + ev.keyCode);
            gameEngine.input = ev.keyCode;
        });
    };

    GameEngine.prototype.update = function (step) {
        this.getInput();

        if (this.input === -1) {
            return;
        }

        if (this.currentScene.context === "MAIN_MENU") {
            window.alert('Button pressed!');
        }

        this.input = -1;
    };

    return GameEngine;
});
