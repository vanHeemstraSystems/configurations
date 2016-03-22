/*
 * Databases
 * 
 * param: app
 */
module.exports = function(app) {
  var _Databases = {};
  _Databases.rethinkdb = require('./rethinkdb.js')(app);
  return _Databases;
}