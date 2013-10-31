'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        jshint: {
            options: {
                reporter: require('jshint-stylish'),
                jshintrc: '.jshintrc'
            },
            lib: ['lib/**/*.js'],
            support: ['Gruntfile.js'],
            client: {
                options: {
                    jshintrc: 'web/public/js/.jshintrc'
                },
                files: {
                    src: [
                        'web/public/js/**/*.js',
                        '!web/public/js/vendor/**/*.js'
                    ]
                }
            }
        },
        watch: {
            livereload: {
                options: { livereload: true },
                files: [
                    'web/public/**/*.{css,js}', 'web/views/**/*.jade'
                ]
            }
        }
    });

    require('load-grunt-tasks')(grunt);

    function alias (name, tasks) {
        grunt.registerTask(name, tasks.split(' '));
    }

    alias('default', 'jshint');
};
