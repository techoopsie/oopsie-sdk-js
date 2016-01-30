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
    autoWatch: false,
    browsers: ['PhantomJS'],
    captureTimeout: 60000,
    singleRun: true,


      // list of files / patterns to load in the browser
  	files: [
      'dist/oopsie.min.js',
      'test/**/*.js'
  	],


    preprocessors: {
      'test/**/*.js': [ 'browserify'],
      'dist/**/*.js': ['coverage']
    },


    junitReporter: {
      outputFile: 'test-results/test-results.xml',
      suite: ''
    },


  	// List plugins explicitly, since autoloading karma-webpack
  	// won't work here
  	plugins: [
  		'karma-*'
  	]
  });
};
