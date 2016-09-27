requirejs.config({
    paths: {
        jQuery: '../lib/jquery-3.1.1.min',
        observer: '../lib/observer',
        TimeObject: 'timeobject/timeobject',
        CoreEngine: 'coreengine/coreengine',
        GameEngine: 'gameengine/gameengine',
        GameObject: 'gameobject/gameobject',
        GameComponent: 'gamecomponent/gamecomponent',
        RenderingEngine: 'renderingengine/renderingengine',
        PhysicsEngine: 'physicsengine/physicsengine',
        GameScene: 'gamescene/gamescene',
        InputContext: 'inputcontext/inputcontext',
        Inputs: 'inputs/inputs',
        InputType: 'inputtype/inputtype',
        Game: 'game/game',
        Mario: 'gamecomponent/mario/mario'
    },
    shim: {
        'jQuery': {
            exports: 'jQuery'
        }
    }
});

require(['Game'], init);

function init(Game) {
    'use strict';

    var game = new Game();
}
