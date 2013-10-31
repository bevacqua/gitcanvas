(function (window, document, moment) {
    'use strict';

    function generateDOM () {
        var fragment = document.createDocumentFragment();
        var now = moment();
        var lastYear = now.clone().subtract('years', 1);
        var date = lastYear;
        var weeks = 52;
        var sq, day, week, firstWeek, flipped;

        // week index means "weeks since last year", which is weird.
        // to wit:
        function untangleWeek (week) {
            if(!firstWeek) {
                firstWeek = week;
            }
            if (week === firstWeek && flipped) {
                week += weeks;
            } else if (week < firstWeek) {
                week += weeks;
                flipped = true;
            }
            return week - firstWeek + 1;
        }

        for(date; date <= now; date.add('days', 1)) {
            day = date.day();
            week = untangleWeek(date.week());
            sq = document.createElement('span');
            sq.classList.add('gh-sq', 'gh-sq-day-' + day, 'gh-sq-week-' + week);
            sq.dataset.date = date;

            fragment.appendChild(sq);
        }

        return fragment;
    }

    function debounce (func, wait, immediate) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    function toggle (canvas, element) {
        if (element.classList.contains('gh-sq')) {
            element.classList.toggle('gh-ct-mid');

            canvas.report();
        }
    }

    function loopThroughDays(canvas, fn) {
        var len = canvas.sq.length;
        var i;
        for(i = 0; i < len; i++) {
            fn(canvas.sq[i]);
        }
    }

    function report (canvas) {
        var result = [];

        loopThroughDays(canvas, function(sq) {
            var commits = sq.classList.contains('gh-ct-mid');
            if (commits) {
                result.push({
                    raw: sq.dataset.date,
                    date: moment(sq.dataset.date).format('ddd MMM DD 14:00 YYYY ZZ'),
                    commits: 1
                });
            }
        });

        canvas.reporter.innerHTML = JSON.stringify(result, null, 2);
    }

    var gitcanvas = {};

    gitcanvas.create = function (input, output) {
        var fragment = generateDOM();
        var exports = {};
        var down, lastTarget;

        input.appendChild(fragment);
        input.addEventListener('click', function (e) {
            toggle(exports, e.target);
        });

        document.addEventListener('mouseup', function (e) { down = false; });
        input.addEventListener('mousedown', function (e) { down = true; });
        input.addEventListener('mousemove', function (e) {
            var target = e.target
            if (target !== lastTarget && down) {
                toggle(exports, e.target);
                lastTarget = target;
            }
        });

        exports.reporter = output;
        exports.sq = input.querySelectorAll('.gh-sq');
        exports.report = debounce(function () {
            report(exports);
        }, 100);

        return exports;
    };

    gitcanvas.set = function (canvas, enabled) {
        loopThroughDays(canvas, function(sq) {
            sq.classList.toggle('gh-ct-mid', !!enabled);
        });
        canvas.report();
    };

    window.gitcanvas = gitcanvas;
})(window, document, moment);
