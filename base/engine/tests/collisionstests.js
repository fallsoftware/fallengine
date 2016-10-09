define(['Point', 'Vector', 'KDopObject', 'CircleObject', 'Edge', 'PointObject',
    'OBBObject','AABBObject'], function (P, V, KDopObject,CircleObject, E,
    PointObject, OBBObject,AABBObject){
	var run= function(){
		QUnit.module( "TestCollision: Cercle-Cercle" );
		QUnit.test( "sans collision", function( assert ) {
			assert.ok( false ,"a implémenter" );
		});
		QUnit.test( "avec collision", function( assert ) {
			assert.ok( false ,"a implémenter" );
		});
		
		QUnit.module( "TestCollision: Cercle-AABB" );
		QUnit.test( "sans collision", function( assert ) {
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