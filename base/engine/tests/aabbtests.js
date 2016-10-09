define(['AABBObject','Vector','Point'], function (O,V,P){
	var run= function(){
		QUnit.module( "TestAABB" );
		var o1=new O(new P(0,1),new P(1,3),new V(1,2),'#ffa000');
		var value;
		var data=o1.physicsComponents["data"]
		QUnit.test( "Construction of a 0;1 , 1;3 aabb", function( assert ) {
			assert.ok( data.p1.x==0&&data.p1.y==1&&
			data.p2.x==1&&data.p2.y==3,"aabb created" );
		});
		QUnit.test( "Movement of the aabb of 1,2", function( assert ) {
			o1.physicsComponents["movement"].update();
			assert.ok( data.p1.x==1&&data.p1.y==3&&
			data.p2.x==2&&data.p2.y==5,"aabb created" );
		});
	};
	return {run:run}
}
);