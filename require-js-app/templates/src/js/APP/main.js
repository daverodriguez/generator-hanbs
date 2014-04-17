requirejs.config({
	//baseUrl: '.',
	paths: {
		<%= appNS %>: '.',
		lib: '../lib',
		jquery: '../lib/jquery-1.10.2.min',
		modernizr: '../lib/modernizr-2.6.2.min',
		hbs: '../lib/hbs-require'
	},
	waitSeconds: 0, // prevent loading timeout
	shim: {
		// Make sure any non-AMD modules load after their dependencies
		// When you shim a module you must use its shimmed name (jqueryui) in your modules (not the full path,
		// e.g. lib/jqueryui)
		/*
		'jqueryui': {
			deps: ['jquery']
		}
		*/
	}

});

require([
	'modernizr',
	'jquery',
	'hbs'
], function(modernizr, $, HBS, StateManager, global) {

	/**
	 * @exports <%= appNS %>.main
	 */
	var module = {};

	/**
	 * Global init code for the whole application
	 */
	module.init = function() {
		console.log('Hi from main.init()');
	};

	/**
	 * Initialize the app and run the bootstrapper
	 */
	$(document).ready(function() {
		module.init();
		HBS.initPage();
	});
	HBS.namespace('<%= appNS %>.main', module);
});
