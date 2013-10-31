'use strict';

var program = require('commander');
var commits = require('./commits.js');

program
    .version('0.0.1')
    .option('-f, --file', 'file to pull commit dates from')
    .option('-r, --repository', 'target git repository')
    .option('-d, --dry-run', 'just log some output, don\'t commit anything')
    .option('-v, --verbose', 'verbose output of operations')
    .parse(process.argv);

commits(program.verbose)
    .dry(program.dryRun)
    .target(program.repository)
    .run(program.file);
