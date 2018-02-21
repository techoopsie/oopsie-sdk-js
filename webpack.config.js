var webpack = require('webpack');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var path = require('path');
var libraryName = 'oopsie';
var outputFile = libraryName + '.js';

var env = process.env.WEBPACK_ENV;
var plugins = [], outputFile;

if (env === 'build') {
  plugins.push(new UglifyJsPlugin({ minimize: true }));
  outputFile = libraryName + '.min.js';
} else {
  outputFile = libraryName + '.js';
}

var config = {
  entry: __dirname + '/src/index.js',
  devtool: 'source-map',
  output: {
    path: __dirname + '/dist',
    filename: outputFile,
    library: 'OopsieSite', //libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    loaders: [
      {
        test: /(\.js)$/,
        loader: 'babel',
        exclude: /(node_modules|bower_components|dist)/
      },
      {
        test: /(\.js)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      },
      { test: /\.json$/, loader: 'json-loader' }
    ]
  },
  resolve: {
    root: path.resolve('./src'),
    extensions: ['', '.js'],
    alias: {
      "request$": "xhr"
    }
  },
  plugins: plugins
};

module.exports = config;
