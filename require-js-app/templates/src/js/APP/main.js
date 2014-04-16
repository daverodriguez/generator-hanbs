/**
 * @fileoverview This is the documentation for the front-end modules of the Menards Shelving Kiosk.
 * See the <a href="../diagrams/Menards client-side UI classes.pdf">UI Class Diagram</a> for more information.
 */
//The build will inline common dependencies into this file.
//For any third party dependencies, like jQuery, place them in the lib folder.
//Configure loading modules from the lib directory,
//except for 'MEN' ones, which are in a sibling
//directory.
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
		// When you shim a module you must use its shimmed name (jqueryui) in your modules (not the full path, e.g. lib/jqueryui)
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
