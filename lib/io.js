'use strict';

var _ = require('lodash');
var chalk = require('chalk');
var util = require('util');
var colors = {
    verb: 'cyan',
    error: 'red'
};

function log (level, args, writeln) {
    var lev = util.format('[%s]', level);
    var prefix = chalk[colors[level]](lev);
    var msg = args.length === 1 ? args[0] : util.format(args[0], _.rest(args));
    var out = util.format('%s %s', prefix, msg);
    var ln = writeln ? '\n' : '';
    process.stdout.write(out + ln);
}

function logfn (level, writeln) {
    return function () {
        var args = _.toArray(arguments);
        log(level, args, writeln);
    };
}

function noop () {}

var diefn = logfn('error', true);
var api = module.exports = {
    die: function () {
        var args = _.toArray(arguments);
        diefn.apply(null, args);
        process.exit(1);
    },
    verbosity: function (verbose) {
        api.verb = verbose;
        api.verbose = verbose ? logfn('verb') : noop;
        api.verboseln = verbose ? logfn('verb', true) : noop;
    }
};

api.verbosity(false);
