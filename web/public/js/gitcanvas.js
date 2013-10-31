(function (window, document) {
    'use strict';

    var gitcanvas = {};

    gitcanvas.create = function (target) {
        var fragment = document.createElementFragment();

        target.appendChild(fragment);
    };

    window.gitcanvas = gitcanvas;
})(window, document);
