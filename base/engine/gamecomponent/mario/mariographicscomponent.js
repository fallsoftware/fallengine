define(['jQuery', 'observer'], function ($, observer) {
    'use strict';

    function MarioGraphicsComponent() {
        this.frames = [];
        this.frame = 0;
        this.assets = ['../assets/mario/frame1.gif',
            '../assets/mario/frame2.gif', '../assets/mario/frame3.gif'];

        var length = this.assets.length;

        for (var i = 0; i < length; i++) {
            this.frames.push(new Image());
            this.frames[i].src = this.assets[i];
            this.frames[i].onload = this.onImageLoad;
        }
    }

    MarioGraphicsComponent.prototype.onImageLoad = function () {
        console.log('Loading Mario...');
    };

    MarioGraphicsComponent.prototype.update = function (context) {
        context.drawImage(this.frames[this.frame], 192, 192);
        this.frame = ++this.frame % this.frames.length;
    };

    return MarioGraphicsComponent;
});
