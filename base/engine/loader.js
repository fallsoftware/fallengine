requirejs.config({
    paths: {
        jQuery: '../lib/jquery-2.1.1.min',
        observer: '../lib/observer',
		TimeObject: 'TimeObject/TimeObject',
        CoreEngine: 'CoreEngine/CoreEngine',
        GameEngine: 'GameEngine/GameEngine',
        GameObject: 'GameObject/GameObject',
        GameComponent: 'GameComponent/GameComponent',
        RenderingEngine: 'RenderingEngine/RenderingEngine',
        PhysicsEngine: 'PhysicsEngine/PhysicsEngine',
        GameScene: 'GameScene/GameScene',
        InputContext: 'InputContext/InputContext',
        Inputs: 'Inputs/Inputs',
        InputType: 'InputType/InputType',
        Game: 'game/game'
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
    
    var g = new Game();
}