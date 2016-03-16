/*
 * Configurations
 * 
 * param: app
 */
module.exports = function(app) {
  var _Configurations = {};
  _Configurations.applications = require('./applications.js')(app);
  _Configurations.common = require('./common.js')(app);
  _Configurations.databases = require('./databases.js')(app);
  _Configurations.servers = require('./servers.js')(app);
  return _Configurations;
}
