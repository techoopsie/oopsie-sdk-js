// Karma configuration
module.exports = function(config) {
  'use strict';
  config.set({


    frameworks: ['jasmine', 'sinon', 'browserify'],
    basePath: '',
  	//webpack: webpackConfig,
  	reporters: ['spec'],
  	port: 9876,
  	colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    captureTimeout: 60000,
    singleRun: false,


      // list of files / patterns to load in the browser
  	files: [
      //'src/**/*.js',
      'src/RestHelper.js',
      'src/Oopsie.js',
      'src/OopsieMeta.js',
      'src/OopsieService.js',
      'src/OopsieObject.js',
      'test/**/*.spec.js'
  	],


    preprocessors: {
      'test/**/*.spec.js': [ 'browserify' ]
    },


  	// List plugins explicitly, since autoloading karma-webpack
  	// won't work here
  	plugins: [
  		'karma-spec-reporter',
  		'karma-chrome-launcher',
      'karma-jasmine',
      'karma-browserify',
      'karma-sinon'
  	]
  });
};
