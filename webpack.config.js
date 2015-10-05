
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
    library: 'Bloql',
    libraryTarget: 'umd',
    path: path.join(__dirname, 'dist')
  },

  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      query: {stage: 0, plugins: ['./build/babelRelayPlugin']},
      exclude: /node_modules/
    }]
  },


  plugins: [
    // new webpack.optimize.DedupePlugin(),
    // new webpack.optimize.OccurenceOrderPlugin(),
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: { warnings: false },
    //   output: { comments: false }
    // })
  ],



  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    },
    'react-relay': {
      root: 'Relay',
      commonjs2: 'react-relay',
      commonjs: 'react-relay',
      amd: 'react-relay'
    }
  }

};
