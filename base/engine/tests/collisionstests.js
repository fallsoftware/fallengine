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
			var a1=new AABBObject(new P(10,10),new P(20,20),10,0,2*Math.PI,true);
			assert.ok(!(physicsengine.CircleAABB(c1,a1)) ,"pas de collision" );
		});
		QUnit.test( "avec collision sur une arrete", function( assert ) {
			var c1=new CircleObject(new P(0,0),10,0,2*Math.PI,true);
			var a1=new AABBObject(new P(-10,9),new P(10,19),10,0,2*Math.PI,true);
			assert.ok(physicsengine.CircleAABB(c1,a1) ,"collision" );
		});
		QUnit.test( "avec collision sur un coin", function( assert ) {
			var c1=new CircleObject(new P(0,0),10,0,2*Math.PI,true);
			var a1=new AABBObject(new P(0,9),new P(10,19),10,0,2*Math.PI,true);
			assert.ok(physicsengine.CircleAABB(c1,a1) ,"collision" );
		});
		QUnit.test( "cercle dans aabb", function( assert ) {
			var c1=new CircleObject(new P(0,0),10,0,2*Math.PI,true);
			var a1=new AABBObject(new P(-10,-10),new P(10,10),10,0,2*Math.PI,true);
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
			assert.ok( false ,"a implémenter" );
		});
		QUnit.test( "avec collision", function( assert ) {
			assert.ok( false ,"a implémenter" );
		});
		
		QUnit.module( "TestCollision: Cercle-Arrete" );
		QUnit.test( "sans collision", function( assert ) {
			assert.ok( false ,"a implémenter" );
		});
		QUnit.test( "avec collision sur une arrete", function( assert ) {
			assert.ok( false ,"a implémenter" );
		});
		QUnit.test( "avec collision sur un coin", function( assert ) {
			assert.ok( false ,"a implémenter" );
		});
		
		QUnit.module( "TestCollision: AABB-AABB" );
		QUnit.test( "sans collision", function( assert ) {
			assert.ok( false ,"a implémenter" );
		});
		QUnit.test( "avec collision", function( assert ) {
			assert.ok( false ,"a implémenter" );
		});
		
		QUnit.module( "TestCollision: AABB-OBB" );
		QUnit.test( "sans collision", function( assert ) {
			assert.ok( false ,"a implémenter" );
		});
		QUnit.test( "avec collision", function( assert ) {
			assert.ok( false ,"a implémenter" );
		});
		
		QUnit.module( "TestCollision: AABB-KDop" );
		QUnit.test( "sans collision", function( assert ) {
			assert.ok( false ,"a implémenter" );
		});
		QUnit.test( "avec collision", function( assert ) {
			assert.ok( false ,"a implémenter" );
		});
		
		QUnit.module( "TestCollision: AABB-Point" );
		QUnit.test( "sans collision", function( assert ) {
			assert.ok( false ,"a implémenter" );
		});
		QUnit.test( "avec collision", function( assert ) {
			assert.ok( false ,"a implémenter" );
		});
		
		QUnit.module( "TestCollision: OBB-OBB" );
		QUnit.test( "sans collision", function( assert ) {
			assert.ok( false ,"a implémenter" );
		});
		QUnit.test( "avec collision", function( assert ) {
			assert.ok( false ,"a implémenter" );
		});
		
		QUnit.module( "TestCollision: OBB-KDOP" );
		QUnit.test( "sans collision", function( assert ) {
			assert.ok( false ,"a implémenter" );
		});
		QUnit.test( "avec collision", function( assert ) {
			assert.ok( false ,"a implémenter" );
		});
		
		QUnit.module( "TestCollision: 0BB-Point" );
		QUnit.test( "sans collision", function( assert ) {
			assert.ok( false ,"a implémenter" );
		});
		QUnit.test( "avec collision", function( assert ) {
			assert.ok( false ,"a implémenter" );
		});
		
		QUnit.module( "TestCollision: KDop-KDop" );
		QUnit.test( "sans collision", function( assert ) {
			assert.ok( false ,"a implémenter" );
		});
		QUnit.test( "avec collision", function( assert ) {
			assert.ok( false ,"a implémenter" );
		});
		
		QUnit.module( "TestCollision: KDop-Point" );
		QUnit.test( "sans collision", function( assert ) {
			assert.ok( false ,"a implémenter" );
		});
		QUnit.test( "avec collision", function( assert ) {
			assert.ok( false ,"a implémenter" );
		});
		
		QUnit.module( "TestCollision: Point-Point" );
		QUnit.test( "sans collision", function( assert ) {
			assert.ok( false ,"a implémenter" );
		});
		QUnit.test( "avec collision", function( assert ) {
			assert.ok( false ,"a implémenter" );
		});
	};
	return {run:run}
}
);