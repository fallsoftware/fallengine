requirejs.config({
    paths: {
        jQuery: '../lib/jquery-3.1.1.min',
		QUnit: '../lib/qunit-2.0.1',
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
        PolygonGraphicsComponent:
            'gamecomponent/polygon/polygongraphicscomponent',
        PolygonObject: 'gameobject/polygon/polygonobject',
        AABBPhysicsComponent: 'gamecomponent/polygon/aabbphysicscomponent',
        OBBPhysicsComponent:'gamecomponent/polygon/obbphysicscomponent',
        KDopPhysicsComponent:'gamecomponent/polygon/kdopphysicscomponent',
        AABBObject: 'gameobject/polygon/aabbobject',
        OBBObject:'gameobject/polygon/obbobject',
        KDopObject: 'gameobject/polygon/kdopobject',
        PointGraphicsComponent:'gamecomponent/point/pointgraphicscomponent',
        PointPhysicsComponent:'gamecomponent/point/pointphysicscomponent',
        PointObject: 'gameobject/point/pointobject',
        Point: 'utility/point',
        Vector: 'utility/vector',
        Edge: 'utility/edge',
        MathUtils: 'utility/mathutils',
        MovementComponent: 'gamecomponent/movementcomponent',
        ObjectGenerator: 'objectgenerator/objectgenerator',
        BoxZoneObject: 'gameobject/polygon/boxzoneobject',
		TestEngine:'tests/testengine'
    },
    shim: {
        'jQuery': {
            exports: 'jQuery'
        },
	    'QUnit': {
            exports: 'QUnit',
            init: function() {
                QUnit.config.autoload = false;
                QUnit.config.autostart = false;
            }
		}
    }
});

require(['TestEngine','QUnit'], init);

function init(TestsEngine,QUnit) {
    'use strict';
    var TestsEngine = new TestsEngine();
	QUnit.load();
	QUnit.start();
}
