/*jslint browser: true*/

define(['jQuery', 'observer', 'CoreEngine'], function ($, observer,
  CoreEngine) {
    'use strict';

    var Game = function () {
        console.log("Welcome to the Fall Engine tech demo!");

        var coreEngine = new CoreEngine($('#fallEngine')[0]);
        var fallEngineButton = $('#fallEngineStartButton');

        fallEngineButton.click(function () {
            if (!coreEngine.running) {
                fallEngineButton.attr('id', 'fallEngineStopButton');
                coreEngine.start();
            } else {
                fallEngineButton.attr('id', 'fallEngineStartButton');
                coreEngine.stop();
            }
        });
    };

    return Game;
});
