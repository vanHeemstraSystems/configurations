/*
 * Servers
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
  console.log('Servers - called');
  var _Servers = {};
  // Create a new Promise
  return new Promise(function(resolve) {
	console.log('Servers - inside Promise');
	var express = require('./express.js'); // A function that returns a Promise
	express(resource)
      .then(function(express) {
        console.log('Servers - express: ', express);
        _Servers.express = express;
      });
	console.log('Servers - resolve');	
	resolve(_Servers);   
  });
}