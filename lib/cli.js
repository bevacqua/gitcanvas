'use strict';

var program = require('commander');

global.CLI = program
    .version('0.0.1')
    .usage('[options] <file>')
    .option('-d, --dry-run', 'just log some output, don\'t commit anything')
    .option('-v, --verbose', 'verbose output of operations')
    .parse(process.argv);

var executor = require('./executor.js');

executor()
    .execute(program.args[0]);
