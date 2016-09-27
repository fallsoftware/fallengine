define([], function() {
	'use strict';

	function TimeObject() {
		this.start = 0;
	}

	TimeObject.prototype.initialize = function() {
		this.start = (new Date).getTime();
	}

	TimeObject.prototype.getDelta = function() {
		if (this.start == 0) {
			this.start = (new Date).getTime();
		}

		return (new Date).getTime() - this.start;
	}

    return TimeObject;
});
