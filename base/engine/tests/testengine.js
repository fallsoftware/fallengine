define(['jQuery','QUnit', 'CoreEngine','tests/vectortests',
	'tests/circletests',
	'tests/kdoptests',
	'tests/pointtests',
	'tests/aabbtests',
	'tests/obbtests',
	'tests/boxzonetests',
	'tests/collisionstests',
	'tests/containstests'], function ($,Q,CoreEngine,T1,T2,T3,T4,T5,T6,T7,T8,T9) {
    'use strict';

    var TestEngine = function () {
        console.log("Welcome to the Fall Engine tech demo!");
		T1.run();
		T2.run();
		T3.run();
		T4.run();
		T5.run();
		T6.run();
		T7.run();
		T8.run();
		T9.run();
    };

    return TestEngine;
});
