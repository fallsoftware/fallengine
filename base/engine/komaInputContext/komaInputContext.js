define(['jQuery', 'observer'], function ($, o) {
    'use strict';
    
    function KomaInputContext(context, actions, states, ranges) {
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

    return KomaInputContext;
});