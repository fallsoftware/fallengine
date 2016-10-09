define([], function () {
    'use strict';

    function GameObject() {
        this.graphicsComponents = [];
        this.physicsComponents = [];
        this.inputComponents = [];
		if(GameObject.prototype.count==undefined){
			GameObject.prototype.count=1;
		}
		else{
			GameObject.prototype.count+=1;
		}
		this.id=GameObject.prototype.count;
    }

    GameObject.prototype.addGraphicsComponent = function (component, label) {
        this.graphicsComponents[label] = component;
    };

    GameObject.prototype.addPhysicsComponent = function (component, label) {
        this.physicsComponents[label] = component;
    };

    GameObject.prototype.addInputComponent = function (component, label) {
        this.inputComponents[label] = component;
    };

    GameObject.prototype.removeGraphicsComponent = function (component, label) {
        this.graphicsComponents[label] = null;
    };

    GameObject.prototype.removePhysicsComponent = function (component, label) {
        this.physicsComponents[label] = null;
    };

    GameObject.prototype.removeInputComponent = function (component, label) {
        this.inputComponents[label] = null;
    };

    GameObject.prototype.updateGraphics = function (context) {
        for (var graphicsComponent in this.graphicsComponents) {
            if (!this.graphicsComponents.hasOwnProperty(graphicsComponent)) {
                continue;
            }

            this.graphicsComponents[graphicsComponent].update(context);
        }
    };

    GameObject.prototype.updatePhysics = function (context) {
        for (var physicsComponent in this.physicsComponents) {
            if (!this.physicsComponents.hasOwnProperty(physicsComponent)) {
                continue;
            }

            this.physicsComponents[physicsComponent].update(context);
        }
    };

    GameObject.prototype.updateInputs = function () {
        for (var inputComponent in this.inputComponents) {
            if (!this.inputComponents.hasOwnProperty(inputComponent)) {
                continue;
            }

            this.inputComponents[inputComponent].update();
        }
    };

    GameObject.prototype.update = function (context) {
        this.updateInputs();
        this.updatePhysics(context);
        this.updateGraphics(context);
    };

    return GameObject;
});
