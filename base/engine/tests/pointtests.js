define(['PointObject','Vector','Point'], function (O,V,P){
	var run= function(){
		QUnit.module( "TestPoint" );
		var o1=new O(new P(0,1),new V(1,2),'#ffa000');
		var value;
		var data=o1.physicsComponents["data"]
		QUnit.test( "Construction of a 0;1 point", function( assert ) {
			assert.ok( data.center.x==0&&data.center.y==1, "point created" );
		});
		QUnit.test( "Movement of the point of 1,2", function( assert ) {
			o1.physicsComponents["movement"].update();
			assert.ok( data.center.x==1&&data.center.y==3, "point moved" );
		});
	};
	return {run:run}
}
);