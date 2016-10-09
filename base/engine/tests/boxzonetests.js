define(['BoxZoneObject','Vector','Point'], function (O,V,P){
	var run= function(){
		QUnit.module( "TestAABB" );
		var o1=new O(new P(0,1),new P(200,300));
		var value;
		var data=o1.physicsComponents["data"]
		QUnit.test( "Construction of a 0;1 , 200;300 box", function( assert ) {
			assert.ok( data.p1.x==0&&data.p1.y==1&&
			data.p2.x==200&&data.p2.y==300,"box" );
		});
	};
	return {run:run}
}
);