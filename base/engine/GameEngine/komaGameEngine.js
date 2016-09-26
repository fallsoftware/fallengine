define(['jQuery', 'observer', 'Inputs','PhysicEngine'], function ($, o, K,p) {
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
        
        $.getJSON('../scripts/Inputs/defaultInputs.json', callback.bind(this));
    };
    
    GameEngine.prototype.getInput = function () {
        var kGE = this;
        
        $(window).keypress(function (ev) {
            console.log("Keypress!" + ev.keyCode);
            kGE.input = ev.keyCode;
        });
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