define(['jQuery', 'observer', 'GameObject', 'MarioGraphicsComponent'],
function ($, observer, GameObject, MarioGraphicsComponent) {
    'use strict';

    function MarioObject() {
        this.addGraphicsComponent(new MarioGraphicsComponent());
    }

    MarioObject.prototype = new GameObject();

    return MarioObject;
});
