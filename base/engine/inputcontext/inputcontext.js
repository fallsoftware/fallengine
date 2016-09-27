define(['jQuery', 'observer'], function ($, observer) {
    'use strict';

    function InputContext(context, actions, states, ranges) {
        if (context !== undefined) {
            this.context = context;
        } else {
            this.context = 'Unknown';
        }

        if (actions !== undefined) {
            this.actions = actions;
        } else {
            this.actions = {};
        }

        if (states !== undefined) {
            this.states = states;
        } else {
            this.states = {};
        }

        if (ranges !== undefined) {
            this.ranges = ranges;
        } else {
            this.ranges = {};
        }
    }

    return InputContext;
});
