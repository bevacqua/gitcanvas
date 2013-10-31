(function (gitcanvas) {
    'use strict';

    var input = document.querySelector('.gh-canvas');
    var output = document.querySelector('.gh-result');
    var reset = document.querySelector('.gh-reset');
    var fill = document.querySelector('.gh-fill');

    gitcanvas.create(input, output);

    fill.addEventListener('click', function () {
        gitcanvas.set(input, true);
    });
    reset.addEventListener('click', function () {
        gitcanvas.set(input, false);
    });
})(gitcanvas);
