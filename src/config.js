
var path = require('path');
var postsPath = 'posts';

module.exports.setConfig = function (options) {
  if (options.postsPath) {
    postsPath = options.postsPath;
  }
};

module.exports.getPostsPath = function () {
  return postsPath;
};

module.exports.getWebpackPluginPath = function () {
  return path.join(__dirname, 'server', 'build', 'babelRelayPlugin');
};
