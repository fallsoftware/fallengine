define(['Point', 'Vector', 'KDopObject', 'CircleObject', 'Edge', 'PointObject',
    'OBBObject','AABBObject','BoxZoneObject'], function (P, V, KDopObject,
    CircleObject, E, PointObject, OBBObject, AABBObject, BoxZoneObject) {
	var run = function () {
		QUnit.module('TestContain: Box-Circle');

		QUnit.test('not contained', function(assert) {
            var circle = new CircleObject(new P(-10, 0), 10, 0, 2*Math.PI,
                true);
            var boxZone = new BoxZoneObject(new P(0, 0), new P(150, 150));
			assert.ok(!boxZone.contains(circle), 'not contained');
		});

		QUnit.test('contained', function(assert) {
            var circle = new CircleObject(new P(20, 20), 10, 0, 2*Math.PI,
                true);
            var boxZone = new BoxZoneObject(new P(0, 0), new P(150, 150));
			assert.ok(boxZone.contains(circle), 'contained');
		});

		QUnit.module('TestContain: Box-AABB');

        QUnit.test('not contained', function(assert) {
            var AABB = new AABBObject(new P(-10, -10), new P(10, 10));
            var boxZone = new BoxZoneObject(new P(0, 0), new P(150, 150));
			assert.ok(!boxZone.contains(AABB), 'not contained');
		});

        QUnit.test('contained', function(assert) {
            var AABB = new AABBObject(new P(10, 10), new P(20, 20));
            var boxZone = new BoxZoneObject(new P(0, 0), new P(150, 150));
			assert.ok(boxZone.contains(AABB), 'contained');
		});

		QUnit.module('TestContain: Box-OBB');

        QUnit.test('not contained', function(assert) {
            var OBB = new OBBObject(new P(-10, -10), new V(10, 10), 10, 10,
                new V(0, 0));
            var boxZone = new BoxZoneObject(new P(0, 0), new P(150, 150));
			assert.ok(!boxZone.contains(OBB), 'not contained');
		});

        QUnit.test('contained', function(assert) {
            var OBB = new OBBObject(new P(70, 70), new V(10, 10), 10, 10,
                new V(0, 0));
            var boxZone = new BoxZoneObject(new P(0, 0), new P(150, 150));
			assert.ok(boxZone.contains(OBB), 'contained');
		});

		QUnit.module('TestContain: Box-KDop');

        QUnit.test('not contained', function(assert) {
            var polygon = [new P(-300, -100), new P(500, 400), new P(100, 500)];
			var KDop = new KDopObject(polygon, [new V(1, -1),
				new V(1, 0),
				new V(1, 1),
                new V(0, 1)], new V(4, 1));
            var boxZone = new BoxZoneObject(new P(0, 0), new P(150, 150));
			assert.ok(!boxZone.contains(KDop), 'not contained');
		});

        QUnit.test('contained', function(assert) {
            var polygon = [new P(30, 10), new P(50, 40), new P(10, 50)];
			var KDop = new KDopObject(polygon, [new V(1, -1),
				new V(1, 0),
				new V(1, 1),
                new V(0, 1)], new V(4, 1));
            var boxZone = new BoxZoneObject(new P(0, 0), new P(150, 150));
			assert.ok(boxZone.contains(KDop), 'contained');
		});

		QUnit.module('TestContain: Box-Point');

        QUnit.test('not contained', function(assert) {
            var point = new PointObject(new P(-10, -10));
            var boxZone = new BoxZoneObject(new P(0, 0), new P(150, 150));
			assert.ok(!boxZone.contains(point), 'not contained');
		});

        QUnit.test('contained', function(assert) {
            var point = new PointObject(new P(10, 10));
            var boxZone = new BoxZoneObject(new P(0, 0), new P(150, 150));
			assert.ok(boxZone.contains(point), 'contained');
		});
	};
	return {run:run}
}
);
