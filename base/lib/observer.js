function Observer() {
    'use strict';
}

Observer.prototype.update = function (subject) {
    'use strict';
    
    throw 'update is an abstract function. You must implement it.';
};

function Subject() {
    'use strict';
    
    this.observers = [];
}

Subject.prototype.addObserver = function (observer) {
    'use strict';
    
    this.observers.push(observer);
};

Subject.prototype.removeObserver = function (observer) {
    'use strict';
    
    var index = this.observers.indexOf(observer);

    if (index >= 0) {
        return this.observers.splice(index, 1);
    }

    throw 'Unknown observer!';
};

Subject.prototype.notifyObservers = function () {
    'use strict';
    
    var i, size = this.observers.length;

    for (i = 0; i < size; i++) {
        this.observers[i].update(this);
    }
};