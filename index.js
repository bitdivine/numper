/**
 * Count events over time intervals.
 */

var util    = require('util'),
    events  = require('events');


function Numper(options) {

    // Get Options:
    if (typeof(options) === 'undefined') {
        options = {};
    }

    var emitter;
    if (typeof(options.emitter) === 'undefined') {
        emitter = this;
    } else {
        emitter = options.emitter;
    }

    var interval;
    if (typeof(options.interval) === 'undefined') {
        interval = 1000;
    } else {
        interval = options.interval;
    }

    // Aggregation:
    function mkEmpty() {
        // Prepare a blank entry
        var now = Date.now();
        return {meta:{tim_start:now},counts:{}};
    }

    var current  = mkEmpty(),
        last     = mkEmpty(),
        counters = current.counts,
        self     = this;

    function swap() {
        // Prepare a blank entry
        var ny   = mkEmpty();
        // Swap in the blank entry:
        counters = ny.counts;
        last     = current;
        current  = ny;
        last.meta.tim_end = ny.meta.tim_start;
    }

    function increment(key, val) {
        counters[key]  = Number(val) + (counters[key] || 0);
    }
    function adddict(dict){
        Object.keys(dict).forEach(function(k){increment(k,dict(k));});
    }

    // Action:
    self.on("increment", increment.bind(this));
    self.on("adddict", adddict.bind(this));
    self.adddict   = adddict;
    self.increment = increment;

    setInterval(function(){
        swap();
        self.emit('aggregate', last);
    }, interval);
}

util.inherits(Numper, events.EventEmitter);

module.exports = Numper;

