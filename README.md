numper
======

Add up counts and emit the buckets periodically.

    var Numper = require('./index.js')
      , numper = new Numper({interval: 1000}); // Emit counts once per second


    // Need something to count, so suppose we have a kanga dazzling with photons:
    var bk = new BouncyKanga();


    // Now count:
    bk.on('photon', function(value){numper.increment('photons', value);});
    numper.on('aggregate', console.log); // Print counts once per second.

