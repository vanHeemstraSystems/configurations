/*
 * configurations.js
 */
var path = require('../libraries/path');
var paths = require('../paths/paths'); 
// Bluebird has the incredibly useful functionality of enabling you to ‘promisfy’ modules which do not return promises. 
// For example, to promisfy the fs module, simply require bluebird and a promisified version of fs.
var Promise = require(path.join(paths.libraries, '/bluebird.js'));
//var fs = Promise.promisifyAll(require(path.join(paths.libraries, '/fs.js')));

module.exports = function(resource) {
  console.log('Configurations - called');
  var _Configurations = {};
  // Create a new Promise
  return new Promise(function(resolve) {
	console.log('Configurations - inside Promise');
	var applications = require('./6e8bc430-9c3a-11d9-9669-0800200c9a66/applications.js'); // A function that returns a Promise
	var common = require('./6e8bc430-9c3a-11d9-9669-0800200c9a66/common.js'); // A function that returns a Promise	
	var databases = require('./6e8bc430-9c3a-11d9-9669-0800200c9a66/databases.js'); // A function that returns a Promise
	var servers = require('./6e8bc430-9c3a-11d9-9669-0800200c9a66/servers.js'); // A function that returns a Promise
	applications(resource)
      .then(function(applications) {
        console.log('Configurations - applications: ', applications);
        _Configurations.applications = applications;
      });
	common(resource)
      .then(function(common) {
        console.log('Configurations - common: ', common);
        _Configurations.common = common;
      });
	databases(resource)
      .then(function(databases) {
        console.log('Configurations - databases: ', databases);
        _Configurations.databases = databases;
      });
	servers(resource)
      .then(function(servers) {
        console.log('Configurations - servers: ', servers);
        _Configurations.servers = servers;
      });	
	console.log('Configurations - resolve');	
	resolve(_Configurations);    
  });
}
