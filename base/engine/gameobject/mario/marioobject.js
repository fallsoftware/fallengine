define(['GameObject', 'MarioGraphicsComponent'], function (GameObject,
    MarioGraphicsComponent) {
    'use strict';

    function MarioObject() {
        GameObject.call(this);
        this.addGraphicsComponent(new MarioGraphicsComponent(this));
    }

    MarioObject.prototype = Object.create(GameObject.prototype);
    MarioObject.prototype.constructor = MarioObject;

    return MarioObject;
});
