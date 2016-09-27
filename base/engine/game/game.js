/*jslint browser: true*/

define(['jQuery', 'observer', 'CoreEngine'], function ($, observer,
  CoreEngine) {
    'use strict';

    var Game = function () {
        console.log("Welcome to the fall engine tech demo!");

        var coreEngine = new CoreEngine();

        $('#fallEngineStartButton').click(function () {
            coreEngine.start();
        });

        $('#fallEngineStopButton').click(function () {
            coreEngine.stop();
        });
    };

    return Game;
});
