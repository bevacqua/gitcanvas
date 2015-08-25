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

    entries.forEach(function (entry) {
        var t = entry.commits || 1;
        var i = 0;
        for (; i < t; i++) {
            if (i % 2 === 0) {
                run('touch a')
            } else {
                run('rm a')
            }
            run('git add a')
            run('git commit -m "gitcanvas ... ' + emoji.random() + '" --date "' + new Date(entry.date).toISOString() + '"')
        }
    });

    function run (command) {
        if (CLI.dryRun) {
            console.log(command);
        } else {
            cp.execSync(command, { stdio: 'inherit' })
        }
    }

};

