/*
 * Configurations
 *
 * configurations.js
 *
 * param: resource
 */

var _proxies = require('../../proxies/proxies');

 
var path = require('../libraries/path');
var paths = require('../paths/paths'); 
var uri = require(path.join(paths.libraries, '/uri.js'));
// Bluebird has the incredibly useful functionality of enabling you to ‘promisfy’ modules which do not return promises. 
// For example, to promisfy the fs module, simply require bluebird and a promisified version of fs.
var Promise = require(path.join(paths.libraries, '/bluebird.js'));
//var fs = Promise.promisifyAll(require(path.join(paths.libraries, '/fs.js')));

module.exports = function(resource) {
  console.log('Configurations - called');
  console.log('Configurations - resource: ', resource);
  var _Configurations = {};
  console.log('Configurations - resource.URI: ', resource.URI);
  var URI = new uri(resource.URI);
  console.log('Configurations - URI: ', URI);
  var scheme = URI.scheme(); // get scheme from URI e.g. 'urn' or 'url';
  console.log('Configurations - scheme: ', scheme);
  var namespaceIdentifier = URI.heirpart().value.split(':')[0]; // get NID from URI e.g. 'uuid' or 'http'
  console.log('Configurations - namespaceIdentifier: ', namespaceIdentifier);
  var namespaceSpecificString = URI.heirpart().value.split(':')[1]; //get NSS from URI e.g. '6e8bc430-9c3a-11d9-9669-0800200c9a66'
  console.log('Configurations - namespaceSpecificString: ', namespaceSpecificString);
  // Create a new Promise
  return new Promise(function(resolve) {
	console.log('Configurations - inside Promise');
	
	switch(scheme) {
  	  case 'url:':
  	    console.log('Configurations - scheme: ', scheme);
  	    // handle url, for remote files
		
		// TODO
		
		break;				
			
      case 'urn:':
        // handle urn, for local files
 		console.log('Configurations - scheme: ', scheme);
  		var applications_file = path.resolve(__dirname, namespaceSpecificString, 'applications.js');
 		console.log('Configurations - applications_file: ', applications_file);
		var applications = require(applications_file); // A function that returns a Promise
		applications(resource)
		  .then(function(applications) {
			console.log('Configurations - applications: ', applications);
			_Configurations.applications = applications;
		  });
  		var common_file = path.resolve(__dirname, namespaceSpecificString, 'common.js');
 		console.log('Configurations - common_file: ', common_file);		
		var common = require(common_file); // A function that returns a Promise	 
		common(resource)
		  .then(function(common) {
			console.log('Configurations - common: ', common);
			_Configurations.common = common;
		  });
  		var databases_file = path.resolve(__dirname, namespaceSpecificString, 'databases.js');
 		console.log('Configurations - databases_file: ', databases_file);
		var databases = require(databases_file); // A function that returns a Promise 
		databases(resource)
		  .then(function(databases) {
			console.log('Configurations - databases: ', databases);
			_Configurations.databases = databases;
		  });
  		var servers_file = path.resolve(__dirname, namespaceSpecificString, 'servers.js');
 		console.log('Configurations - servers_file: ', servers_file);
		var servers = require(servers_file); // A function that returns a Promise
		servers(resource)
		  .then(function(servers) {
			console.log('Configurations - servers: ', servers);
			_Configurations.servers = servers;
		  });	
		console.log('Configurations - resolve');	
		resolve(_Configurations); 
        break;
      default:
        // do nothing
        break;
    }//eof switch
  });// eof Promise
}
