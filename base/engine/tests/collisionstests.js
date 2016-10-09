define(['Point', 'Vector', 'KDopObject', 'CircleObject', 'Edge', 'PointObject',
    'OBBObject','AABBObject','PhysicsEngine'], function (P, V, KDopObject,CircleObject, E,
    PointObject, OBBObject,AABBObject,PhysicsEngine){
	var run= function(){
		var physicsengine=new PhysicsEngine(null,1000,1000)

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
			/*var c1=new CircleObject(new P(0,0),10,0,2*Math.PI,true);
			var a1=new AABBObject(new P(10,10),new P(),10,0,2*Math.PI,true);
			assert.ok(!(physicsengine.CircleCircle(c1,c2)) ," pas de collision" );*/
			assert.ok( false ,"a implémenter" );
		});
		QUnit.test( "avec collision sur une arrete", function( assert ) {
			assert.ok( false ,"a implémenter" );
		});
		QUnit.test( "avec collision sur un coin", function( assert ) {
			assert.ok( false ,"a implémenter" );
		});
		QUnit.test( "cercle dans aabb", function( assert ) {
			assert.ok( false ,"a implémenter" );
		});
		
		QUnit.module( "TestCollision: Cercle-OBB" );
		QUnit.test( "sans collision", function( assert ) {
			assert.ok( false ,"a implémenter" );
		});
		QUnit.test( "avec collision sur une arrete", function( assert ) {
			assert.ok( false ,"a implémenter" );
		});
		QUnit.test( "avec collision sur un coin", function( assert ) {
			assert.ok( false ,"a implémenter" );
		});
		QUnit.test( "cercle dans obb", function( assert ) {
			assert.ok( false ,"a implémenter" );
		});
		
		QUnit.module( "TestCollision: Cercle-KDop" );
		QUnit.test( "sans collision", function( assert ) {
			assert.ok( false ,"a implémenter" );
		});
		QUnit.test( "avec collision sur une arrete", function( assert ) {
			assert.ok( false ,"a implémenter" );
		});
		QUnit.test( "avec collision sur un coin", function( assert ) {
			assert.ok( false ,"a implémenter" );
		});
		QUnit.test( "cercle dans kdop", function( assert ) {
			assert.ok( false ,"a implémenter" );
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