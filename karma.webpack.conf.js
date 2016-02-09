// Karma configuration
var webpack = require('karma-webpack');
var path = require('path');
var env = process.env.WEBPACK_ENV;

var browsers = [];

if (env === 'CI') {

    browsers.push('PhantomJS');

} else  {

    browsers.push('PhantomJS');
    browsers.push('Chrome');
    browsers.push('IEEdge');

}


module.exports = function(config) {
  'use strict';
  config.set({


    frameworks: ['jasmine'],
    basePath: '',
  	reporters: ['spec', 'junit', 'coverage'],
  	port: 9876,
  	colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: browsers,
    captureTimeout: 60000,
    singleRun: false,


      // list of files / patterns to load in the browser
  	files: [
      'src/**/*.js',
      'test/**/*.spec.js'
  	],


    webpack: {

        module: {
        loaders: [{
          test: /\.(js|jsx)$/, exclude: /(bower_components|dist|config|node_modules)/,
          loader: 'babel-loader'
        }],
        postLoaders: [{
          test: /\.(js|jsx)$/, exclude: /(node_modules|bower_components|tests|config|dist)/,
          loader: 'istanbul-instrumenter'
        }]
      }
    },
      /*module: {
          preLoaders: [
              // transpile all files except testing sources with babel as usual
                {
                    test: /\.js$/,
                    exclude: [
                        path.resolve('test/'),
                        path.resolve('node_modules/'),
                        path.resolve('dist/')
                    ],
                    loader: 'babel'
                },
                // transpile and instrument only testing sources with isparta
                {
                    test: /\.js$/,
                    include: path.resolve('test/'),
                    loader: 'isparta'
                }

          ]
      },
       watch:true
     },*/



    preprocessors: {
      'src/**.*.js': [ 'webpack' ],
      'test/**/*.spec.js': [ 'webpack' ]
    },


    junitReporter: {
      outputFile: 'test-results.xml',
      outputDir: 'test-results'
    },


    coverageReporter: {
      type: 'cobertura',
      dir: 'coverage/'
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
        webpack,
  		'karma-spec-reporter',
  		'karma-chrome-launcher',
        'karma-ie-launcher',
        'karma-jasmine',
        'karma-coverage',
        'karma-junit-reporter',
        'karma-phantomjs-launcher'
  	]
  });
};
