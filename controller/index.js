'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var path = require('path');

var ControllerGenerator = module.exports = function ControllerGenerator(args, options, config) {
	// By calling `NamedBase` here, we get the argument to the subgenerator call
	// as `this.name`.
	yeoman.generators.NamedBase.apply(this, arguments);

	this.controllerName = this.name;

	//this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(ControllerGenerator, yeoman.generators.NamedBase);

ControllerGenerator.prototype.askFor = function askFor() {

	// Try to load in previously-saved settings
	var settingsPath = "hanbs.json",
		settingsFile;

	try {
		settingsFile = this.readFileAsString(settingsPath);
		this.settings = JSON.parse(settingsFile);

		this.appType = this.settings.appType;
		this.appNS = this.settings.appNS;
		this.jsPath = this.settings.jsPath;
		this.srcDir = this.settings.srcDir || '';
	} catch(e) {
		console.log('Unable to load settings');
	}

	// If we were unable to load settings, prompt for them again
	if (!this.hasOwnProperty('appNS') || !this.hasOwnProperty('jsPath')) {
		var cb = this.async();

		var prompts = [
			{
				type: 'list',
				name: 'appType',
				message: 'What type of application is this?',
				choices: [{
					name: 'A Standard JavaScript application',
					value: 'standard'
				}, {
					name: 'A RequireJS application',
					value: 'requirejs'
				}, {
					name: 'A Wordpress application',
					value: 'wordpress'
				}]
			},
			{
				name: 'appNS',
				message: 'What\'s the namespace of your app?',
				default: 'APP'
			},
			{
				when: function(props) { return props.appType === 'requirejs'; },
				name: 'srcDir',
				message: 'Where is your source directory?',
				default: 'src'
			},
			{
				name: 'jsPath',
				message: 'What is the path to your JavaScript folder?',
				default: function(props) {
					var retVal;

					switch (props.appType) {
						case 'wordpress':
							retVal = 'wp-content/themes/hantheme/assets/js/';
							break;
						case 'requirejs':
							retVal = 'js';
							break;
						default:
							retVal = 'content/js';
					}

					return retVal;
				}
			}
		];

		this.prompt(prompts, function (props) {
			this.appType = props.appType;
			this.appNS = props.appNS;
			this.srcDir = props.srcDir || null;
			this.createExampleClasses = props.createExampleClasses || null;
			this.jsPath = props.jsPath;

			cb();
		}.bind(this));
	}

};

ControllerGenerator.prototype.files = function files() {

	var appPrefix = this.appNS + (this.controllerName.indexOf('/') > -1 ? '/' : '.');
	this.classPath = this.controllerName.replace(appPrefix, '').replace(/\./g, path.sep);
	var outPath = path.join(this.srcDir, this.jsPath, this.appNS, 'controllers', this.classPath + '.js');

	this.createExampleClasses = false;

	switch (this.appType) {
		case "requirejs":
			this.template('js/APP/controllers/controller-require.js', outPath);
			break;
		default:
			this.template('js/APP/controllers/controller-standard.js', outPath);
	}

	if (!this.settings) {
		var savedSettings = {
			appType: this.appType,
			appNS: this.appNS,
			createExampleClasses: this.createExampleClasses,
			jsPath: this.jsPath,
			srcDir: this.srcDir
		}

		this.write( 'hanbs.json', JSON.stringify(savedSettings) );
	}

};
