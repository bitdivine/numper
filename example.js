    var Numper = require('./index.js')
      , numper = new Numper({interval: 1000}); // Emit counts once per second


    // Need something to count, so here's a crazy event emitter.
    var events = require('events'),
        util   = require('util');
    function BouncyKanga(){
        var self = this;
        for (i=0; i<Math.random()*10; i++){
            setInterval
            ( function(){
                  self.emit('photon',Math.random());
              }
            , Math.random() * 1000
            );
        }
    }
    util.inherits(BouncyKanga, events.EventEmitter);


    // Now count:
    var bk = new BouncyKanga();
    bk.on('photon', function(value){numper.increment('photons', value);});
    numper.on('aggregate', console.log); // Print counts once per second.

