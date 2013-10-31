'use strict';

var program = require('commander');

global.CLI = program
    .version('0.0.1')
    .usage('[options] <file>')
    .option('-r, --repository', 'target git repository')
    .option('-d, --dry-run', 'just log some output, don\'t commit anything')
    .option('-v, --verbose', 'verbose output of operations')
    .parse(process.argv);

var commits = require('./commits.js');

commits()
    .execute(program.args[0]);
