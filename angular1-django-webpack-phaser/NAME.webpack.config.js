var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');
var BundleTracker = require('webpack-bundle-tracker');

module.exports = {
  context: __dirname,
  devtool: debug ? "inline-sourcemap" : null,
  entry: path.resolve("./static/js/NAME/main.js"),
  output: {
    path: path.resolve('./static/bundle/NAME/js/'),
    filename: "[name]-[hash].js"
  },
  resolve: {
    modules: [
        'node_modules',
        path.join(__dirname, 'bower_components'),

    ]
  },
  plugins: [new BundleTracker({filename: './webpack-stats-NAME.json'})]
};
