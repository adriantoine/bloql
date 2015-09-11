var getBabelRelayPlugin = require('babel-relay-plugin');
var schema = require('../dist/server/schema/schema.json');

module.exports = getBabelRelayPlugin(schema.data);
