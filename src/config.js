
var postsPath = 'posts';

module.exports.setConfig = function (options) {
  if (options.postsPath) {
    postsPath = options.postsPath;
  }
};

module.exports.getPostsPath = function () {
  return postsPath;
};
