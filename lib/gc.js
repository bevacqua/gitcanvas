'use strict';

var _ = require('lodash');
var program = require('commander');
var emoji = require('emoji-random');
var async = require('async');
var cp = require('child_process');
var sp = cp.spawn;
var io = require('./io.js');

module.exports = function (entries) {

    if (program.dryRun) {
        io.verboseln('this is a dry run.');
    }

    async.eachSeries(entries, function(entry, next){

        var git = run('git', [
            'commit',
            '--allow-empty',
            '--message', 'gitcanvas ... ' + emoji.random(),
            '--date', entry.date
        ], { stdio: 'inherit' });

        git.on('close', next);
    });

    function run () {
        var args = _.toArray(arguments);

        if (program.dryRun) {
            io.verboseln(_.flatten(_.initial(args)).join(' '));

            return { // whatever!
                on: function (e, cb) {
                    process.nextTick(function () {
                        cb();
                    });
                }
            };
        } else {
            return sp.apply(cp, args);
        }
    }
};

