define(['jQuery', 'observer'], function ($, observer) {
    'use strict';

    function GameObject() {
        this.components = [];
    }

    GameObject.prototype = new Subject();

    GameObject.prototype.addComponent = function (component) {
        this.components.push(component);
    };

    GameObject.prototype.removeComponent = function (component) {
        var index = this.components.indexOf(observer);

        if (index >= 0) {
            return this.components.splice(index, 1);
        }

        throw 'Unknown component!';
    };

    return GameObject;
});
