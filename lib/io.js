'use strict';

var _ = require('lodash');
var chalk = require('chalk');
var util = require('util');
var colors = {
    verb: 'cyan',
    error: 'red'
};

function log (level, fn, args) {
    var lev = chalk[colors[level]](level);
    var msg = args.length === 1 ? args[0] : util.format(args[0], _.rest(args));
    var out = util.format('[%s]: %s', lev, msg);
    process.stdout[fn](out);
}

function logfn (fn, level) {
    return function () {
        var args = _.toArray(arguments);
        log(fn, level, args);
    };
}

function noop () {}

var diefn = logfn('writeln', 'error');

module.exports = function (verbose) {
    return {
        die: function (message) {
            diefn(message);
            process.exit(1);
        },
        verbose: verbose ? logfn('write', 'verb') : noop,
        verboseln: verbose ? logfn('writeln', 'verb') : noop
    };
};
