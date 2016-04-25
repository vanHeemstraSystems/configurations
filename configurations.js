/*
 * configurations.js
 */
var ConfigurationsConfiguration = require(__dirname+'/configuration.js');

/**
 * Create a new Configurations that let users create sub-configurations.
 * @return {Libraries}
 */
function Configurations() { }

/**
 * Create a new ConfigurationsConfiguration object.
 * @return {ConfigurationsConfiguration}
 */
Configurations.prototype.configuration = function() {
  return new ConfigurationsConfiguration();
}

//ORIGINAL module.exports = new Configurations();
module.exports = function() { return new Configurations(); }
