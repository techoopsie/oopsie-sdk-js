// Karma configuration
var webpackConfig = require('./webpack.config.js');
webpackConfig.entry = {};
webpackConfig.watch = true;

module.exports = function(config) {
  config.set({


    frameworks: ['jasmine'],
    basePath: '',
	webpack: webpackConfig,
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
        'test/**/*.js',
        'lib/main.js'
	],


	// list of preprocessors
	preprocessors: {
	    'test/tests.webpack.js': ['webpack']
	},


    webpackMiddleware: {
        noInfo: true
    },

	// List plugins explicitly, since autoloading karma-webpack
	// won't work here
	plugins: [
		'karma-spec-reporter',
		'karma-chrome-launcher',
        'karma-webpack',
        'karma-jasmine'
	]
  });
}
