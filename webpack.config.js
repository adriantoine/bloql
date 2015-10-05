
var path = require('path');
var webpack = require('webpack');

module.exports = {

  devtool: 'source-map',

  entry: {
    PostList: './src/client/PostList',
    Post: './src/client/Post'
  },

  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist')
  },

  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      query: {
        stage: 0,
        optional: [
          'optimisation.react.constantElements',
          'optimisation.react.inlineElements'
        ]
      },
      exclude: /node_modules/
    }]
  },


  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      output: { comments: false }
    })

  ],

  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  }

};
