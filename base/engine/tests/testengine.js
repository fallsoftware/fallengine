define(['jQuery','QUnit', 'CoreEngine','tests/vectortests','tests/circletests'], function ($,Q,CoreEngine,T1,T2) {
    'use strict';

    var TestEngine = function () {
        console.log("Welcome to the Fall Engine tech demo!");
		T1.run();
		T2.run();
    };

    return TestEngine;
});
