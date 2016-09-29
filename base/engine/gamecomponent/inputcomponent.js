define(['jQuery', 'observer', 'GameComponent'], function ($, observer,
    GameComponent) {
    'use strict';

    function InputComponent(gameObject) {
        GameComponent.call(this, gameObject);
    }

    InputComponent.prototype = Object.create(GameComponent.prototype);
    InputComponent.prototype.constructor = InputComponent;

    return InputComponent;
});
