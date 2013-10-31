'use strict';

var util = require('util');
var request = require('request');

module.exports = function (app) {

    app.get('/', function (req, res) {
        res.render('app.jade');
    });

    app.get('/api/v1/contributions/:username', function (req, res, next) {
        var hub = 'https://github.com/users/%s/contributions_calendar_data';
        var url = util.format(hub, req.params.username);

        request(url).pipe(res);
    });
};
