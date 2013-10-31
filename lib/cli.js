'use strict';

var program = require('commander');
var commits = require('./commits.js');

program
    .version('0.0.1')
    .usage('[options] <file>')
    .option('-r, --repository', 'target git repository')
    .option('-d, --dry-run', 'just log some output, don\'t commit anything')
    .option('-v, --verbose', 'verbose output of operations')
    .parse(process.argv);

commits()
    .dryRun(program.dryRun)
    .verbosity(program.verbose)
    .repository(program.repository)
    .execute(program.args[0]);
