'use strict';

module.exports = function(grunt){

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-simple-mocha');

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
    }
  });

  grunt.registerTask('test', ['jshint', 'simplemocha']);

};
