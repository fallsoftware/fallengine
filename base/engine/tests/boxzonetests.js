define(['BoxZoneObject','Vector','Point'], function (O,V,P){
	var run= function(){
		QUnit.module( "TestAABB" );
		var o1=new O(new P(0,1),new V(1,3),10,30,new V(1,2),'#ffa000');
		var value;
		var data=o1.physicsComponents["data"]
		QUnit.test( "Construction of a 0;1 , 1;3 aabb", function( assert ) {
			assert.ok( false ,"création de boxzone" );
		});
		QUnit.test( "Movement of the aabb of 1,2", function( assert ) {
			o1.physicsComponents["movement"].update();
			assert.ok( false ,"boxzonebougé" );
		});
	};
	return {run:run}
}
);