/*
 * Express
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
  console.log('Express - called');
  var _Express = {};
  // Create a new Promise
  return new Promise(function(resolve) {
	console.log('Express - inside Promise');
    _Express = {
      host: "localhost",
      port: 3000 	
    }; 
	console.log('Express - resolve');	
	resolve(_Express);   
  });
}