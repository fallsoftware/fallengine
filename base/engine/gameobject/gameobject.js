define(['jQuery', 'observer'], function ($, observer) {
    'use strict';

    function GameObject() {
        this.graphicsComponents = [];
        this.physicsComponents = [];
        this.inputComponents = [];
    }

    GameObject.prototype = new Subject();

    GameObject.prototype.addGraphicsComponent = function (component) {
        this.graphicsComponents.push(component);
    };

    GameObject.prototype.addPhysicsComponent = function (component) {
        this.physicsComponents.push(component);
    };

    GameObject.prototype.addInputComponent = function (component) {
        this.inputComponents.push(component);
    };

    GameObject.prototype.removeGraphicsComponent = function (component) {
        var index = this.graphicsComponents.indexOf(observer);

        if (index >= 0) {
            return this.graphicsComponents.splice(index, 1);
        }

        throw 'Unknown component!';
    };

    GameObject.prototype.removePhysicsComponent = function (component) {
        var index = this.physicsCComponents.indexOf(observer);

        if (index >= 0) {
            return this.physicsComponents.splice(index, 1);
        }

        throw 'Unknown component!';
    };

    GameObject.prototype.removeInputComponent = function (component) {
        var index = this.inputComponents.indexOf(observer);

        if (index >= 0) {
            return this.inputComponents.splice(index, 1);
        }

        throw 'Unknown component!';
    };

    GameObject.prototype.updateGraphics = function (context) {
        for (var graphicsComponent of this.graphicsComponents) {
            graphicsComponent.update(context);
        }
    };

    GameObject.prototype.updatePhysics = function (context) {
        for (var physicsComponent of this.physicsComponents) {
            physicsComponent.update(context);
        }
    };

    GameObject.prototype.updateInputs = function () {
        for (var inputComponent of this.inputComponents) {
            inputComponent.update();
        }
    };

    GameObject.prototype.update = function (context) {
        this.updateInputs();
        this.updatePhysics(context);
        this.updateGraphics(context);
    };

    return GameObject;
});
