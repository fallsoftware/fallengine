requirejs.config({
    paths: {
        jQuery: '../lib/jquery-3.1.1.min',
        observer: '../lib/observer',
        TimeObject: 'timeobject/timeobject',
        CoreEngine: 'coreengine/coreengine',
        GameEngine: 'gameengine/gameengine',
        GameObject: 'gameobject/gameobject',
        GameComponent: 'gamecomponent/gamecomponent',
        GraphicsComponent: 'gamecomponent/graphicscomponent',
        PhysicsComponent: 'gamecomponent/physicscomponent',
        InputComponent: 'gamecomponent/inputcomponent',
        RenderingEngine: 'renderingengine/renderingengine',
        PhysicsEngine: 'physicsengine/physicsengine',
        GameScene: 'gamescene/gamescene',
        InputContext: 'inputcontext/inputcontext',
        Inputs: 'inputs/inputs',
        InputType: 'inputtype/inputtype',
        Game: 'game/game',
        MarioGraphicsComponent: 'gamecomponent/mario/mariographicscomponent',
        MarioObject: 'gameobject/mario/marioobject',
        CircleGraphicsComponent: 'gamecomponent/circle/circlegraphicscomponent',
        CirclePhysicsComponent:'gamecomponent/circle/circlephysicscomponent',
        CircleObject: 'gameobject/circle/circleobject',
        RectangleGraphicsComponent:
            'gamecomponent/rectangle/rectanglegraphicscomponent',
        RectanglePhysicsComponent:
            'gamecomponent/rectangle/rectanglephysicscomponent',
        RectangleObject: 'gameobject/rectangle/rectangleobject',
        PolygonGraphicsComponent:
            'gamecomponent/polygon/polygongraphicscomponent',
        PolygonPhysicsComponent:'gamecomponent/polygon/polygonphysicscomponent',
        PolygonObject: 'gameobject/polygon/polygonobject',
        AABBPhysicsComponent: 'gamecomponent/polygon/aabbphysicscomponent',
        OBBPhysicsComponent:'gamecomponent/polygon/obbphysicscomponent',
        KDopPhysicsComponent:'gamecomponent/polygon/kdopphysicscomponent',
        AABBObject: 'gameobject/polygon/aabbobject',
        OBBObject:'gameobject/polygon/obbobject',
        KDopObject: 'gameobject/polygon/kdopobject',
        PointPhysicsComponent:'gamecomponent/point/pointphysicscomponent',
        PointObject: 'gameobject/point/pointobject',
        Point: 'utility/point',
        Vector: 'utility/vector',
        MathUtils: 'utility/mathutils'
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
