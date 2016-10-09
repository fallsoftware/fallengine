define(['Vector'], function (V){
	var run= function(){
		QUnit.module( "TestVector" );
		v1=new V(3,4);
		var value;
		var normalized=v1.normalize();
		var normal=v1.normal();
		QUnit.test( "Construction of a 3:4 vector", function( assert ) {
			assert.ok( v1.x==3&&v1.y==4, "vector created" );
		});
		QUnit.test( "length is 5", function( assert ) {
			value=v1.length();
			assert.ok(value==5, "result is"+value );
		});
		QUnit.test( "lengthSquare is 25", function( assert ) {
			value=v1.lengthSquare();
			assert.ok(value==25, "result is"+value );
		});
		QUnit.test( "length of normalized vector is 1", function( assert ) {
			
			value=normalized.length();
			assert.ok( value==1, "result is"+value+" with vector"+normalized.x+':'+normalized.y );
		});
		QUnit.test( "dotproduct of 2;2 is 14", function( assert ) {
			value=v1.dot(new V(2,2));
			assert.ok( value==14, "result is"+value );
		});
		QUnit.test( "dotproduct of 2;2 is 14", function( assert ) {
			value=v1.dot(new V(2,2));
			assert.ok( value==14, "result is"+value );
		});
		QUnit.test( "dotproduct of normal is 0", function( assert ) {
			value=v1.dot(normal);
			assert.ok( value==0, "result is"+value +" with vector"+normal.x+':'+normal.y );
		});
		QUnit.test( "vector equals itself", function( assert ) {
			value=v1.equals(v1);
			assert.ok( value==true, "result is"+value );
		});
	};
	return {run:run}
}
);