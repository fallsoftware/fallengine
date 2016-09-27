define([], function() {
	'use strict';

	function TimeObject() {
		this.start = null;
	}

	TimeObject.prototype.initialize = function() {
		this.start = performance.now();
	}

	TimeObject.prototype.getDelta = function() {
		if (this.start == null) {
			this.start = performance.now();
		}

		return (performance.now() - this.start) / 1000;
	}

	return TimeObject;
});
