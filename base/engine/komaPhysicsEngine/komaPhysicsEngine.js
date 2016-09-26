define(['jQuery', 'observer'], function ($, o) {
    'use strict';
    
    function komaPhysicsEngine() {
        //
    }
    
    komaPhysicsEngine.prototype = new Observer();
    
    komaPhysicsEngine.prototype.update = function (scene) {
        console.log("Updating scene...");
        
        var size = this.gameObjects.length,
            i = 0;
        
        this.computePhysics(scene.seamLessBackground);
        this.computePhysics(scene.background);
        
        for (i = 0; i < size; i++) {
            this.gameObjects[i].notifyObservers();
        }
    };
    
    komaPhysicsEngine.prototype.computePhysics = function (gameObject) {
        console.log("Computing gameObject...");
    };

    return komaPhysicsEngine;
});