'use strict';

var fs = require('fs');
var path = require('path');
var chalk = require('chalk');
var exec = require('child_process').exec;

module.exports = function (verbose) {
    var io = require('./io.js')(verbose);
    var api = {};
    var input = {};

    api.target = function (repo) {
        input.repository = repo;
    };

    api.parse = function (filepath) {
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

    api.execute = function () {

        if (!input.dates) {
            io.die('Parse comes before ');
        }
    };

    return api;
};
