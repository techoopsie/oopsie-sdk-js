// Karma configuration
module.exports = function(config) {
  'use strict';
  config.set({


    frameworks: ['jasmine', 'browserify'],
    basePath: '',
  	reporters: ['spec', 'coverage'],
  	port: 9876,
  	colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome', 'IEEdge' ], //'Firefox'],
    captureTimeout: 60000,
    singleRun: false,


      // list of files / patterns to load in the browser
  	files: [
      //'src/**/*.js',
      'src/index.js',
      'src/RestHelper.js',
      'src/oopsie.js',
      'src/OopsieService.js',
      'src/OopsieObject.js',
      'src/Promise.js',
      'test/**/*.mock.js',
      'test/**/*.js'
  	],


    preprocessors: {
      'test/**/*.js': [ 'browserify' ],
      'src/**/!(*Promise).js': ['coverage']
    },


    customLaunchers: {
      IEEdge: {
        base: 'IE',
        'x-ua-compatible': 'IE=EmulateEdge'
      }
    },


  	// List plugins explicitly, since autoloading karma-webpack
  	// won't work here
  	plugins: [
  		'karma-spec-reporter',
  		'karma-chrome-launcher',
        'karma-ie-launcher',
        'karma-jasmine',
        'karma-browserify',
        'karma-coverage'
  	]
  });
};
