'use strict';

module.exports = function(grunt){

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-karma');

  grunt.initConfig({
    jshint: {
      dev: {
        src: ['Gruntfile.js',
              'models/**/*.js',
              'routes/**/*.js',
              'test/**/*.js',
              'server.js',
              '!test/**/*_bundle.js',
              'app/**/*.js',
              '!app/**/*_bundle.js'],
        options: {
          jshintrc: true,
          node: true
        }
      }
    },
    simplemocha: {
      all: {
        src: ['test/server/**/*.js']
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
      karmatest: {
        src: ['test/karma_test/pokemon_controller_test.js'],
        dest: 'test/karma_test/karma_test_bundle.js'
      },
      test: {
        src: ['test/client_side/*_test.js'],
        dest: 'test/client_side/test_bundle.js'
      },
      options: {
        transform: ['debowerify']
      }
    },

    karma: {
      unit: {
        configFile: 'karma.conf.js'
      }
    }

  });

  grunt.registerTask('test', ['jshint', 'simplemocha']);
  grunt.registerTask('build', ['clean', 'browserify', 'copy']);
  grunt.registerTask('build:test',['browserify:test']);
  grunt.registerTask('test:client', ['browserify:karmatest', 'karma:unit']);

};
