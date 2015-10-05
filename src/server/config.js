
var database = null;

module.exports.setConfig = function (options) {
  database = options.database || null;
  database.setConfig(options);
};

module.exports.getDatabase = function () {
  return database;
};
