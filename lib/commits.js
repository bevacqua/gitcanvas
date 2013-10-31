'use strict';

var fs = require('fs');
var path = require('path');
var chalk = require('chalk');
var program = require('commander');
var exec = require('child_process').exec;

module.exports = function () {
    var io = require('./io.js');
    var api = {};
    var input = {};

    api.dryRun = function (dryRun) { input.dryRun = dryRun; return api; };
    api.verbosity = function (verbose) { io.verbosity(verbose); return api; };
    api.repository = function (repository) { input.repository = repository; return api; };

    api.execute = function (filepath) {
        if (!filepath) {
            console.log(program.helpInformation());
            process.exit(1);
        }

        var cwd = process.cwd();
        var absolute = path.resolve(cwd, filepath);

        if (!fs.existsSync(absolute)) {
            io.die('Input file missing: %s', absolute);
        }

        io.verbose('Reading input...');

        var raw = fs.readFileSync(absolute, { encoding: 'utf8' });
        var lines = raw.split('\n');

        io.verboseln('%s lines parsed.', lines);
    };

    return api;
};
