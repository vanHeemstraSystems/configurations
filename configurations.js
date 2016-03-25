/*
 * Configurations
 * 
 * param: resource (contains resource.URI e.g. '9999999999999' or 'http://somewhere.else.com')
 *
 * For URI, see also https://medialize.github.io/URI.js
 */
module.exports = function(resource) {
  console.log('Configurations called');
  var path = require('../libraries/path');
  var paths = require('../paths/paths');
  var fs = require(path.join(paths.libraries, '/fs.js'));
  var uri = require(path.join(paths.libraries, '/uri.js'));
  var request = require(path.join(paths.libraries, '/request.js'));
  var buf = new Buffer(1024);
  var _Configurations = {};
  // START - TEMPORARY ONLY !!!
  if(resource == null){
	console.log('Configurations - no resource provided');
	resource = {};
  }
  if(!resource instanceof Array){
	console.log('Configurations - resource provided is not an instance of Array');
	resource = {};
  }
  if(resource.URI == null){
	console.log('Configurations - no resource.URI provided');
	//temporary fix:
	var scheme = 'urn'; // e.g. urn, url
    var namespaceIdentifier = 'uuid'; // e.g. uuid, http, https
    var namespaceSpecificString = '6e8bc430-9c3a-11d9-9669-0800200c9a66'; // e.g. 6e8bc430-9c3a-11d9-9669-0800200c9a66, //example.org/foo?bar=baz
	resource.URI = new URI(scheme+':'+namespaceIdentifier+':'+namespaceSpecificString);
	console.log('Configurations - fixed URI: ', resource.URI); // states undefined ... WHY?
  }
  // END - TEMPORARY ONLY !!!
  var lookup = function(configurations, configuration, resource) {
	console.log('Configurations.lookup called');
	console.log('Configurations.lookup - resource: ', resource);
	var scheme = resource.URI.scheme(); // get scheme from URI e.g. 'urn' or 'url';
	console.log('Configurations - scheme: ', scheme);
	var namespaceIdentifier = resource.URI.heirpart().value.split(':')[0]; // get NID from URI e.g. 'uuid' or 'http'
	console.log('Configurations - namespaceIdentifier: ', namespaceIdentifier);
	var namespaceSpecificString = resource.URI.heirpart().value.split(':')[1]; //get NSS from URI e.g. '6e8bc430-9c3a-11d9-9669-0800200c9a66'
	console.log('Configurations - namespaceSpecificString: ', namespaceSpecificString);
	switch(scheme) {
	  case 'url:':
	    console.log('Configurations - scheme: ', scheme);
	    // handle url, for remote files
		switch(configuration) {
		  case 'applications':
			var url = path.resolve(resource.URI.heirpart().value, configuration+'.js'); // e.g. 'http://www.whatever.com/configs/applications.js'
			request.get(url, function (error, response, body) {
			  if (!error && response.statusCode == 200) {
				configurations.applications = body(resource);
				console.log('Configurations.applications: ', configurations.applications);
			  }
			  else {
				console.log('Configurations.applications: File could not be found at url: ', url);
				console.log('Error: ', error);
			  }
		    });	
			break;
		  case 'common':
            var url = path.resolve(URI.heirpart().value, configuration+'.js'); // e.g. 'http://www.whatever.com/configs/common.js'
			request.get(url, function (error, response, body) {
			  if (!error && response.statusCode == 200) {		  
			    configurations.common = body(resource);
			    console.log('Configurations.common: ', configurations.common);
			  }
			  else {
				console.log('Configurations.common: File could not be found at url: ', url);
				console.log('Error: ', error);
			  }			  
		    });	
			break;
		  case 'databases':
            var url = path.resolve(URI.heirpart().value, configuration+'.js'); // e.g. 'http://www.whatever.com/configs/databases.js'
			request.get(url, function (error, response, body) {
			  if (!error && response.statusCode == 200) {		  
			    configurations.databases = body(resource);
			    console.log('Configurations.databases: ', configurations.databases);
			  }
			  else {
				console.log('Configurations.databases: File could not be found at url: ', url);
				console.log('Error: ', error);
			  }			  
		    });			
			break;
		  case 'servers':
            var url = path.resolve(resource.URI.heirpart().value, configuration+'.js'); // e.g. 'http://www.whatever.com/configs/servers.js'
			request.get(url, function (error, response, body) {
			  if (!error && response.statusCode == 200) {		  
			    configurations.servers = body(resource);
			    console.log('Configurations.servers: ', configurations.servers);
			  }
			  else {
				console.log('Configurations.servers: File could not be found at url: ', url);
				console.log('Error: ', error);
			  }			  
		    });				
			break;
		  default:
			// do nothing
        }// eof switch(configuration)
		break;
      case 'urn:':
        // handle urn, for local files
		console.log('Configurations - scheme: ', scheme);
		var file = path.resolve(__dirname, namespaceSpecificString, configuration+'.js');
		console.log('Configurations - open an existing file: ', file);
		fs.open(file, 'r+', function(err, fd) {
		   if (err) {
			   return console.error(err);
		   }
		   console.log("File opened successfully!");
		   console.log("Going to read the file");
		   fs.read(fd, buf, 0, buf.length, 0, function(err, bytes){
			  if (err){
				 console.log(err);
			  }
			  console.log(bytes + " bytes read");
			  // Print only read bytes to avoid junk.
			  if(bytes > 0){
				//console.log(buf.slice(0, bytes).toString());
				console.log('File does exist: ', file);
				switch(configuration) {
				  case 'applications':
					configurations.applications = require(file)(resource); //WAS buf.slice(0, bytes).toString(); 
					console.log('Configurations.applications: ', configurations.applications);
					break;
				  case 'common':
					configurations.common = require(file)(resource); //WAS buf.slice(0, bytes).toString();
					console.log('Configurations.common: ', configurations.common);
					break;
				  case 'databases':
					configurations.databases = require(file)(resource); //WAS buf.slice(0, bytes).toString();
					console.log('Configurations.databases: ', configurations.databases);
					break;
				  case 'servers':
					configurations.servers = require(file)(resource); //WAS buf.slice(0, bytes).toString(); 
					console.log('Configurations.servers: ', configurations.servers);
					break;
				  default:
					// do nothing
				}
			  }
		   });
		}); 
		break;
	  default:
		// do nothing
	}// eof switch(scheme)
  };
  lookup(_Configurations, 'applications', resource);
  lookup(_Configurations, 'common', resource);
  lookup(_Configurations, 'databases', resource);
  lookup(_Configurations, 'servers', resource);
  console.log('Returning Configurations');
  return _Configurations;
}
