/*
 * Common
 * 
 * param: app
 */
module.exports = function(app) {
  var _Common = {
    host : 'yourhostname.com', // put your host name here
    server_port : 13080, // put your server port number here
    server_prefix: 'CORE', // put your server prefix here (e.g. 'CORE')
    app_port : 3000, // put your port number here
    app_gid : 'root', // put your group id here
    app_uid : 'root', // put your user id here
    app_list: {
      'photosharing': { views: [0], themeServer: 'http://localhost:3000', theme: 'mydefaulttheme' }
    }, // put your apps here
    action_list: {
      'read': true,
      'write': true
    }, // put your actions here
    model_list: {
      'photo': true
    }, // put your models here
    format_list: {
      'json':true
    }, // put your formats here
    user_list: {
      'scott': { id: 1, username: 'scott', salt: '12345', hash: '49dbda8199d3524e18ef9cda6c1ef27099d8e2a82e600954cd24c8e495e4aaf867c03c033c98f370f9f86a4beb865092a8501789f51482e68fda7d12d1b3450b0b0f16046ccbe160a39771b4f0ec04917b6f56a1aedb186cab74dd3555883a88a76b87ad43b4e9aeacc6d7bfce603cfd587a1bc987b5640ad740ce0f7458237d', password: 'tiger', name: 'scott', email: 'scott@tiger.com', facebookId: 'scott_tiger' }
    }, // put your users here
    allow_cross_domain : true, // allow is true, otherwise false
    allowedHosts : {
      'http://yourhostname.com': true,
      'localhost': true,
      'localhost:3000': true,
      'localhost:3001': true
    },
    access_control_allow_origin : '*', // put the allowed page requesters here, * means anyone
    lang : 'en', // put the page language here 
    title : 'Your Company', // put the page title here
    description: 'Your Description', // put the page description here
    keywords: 'Your Keywords', // put the page keywords here
    author: 'Your Name', // put the page author here
    css_file_location: 'css/style.css', // put the css file location here. NOTE: the server can overwrite 'style.css' by the app name (e.g. photosharing.css')
    web_root : '/publications' // put your web root here, starting with a slash forward (/)  	
  };
  return _Common;
}