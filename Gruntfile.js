'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        jshint: {
            options: {
                reporter: require('jshint-stylish'),
                jshintrc: '.jshintrc'
            },
            lib: ['lib/**/*.js'],
            support: ['Gruntfile.js']
        }
    });

    require('load-grunt-tasks')(grunt);

    function alias (name, tasks) {
        grunt.registerTask(name, tasks.split(' '));
    }

    alias('default', 'jshint');
};
