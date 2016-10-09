define(['KDopObject','Vector','Point'], function (O,V,P){
	var run= function(){
		QUnit.module( "TestKdop" );
		var c1=new O([new P(3,1),
			new P(5,4),
			new P(1,5)],
			[new V(1, -1),
            new V(1, 0),
            new V(1, 1),
            new V(0, 1)],new V(1,2),'#ffa000');
		var value;
		var data=c1.physicsComponents["data"]
		var ce=data.center;
		QUnit.test( "Construction of a kdop from a triangle", function( assert ) {
			assert.ok( data.min[0]==-4&&data.max[0]==2
						&& data.min[1]==1&&data.max[1]==5
						&& data.min[2]==4&&data.max[2]==9
						&& data.min[3]==1&&data.max[3]==5,
						"kdop created with min"+data.min + " ,max "+data.max );
		});
		data=c1.physicsComponents["data"]
		QUnit.test( "Movement of the kdop of 1,2", function( assert ) {
		var c2=new O([new P(3,1),
			new P(5,4),
			new P(1,5)],
			[new V(1, -1),
            new V(1, 0),
            new V(1, 1),
            new V(0, 1)],new V(1,2),'#ffa000');
			c2.physicsComponents["data"].move(new V(1,2));
			var data2=c2.physicsComponents["data"].center
			assert.ok(data2.x==ce.x+1&&data2.y==ce.y+2, "kdop moved"+data2.x+":"+data2.y+"attendu"+(ce.x+1)+":"+(ce.y+2) );
		});
	};
	return {run:run}
}
);