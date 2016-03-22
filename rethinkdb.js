/*
 * RethinkDB
 * 
 * param: app
 */
module.exports = function(app) {
  var _RethinkDB = {
    host: "localhost",
    port: 28015,
    authKey: "",
    db: "test"
  };
  return _RethinkDB;
}