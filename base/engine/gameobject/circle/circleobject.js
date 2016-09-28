define(['jQuery', 'observer', 'GameObject', 'CircleGraphicsComponent'],
function ($, observer, GameObject, CircleGraphicsComponent) {
    'use strict';

    function CircleObject() {
        GameObject.call(this);
        this.addGraphicsComponent(new CircleGraphicsComponent(this));
    }

    CircleObject.prototype = Object.create(GameObject.prototype);
    CircleObject.prototype.constructor = CircleObject;

    return CircleObject;
});
