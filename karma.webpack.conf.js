// Karma configuration
var webpack = require('karma-webpack');
var webpackConfig = require('./webpack.config.js');
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
      'test/**/*.spec.js'
  	],


    webpack: {
        module: {
          loaders: [
              // transpile all files except testing sources with babel as usual
                {
                    test: /\.js$/,
                    exclude: [
                        path.resolve('node_modules/'),
                        path.resolve('dist/')
                    ],
                    loader: 'babel'
                },
            ],
            postLoaders: [
                // transpile and instrument only testing sources with isparta
                {
                    test: /\.(js|jsx)$/,
                    exclude: /(node_modules|bower_components|test|dist)/,
                    loader: 'istanbul-instrumenter'
                }

          ]
      },
       watch:true
     },



    preprocessors: {
      'src/**/*.js': [ 'webpack', 'coverage' ],
      'test/**/*.spec.js': [ 'webpack' ]
    },


    junitReporter: {
      outputFile: 'test-results.xml',
      outputDir: 'test-results'
    },


    coverageReporter: {
      type: 'html',
      dir: 'coverage/'
    },


    customLaunchers: {
      IEEdge: {
        base: 'IE',
        'x-ua-compatible': 'IE=EmulateEdge'
      }
    },

    plugins: [
        webpack,
  		'karma-*'
  	]

  });
};
