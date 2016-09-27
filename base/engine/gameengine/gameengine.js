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

        $.getJSON('../engine/inputs/defaultinputs.json', callback.bind(this));
    };

    GameEngine.prototype.getInput = function () {
        $(window).keypress(function (ev) {
            console.log("Keypress!" + ev.keyCode);
            this.input = ev.keyCode;
        }).bind(this);
    };

    GameEngine.prototype.update = function (step) {
        this.getInput();

        if (this.input === -1) {
            return;
        }

        if (this.currentScene.context === "MAIN_MENU") {
            this.mainMenuInput();
        }

        this.input = -1;
    };

    return GameEngine;
});
