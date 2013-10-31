(function (window, document, moment) {
    'use strict';

    var gitcanvas = {};

    gitcanvas.create = function (target, username) {
        var now = moment();
        var yearAgo = now.clone().subtract('years', 1);
        var fragment = document.createDocumentFragment();
        var date = yearAgo, sq;
        for(date; date <= now; date.add('days', 1)) {
            sq = document.createElement('span');
            sq.classList.add('gh-sq', 'gh-sq-day-' + date.day(), 'gh-sq-week-' + date.week());
            sq.dataset.date = date;

            fragment.appendChild(sq);
        }

        target.appendChild(fragment);
        target.addEventListener('click', function (e) {
            e.target.classList.toggle('gh-ct-mid');
        });
    };

    window.gitcanvas = gitcanvas;
})(window, document, moment);
