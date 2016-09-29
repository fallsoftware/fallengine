define(['jQuery', 'observer'], function ($, observer) {
    'use strict';

    function PhysicsEngine(gameObjects) {
        this.gameObjects = gameObjects;
    }

    PhysicsEngine.prototype = Object.create(Observer.prototype);
    PhysicsEngine.prototype.constructor = PhysicsEngine;

    PhysicsEngine.prototype.update = function (scene) {
        console.log("Updating scene...");

        var size = this.gameObjects.length,
            i = 0;

        this.computePhysics(scene.seamLessBackground);
        this.computePhysics(scene.background);

        for (i = 0; i < size; i++) {
            this.gameObjects[i].notifyObservers();
        }
    };

    PhysicsEngine.prototype.computePhysics = function (gameObject) {
        console.log("Computing gameObject...");
    };

    return PhysicsEngine;
});
