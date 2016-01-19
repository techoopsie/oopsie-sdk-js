// Karma configuration
//var webpackConfig = require('./webpack.config.js');
//webpackConfig.entry = {};
//webpackConfig.watch = true;

module.exports = function(config) {
  config.set({


    frameworks: ['jasmine', 'browserify'],
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


    preprocessors: {
        'tests/*.spec.js': [ 'browserify' ] //Mention path as per your test js folder
    },


    // list of files / patterns to load in the browser
	files: [
        'src/**/*.js',
        'test/**/*.spec.js'
	],


	// List plugins explicitly, since autoloading karma-webpack
	// won't work here
	plugins: [
		'karma-spec-reporter',
		'karma-chrome-launcher',
        'karma-jasmine',
        'karma-browserify'
	]
  });
}
