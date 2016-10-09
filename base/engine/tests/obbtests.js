define(['OBBObject','Vector','Point'], function (O,V,P){
	var run= function(){
		QUnit.module( "TestOBB" );

		QUnit.test( "Construction of a center 0;1 vector (1,3) w,l 10,30 obb", function( assert ) {
			var o1=new O(new P(0,1),new V(1,3),10,30);
			var value;
			var data=o1.physicsComponents["data"]
			console.log(data)
			assert.ok( data.center.x==0&&data.center.y==1&& data.length==30&&data.width==10&&data.vector.x==1&&data.vector.y==3,"obb created" );
		});
		QUnit.test( "Movement of the obb of 1,2", function( assert ) {
			var o1=new O(new P(0,1),new V(1,3),10,30,new V(1,2),'#ffa000');
			var value;
			var data=o1.physicsComponents["data"]
			o1.physicsComponents["movement"].update();
			assert.ok( data.center.x==1&&data.center.y==3,"obb moved" );
		});
	};
	return {run:run}
}
);