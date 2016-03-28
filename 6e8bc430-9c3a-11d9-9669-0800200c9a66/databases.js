/*
 * Databases
 * 
 * param: resource
 */
var path = require('../../libraries/path');
var paths = require('../../paths/paths'); 
// Bluebird has the incredibly useful functionality of enabling you to ‘promisfy’ modules which do not return promises. 
// For example, to promisfy the fs module, simply require bluebird and a promisified version of fs.
var Promise = require(path.join(paths.libraries, '/bluebird.js'));
//var fs = Promise.promisifyAll(require(path.join(paths.libraries, '/fs.js')));

module.exports = function(resource) {
  console.log('Databases - called');
  var _Databases = {};
  // Create a new Promise
  return new Promise(function(resolve) {
	console.log('Databases - inside Promise');
	var rethinkdb = require('./rethinkdb.js'); // A function that returns a Promise
	rethinkdb(resource)
      .then(function(rethinkdb) {
        console.log('Databases - rethinkdb: ', rethinkdb);
        _Databases.rethinkdb = rethinkdb;
      });
	console.log('Databases - resolve');	
	resolve(_Databases);   
  });
}