var path = require('path');
var webpack = require('webpack');

module.exports = {

    entry: [
      // Set up an ES6-ish environment
      'babel-polyfill',

      // Add your application's scripts below
      './src/index.js',
    ],

    output: {
      path: __dirname + '/lib',
      filename: '[name].js'
    },

    module: {
      loaders: [
        {
          loader: 'babel-loader',

          // Skip any files outside of your project's `src` directory
          include: [
            path.resolve(__dirname, 'src'),
          ],

          // Only run `.js` and `.jsx` files through Babel
          test: /\.js?$/,

          // Options to configure babel with
          query: {
            plugins: ['transform-runtime'],
            presets: ['es2015', 'stage-0'],
          }
        },
      ]
    }
}


/*

  Webpack

  webpack --progress --colors

  webpack --progress --colors --watch




*/
