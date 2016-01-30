// Karma configuration
module.exports = function(config) {
  'use strict';
  config.set({


    frameworks: ['jasmine', 'browserify'],
    basePath: '',
  	reporters: ['spec', 'junit', 'coverage'],
  	port: 9876,
  	colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    captureTimeout: 60000,
    singleRun: false,


      // list of files / patterns to load in the browser
  	files: [
      'dist/oopsie.min.js',
      'test/**/*.js'
  	],


    preprocessors: {
      'test/**/*.js': [ 'browserify' ],
      'dist/**/*.js': ['coverage']
    },


    junitReporter: {
      outputFile: 'test-results.xml',
      outputDir: 'test-results'
    },


  	// List plugins explicitly, since autoloading karma-webpack
  	// won't work here
  	plugins: [
  		'karma-spec-reporter',
        'karma-jasmine',
        'karma-browserify',
        'karma-coverage',
        'karma-junit-reporter',
        'karma-phantomjs-launcher'
  	]
  });
};
