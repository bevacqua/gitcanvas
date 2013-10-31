'use strict';

var program = require('commander');
var commits = require('./commits.js');

program
    .version('0.0.1')
    .option('-f, --file', 'the file to pull the dates from')
    .option('-r, --repository', 'the directory for the repository you want to commit to')
    .parse(process.argv);

commits
    .target(program.repository)
    .parse(program.file)
    .execute();
