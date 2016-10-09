define(['CircleObject','Vector','Point'], function (C,V,P){
	var run= function(){
		QUnit.module( "TestCircle" );
		var c1=new C(new P(0,1),10,0,2*Math.PI,true,new V(1,2),'#ffa000');
		var value;
		var data=c1.physicsComponents["data"]
		QUnit.test( "Construction of a 10 radius in 0;1 circle", function( assert ) {
			assert.ok( data.center.x==0&&data.center.y==1&&data.radius==10, "circle created" );
		});
		QUnit.test( "Movement of the circle of 1,2", function( assert ) {
			c1.physicsComponents["movement"].update();
			assert.ok( data.center.x==1&&data.center.y==3&&data.radius==10, "circle moved" );
		});
	};
	return {run:run}
}
);