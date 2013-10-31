'use strict';

var fs = require('fs');
var path = require('path');
var program = require('commander');
var io = require('./io.js');
var gc = require('./gc.js');

module.exports = function () {
    var api = {};

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
        var entries = JSON.parse(raw || '[]') || [];

        io.verboseln('%s entries parsed.', entries.length);

        gc(entries);
    };

    return api;
};
