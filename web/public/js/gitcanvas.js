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

    function toggle (element) {
        if (element.classList.contains('gh-sq')) {
            element.classList.toggle('gh-ct-mid');
        }
    }

    var gitcanvas = {};

    gitcanvas.create = function (input, output) {
        var fragment = generateDOM();
        var down, lastTarget;

        input.appendChild(fragment);
        input.addEventListener('click', function (e) {
            toggle(e.target);
        });

        input.addEventListener('mousedown', function (e) { down = true; });
        input.addEventListener('mouseup', function (e) { down = false; });

        input.addEventListener('mousemove', function (e) {
            var target = e.target
            if (target !== lastTarget && down) {
                toggle(e.target);
                lastTarget = target;
            }
        });
    };

    gitcanvas.set = function (input, enabled) {
        var sq = input.querySelectorAll('.gh-sq');
        var i;
        for(i = 0; i < sq.length; i++) {
            sq[i].classList.toggle('gh-ct-mid', !!enabled);
        }
    };

    window.gitcanvas = gitcanvas;
})(window, document, moment);
