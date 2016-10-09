define(['Point', 'Vector', 'KDopObject', 'CircleObject', 'Edge', 'PointObject',
    'OBBObject','AABBObject','PhysicsEngine'], function (P, V, KDopObject,CircleObject, E,
    PointObject, OBBObject,AABBObject,PhysicsEngine){
	var run= function(){
		var physicsengine=new PhysicsEngine(null,1000,1000)
		var axis=[new V(1, -1),new V(1, 0),new V(1, 1),new V(0, 1)]
		QUnit.module( "TestCollision: Cercle-Cercle" );
		QUnit.test( "sans collision", function( assert ) {
			var c1=new CircleObject(new P(0,0),10,0,2*Math.PI,true);
			var c2=new CircleObject(new P(30,0),10,0,2*Math.PI,true);
			assert.ok(!(physicsengine.CircleCircle(c1,c2)) ," pas de collision" );
		});
		QUnit.test( "avec collision", function( assert ) {
			var c1=new CircleObject(new P(0,0),10,0,2*Math.PI,true);
			var c2=new CircleObject(new P(10,0),10,0,2*Math.PI,true);
			assert.ok(physicsengine.CircleCircle(c1,c2) ," pas de collision" );
		});

		QUnit.module( "TestCollision: Cercle-AABB" );
		QUnit.test( "sans collision", function( assert ) {
			var c1=new CircleObject(new P(0,0),10,0,2*Math.PI,true);
			var a1=new AABBObject(new P(10,10),new P(20,20));
			assert.ok(!(physicsengine.CircleAABB(c1,a1)) ,"pas de collision" );
		});
		QUnit.test( "avec collision sur une arrete", function( assert ) {
			var c1=new CircleObject(new P(0,0),10,0,2*Math.PI,true);
			var a1=new AABBObject(new P(-10,9),new P(10,19));
			assert.ok(physicsengine.CircleAABB(c1,a1) ,"collision" );
		});
		QUnit.test( "avec collision sur un coin", function( assert ) {
			var c1=new CircleObject(new P(0,0),10,0,2*Math.PI,true);
			var a1=new AABBObject(new P(0,9),new P(10,19));
			assert.ok(physicsengine.CircleAABB(c1,a1) ,"collision" );
		});
		QUnit.test( "cercle dans aabb", function( assert ) {
			var c1=new CircleObject(new P(0,0),10,0,2*Math.PI,true);
			var a1=new AABBObject(new P(-10,-10),new P(10,10));
			assert.ok(physicsengine.CircleAABB(c1,a1) ,"collision" );
		});

		QUnit.module( "TestCollision: Cercle-OBB" );
		QUnit.test( "sans collision", function( assert ) {
			var c1=new CircleObject(new P(50,50),10,0,2*Math.PI,true);
			var o1=new OBBObject(new P(0,0),new V(1,1),10,30);
			assert.ok(!physicsengine.CircleOBB(c1,o1),"pas de collision" );
		});
		QUnit.test( "avec collision sur une arrete", function( assert ) {
			var c1=new CircleObject(new P(20,20),8,0,2*Math.PI,true);
			var o1=new OBBObject(new P(0,0),new V(1,1),40,40);
			assert.ok(physicsengine.CircleOBB(c1,o1),"pas de collision" );
		});
		QUnit.test( "avec collision sur un coin", function( assert ) {
			var c1=new CircleObject(new P(20,0),10,0,2*Math.PI,true);
			var o1=new OBBObject(new P(0,0),new V(1,1),30,30);
			assert.ok(physicsengine.CircleOBB(c1,o1),"pas de collision" );
		});
		QUnit.test( "cercle dans obb", function( assert ) {
			var c1=new CircleObject(new P(0,0),10,0,2*Math.PI,true);
			var o1=new OBBObject(new P(0,0),new V(1,1),30,30);
			assert.ok(physicsengine.CircleOBB(c1,o1),"pas de collision" );;
		});

		QUnit.module( "TestCollision: Cercle-KDop" );
		QUnit.test( "sans collision", function( assert ) {
			var polygon=[new P(30,0),new P(20,10),new P(20,20),new P(30,30),new P(40,30),new P(50,20),new P(50,10),new P(40,0)]
			var k1=new KDopObject(polygon,axis);
			var c1=new CircleObject(new P(0,0),10,0,2*Math.PI,true)
			assert.ok(!physicsengine.CircleKDop(c1,k1) ,"non collision" );
		});
		QUnit.test( "avec collision sur une arrete", function( assert ) {
			var polygon=[new P(30,0),new P(20,10),new P(20,20),new P(30,30),new P(40,30),new P(50,20),new P(50,10),new P(40,0)]
			var k1=new KDopObject(polygon,axis);
			var c1=new CircleObject(new P(35,35),6,0,2*Math.PI,true)
			assert.ok(physicsengine.CircleKDop(c1,k1) ,"collision" );
		});
		QUnit.test( "avec collision sur un coin", function( assert ) {
			var polygon=[new P(30,0),new P(20,10),new P(20,20),new P(30,30),new P(40,30),new P(50,20),new P(50,10),new P(40,0)]
			var k1=new KDopObject(polygon,axis);
			var c1=new CircleObject(new P(29,31),2,0,2*Math.PI,true)
			assert.ok(physicsengine.CircleKDop(c1,k1) ,"collision" );
		});
		QUnit.test( "cercle dans kdop", function( assert ) {
			var polygon=[new P(30,0),new P(20,10),new P(20,20),new P(30,30),new P(40,30),new P(50,20),new P(50,10),new P(40,0)]
			var k1=new KDopObject(polygon,axis);
			var c1=new CircleObject(new P(35,15),6,0,2*Math.PI,true)
			assert.ok(physicsengine.CircleKDop(c1,k1) ,"collision" );
		});

		QUnit.module( "TestCollision: Cercle-Point" );
		QUnit.test( "sans collision", function( assert ) {
			var c1=new CircleObject(new P(0,0),10,0,2*Math.PI,true)
			var p1=new PointObject(new P(0,20))
			assert.ok(!physicsengine.CirclePoint(c1,p1) ,"non collision" );
		});
		QUnit.test( "avec collision", function( assert ) {
			var c1=new CircleObject(new P(0,0),10,0,2*Math.PI,true)
			var p1=new PointObject(new P(0,5))
			assert.ok(physicsengine.CirclePoint(c1,p1) ,"collision" );
		});

		QUnit.module( "TestCollision: Cercle-Arrete" );
		QUnit.test( "sans collision", function( assert ) {
			var c1=new CircleObject(new P(0,0),10,0,2*Math.PI,true)
			var e1=new E(new P(9,9),new P(19,9))
			assert.ok(!physicsengine.CircleEdge(c1,e1) ,"non collision" );
		});
		QUnit.test( "avec collision sur une arrete", function( assert ) {
			var c1=new CircleObject(new P(0,0),10,0,2*Math.PI,true)
			var e1=new E(new P(1,10),new P(10,1))
			assert.ok( physicsengine.CircleEdge(c1,e1) ,"collision" );
		});
		QUnit.test( "avec collision sur un coin", function( assert ) {
			var c1=new CircleObject(new P(0,0),10,0,2*Math.PI,true)
			var e1=new E(new P(9,0),new P(9,19))
			assert.ok( physicsengine.CircleEdge(c1,e1) ,"collision" );
		});

		QUnit.module( "TestCollision: AABB-AABB" );
		QUnit.test( "sans collision", function( assert ) {
			var a1=new AABBObject(new P(10,10),new P(20,20));
			var a2=new AABBObject(new P(21,21),new P(31,31));
			assert.ok(!physicsengine.AABBAABB(a1,a2) ,"non collision" );
		});
		QUnit.test( "avec collision", function( assert ) {
			var a1=new AABBObject(new P(10,10),new P(20,20));
			var a2=new AABBObject(new P(15,15),new P(29,29));
			assert.ok(physicsengine.AABBAABB(a1,a2) ,"collision" );
		});

		QUnit.module( "TestCollision: AABB-OBB" );
		QUnit.test( "sans collision", function( assert ) {
			var o1=new OBBObject(new P(0,0),new V(1,1),30,30);
			var a1=new AABBObject(new P(30,30),new P(20,20));
			assert.ok(!physicsengine.AABBOBB(a1,o1) ,"non collision" );
		});
		QUnit.test( "avec collision", function( assert ) {
			var o1=new OBBObject(new P(0,0),new V(1,1),30,30);
			var a1=new AABBObject(new P(15,-15),new P(30,30));
			assert.ok(physicsengine.AABBOBB(a1,o1) ,"collision" );
		});

		QUnit.module( "TestCollision: AABB-KDop" );
		QUnit.test( "sans collision", function( assert ) {
			var polygon=[new P(30,0),new P(20,10),new P(20,20),new P(30,30),new P(40,30),new P(50,20),new P(50,10),new P(40,0)]
			var k1=new KDopObject(polygon,axis);
			var a1=new AABBObject(new P(0,0),new P(25,4));
			assert.ok(!physicsengine.AABBKDop(a1,k1) ,"collision" );
		});
		QUnit.test( "avec collision", function( assert ) {
			var polygon=[new P(30,0),new P(20,10),new P(20,20),new P(30,30),new P(40,30),new P(50,20),new P(50,10),new P(40,0)]
			var k1=new KDopObject(polygon,axis);
			var a1=new AABBObject(new P(0,0),new P(25,6));
			assert.ok(physicsengine.AABBKDop(a1,k1),"non  implémenter" );
		});

		QUnit.module( "TestCollision: AABB-Point" );
        QUnit.test( "sans collision", function( assert ) {
            var AABB = new AABBObject(new P(10, 10), new P(30, 30));
            var point = new PointObject(new P(150, 110));
			assert.ok(!physicsengine.PointAABB(point, AABB),"sans collision" );
		});
		QUnit.test( "avec collision", function( assert ) {
            var AABB = new AABBObject(new P(10, 10), new P(30, 30));
            var point = new PointObject(new P(20, 20));
			assert.ok(physicsengine.PointAABB(point, AABB),"avec collision" );
		});

		QUnit.module( "TestCollision: OBB-OBB" );
        QUnit.test( "sans collision", function( assert ) {
            var OBB1 = new OBBObject(new P(100, 100), new V(10, 10), 10, 10,
                new V(0, 0));
            var OBB2 = new OBBObject(new P(40, 20), new V(10, 10), 10, 10,
                new V(0, 0));
			assert.ok(!physicsengine.OBBOBB(OBB1, OBB2),"sans collision" );
		});
		QUnit.test( "avec collision", function( assert ) {
            var OBB1 = new OBBObject(new P(20, 20), new V(10, 10), 100, 100,
                new V(0, 0));
            var OBB2 = new OBBObject(new P(40, 20), new V(10, 10), 10, 10,
                new V(0, 0));
			assert.ok(physicsengine.OBBOBB(OBB1, OBB2),"avec collision" );
		});

		QUnit.module( "TestCollision: OBB-KDOP" );
		QUnit.test( "sans collision", function( assert ) {
            var OBB = new OBBObject(new P(100, 100), new V(10, 10), 10, 10,
                new V(0, 0));
            var polygon = [new P(30, 10), new P(50, 40), new P(10, 50)];
            var KDop = new KDopObject(polygon, [new V(1, -1),
				new V(1, 0),
				new V(1, 1),
                new V(0, 1)], new V(4, 1));
			assert.ok(!physicsengine.KDopOBB(KDop, OBB),"sans collision" );
		});
		QUnit.test( "avec collision", function( assert ) {
            var OBB = new OBBObject(new P(40, 20), new V(10, 10), 10, 10,
                new V(0, 0));
            var polygon = [new P(30, 10), new P(50, 40), new P(10, 50)];
            var KDop = new KDopObject(polygon, [new V(1, -1),
				new V(1, 0),
				new V(1, 1),
                new V(0, 1)], new V(4, 1));
			assert.ok(physicsengine.KDopOBB(KDop, OBB),"avec collision" );
		});

		QUnit.module( "TestCollision: 0BB-Point" );
		QUnit.test( "sans collision", function( assert ) {
            var OBB = new OBBObject(new P(10, 10), new V(10, 10), 10, 10,
                new V(0, 0));
            var point = new PointObject(new P(150, 110));
			assert.ok(!physicsengine.PointOBB(point, OBB),"sans collision" );
		});
		QUnit.test( "avec collision", function( assert ) {
            var OBB = new OBBObject(new P(10, 10), new V(10, 10), 10, 10,
                new V(0, 0));
            var point = new PointObject(new P(15, 11));
			assert.ok(physicsengine.PointOBB(point, OBB),"avec collision" );
		});

		QUnit.module( "TestCollision: KDop-KDop" );
		QUnit.test( "sans collision", function( assert ) {
            var polygon1 = [new P(20, 15), new P(55, 39), new P(10, 50)];
            var KDop1 = new KDopObject(polygon1, [new V(1, -1),
				new V(1, 0),
				new V(1, 1),
                new V(0, 1)], new V(2, 2));
            var polygon2 = [new P(300, 100), new P(500, 400), new P(100, 500)];
            var KDop2 = new KDopObject(polygon2, [new V(1, -1),
				new V(1, 0),
				new V(1, 1),
                new V(0, 1)], new V(4, 1));
            assert.ok(!physicsengine.KDopKDop(KDop1, KDop2),"sans collision");
		});
		QUnit.test( "avec collision", function( assert ) {
            var polygon1 = [new P(20, 15), new P(55, 39), new P(10, 50)];
            var KDop1 = new KDopObject(polygon1, [new V(1, -1),
				new V(1, 0),
				new V(1, 1),
                new V(0, 1)], new V(4, 1));
            var polygon2 = [new P(30, 10), new P(50, 40), new P(10, 50)];
            var KDop2 = new KDopObject(polygon2, [new V(1, -1),
				new V(1, 0),
				new V(1, 1),
                new V(0, 1)], new V(4, 1));
            assert.ok(physicsengine.KDopKDop(KDop1, KDop2),"avec collision");
		});

		QUnit.module( "TestCollision: KDop-Point" );
		QUnit.test( "sans collision", function( assert ) {
            var polygon = [new P(30, 10), new P(50, 40), new P(10, 50)];
            var KDop = new KDopObject(polygon, [new V(1, -1),
				new V(1, 0),
				new V(1, 1),
                new V(0, 1)], new V(4, 1));
            var point = new PointObject(new P(300, 100));
			assert.ok(!physicsengine.PointKDop(point, KDop),"sans collision");
		});
		QUnit.test( "avec collision", function( assert ) {
            var polygon = [new P(30, 10), new P(50, 40), new P(10, 50)];
            var KDop = new KDopObject(polygon, [new V(1, -1),
				new V(1, 0),
				new V(1, 1),
                new V(0, 1)], new V(4, 1));
            var point = new PointObject(new P(31, 11));
			assert.ok(physicsengine.PointKDop(point, KDop),"avec collision");
		});

		QUnit.module( "TestCollision: Point-Point" );
		QUnit.test( "sans collision", function( assert ) {
            var p1 = new PointObject(new P(10, 10));
            var p2 = new PointObject(new P(10, 20));

			assert.ok(!physicsengine.PointPoint(p1, p2),"sans collision" );
		});
		QUnit.test( "avec collision", function( assert ) {
            var p1 = new PointObject(new P(10, 10));
            var p2 = p1;

			assert.ok(physicsengine.PointPoint(p1, p2),"avec collision" );
		});
	};
	return {run:run}
}
);
