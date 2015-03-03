'use strict';

module.exports = function(grunt){

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-browserify');

  grunt.initConfig({
    jshint: {
      dev: {
        src: ['Gruntfile.js', 'models/**/*.js', 'routes/**/*.js', 'test/**/*.js', 'server.js'],
        options: {
          jshintrc: true,
          node: true
        }
      }
    },
    simplemocha: {
      all: {
        src: ['test/**/*.js']
      }
    },
    clean: {
      build: {
        src: ['build/']
      }
    },
    copy: {
      build: {
        expand: true,
        cwd: 'app/',
        src: '**/*.html',
        dest: 'build/',
        flatten: 'false',
        filter: 'isFile'
      }
    },
    browserify: {
      dev: {
        src: ['app/js/**/*.js'],
        dest: 'build/bundle.js'
      },
      test: {
        src: ['test/client_side/*_test.js'],
        dest: 'test/client_side/test_bundle.js'
      },
      options: {
        transform: ['debowerify']
      }
    }
  });

  grunt.registerTask('test', ['jshint', 'simplemocha']);
  grunt.registerTask('build', ['clean', 'browserify', 'copy']);
  grunt.registerTask('test:client',['browserify:test']);

};
