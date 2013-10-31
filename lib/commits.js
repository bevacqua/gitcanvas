'use strict';

var fs = require('fs');
var path = require('path');
var chalk = require('chalk');
var exec = require('child_process').exec;
var api = module.exports = {};

var input = {};

api.target = function (repo) {
    input.repository = repo;
};

api.parse = function (filepath) {
    var cwd = process.cwd();
    var absolute = path.resolve(cwd, filepath);

    if (!fs.existsSync(absolute)) {

    }
};

api.execute = function () {

};

while read date
do
    fileName=`echo "$date" | tr " " "_"`
    date="$date 14:00 $year +0500"
    echo "Creating file... $fileName"
    touch "$fileName"
    git add "$fileName"
    git commit --date="$date" -m "$fileName"
done <dates.txt
