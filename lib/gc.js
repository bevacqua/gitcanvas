'use strict';

var _ = require('lodash');
var emoji = require('emoji-random');
var async = require('async');
var cp = require('child_process');
var sp = cp.spawn;
var io = require('./io.js');

module.exports = function (entries) {

    if (CLI.dryRun) {
        io.verboseln('this is a dry run.');
    }

    async.eachSeries(entries, function(entry, next){
        var times = entry.commits === void 0 ? 1 : entry.commits;

        async.timesSeries(times, function (i, next) {

            var git = run('git', [
                'commit',
                '--allow-empty',
                '--message', 'gitcanvas ... ' + emoji.random(),
                '--date', entry.date
            ], { stdio: 'inherit' });

            git.on('close', next);

        }, next);
    });

    function run () {
        var args = _.toArray(arguments);

        io.verboseln(_.flatten(_.initial(args)).join(' '));

        if (CLI.dryRun) {
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

