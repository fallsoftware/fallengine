define(['jQuery', 'observer', 'GameComponent'], function ($, observer,
    GameComponent) {
    'use strict';

    function CircleGraphicsComponent(gameObject) {
        GameComponent.call(this, gameObject);
        this.fillStyle = '#eceff1';
    }

    CircleGraphicsComponent.prototype = Object.create(GameComponent.prototype);
    CircleGraphicsComponent.prototype.constructor = CircleGraphicsComponent;

    /*Child.prototype = Object.create(Parent.prototype);
    Child.prototype.constructor = Child;
    Parent.call(this, name);*/

    CircleGraphicsComponent.prototype.update = function (context) {
        context.arc(500, 500, 70, 0, 2*Math.PI, false);
        context.fillStyle = this.fillStyle;
        context.fill();
    };

    return CircleGraphicsComponent;
});
