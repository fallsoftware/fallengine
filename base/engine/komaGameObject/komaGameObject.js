define(['jQuery', 'observer'], function ($, o) {
    'use strict';
    
    function KomaGameObject() {
        this.components = [];
    }
    
    KomaGameObject.prototype = new Subject();
    
    KomaGameObject.prototype.addComponent = function (component) {
        this.components.push(component);
    };
    
    KomaGameObject.prototype.removeComponent = function (component) {
        var index = this.components.indexOf(observer);

        if (index >= 0) {
            return this.components.splice(index, 1);
        }

        throw 'Unknown component!';
    };

    return KomaGameObject;
});