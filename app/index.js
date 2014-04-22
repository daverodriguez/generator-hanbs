'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var HanbsGenerator = module.exports = function HanbsGenerator(args, options, config) {
	yeoman.generators.Base.apply(this, arguments);

	this.on('end', function () {
		this.installDependencies({ skipInstall: options['skip-install'] });
	});

	this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(HanbsGenerator, yeoman.generators.Base);

HanbsGenerator.prototype.askFor = function askFor() {
	var cb = this.async();

	// have Yeoman greet the user.
	console.log(this.yeoman);

	var prompts = [
		{
			type: 'list',
			name: 'appType',
			message: 'What type of application would you like to scaffold?',
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
			name: 'appName',
			message: 'What would you like call this app?',
			default: 'HanBootStrap Project'
		},
		{
			name: 'appNS',
			message: 'What would you like to use as the namespace for this app?',
			default: 'APP'
		},
		{
			when: function(props) { return props.appType === 'requirejs'; },
			name: 'srcDir',
			message: 'Where would you like your source directory?',
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
		},
		{
			when: function(props) { return props.appType === 'requirejs'; },
			name: 'buildDir',
			message: 'Where would you like RequireJS to put your built scripts?',
			default: 'js-built'
		},
		{
			type: 'confirm',
			name: 'createController',
			message: 'Would you like to generate a section controller?',
			default: true
		},
		{
			when: function(props) { return props.createController === true; },
			name: 'controllerName',
			message: 'What should I call the controller?',
			default: 'home'
		},
		{
			when: function(props) { return props.appType !== 'wordpress' },
			type: 'confirm',
			name: 'createExampleClasses',
			message: 'Would you like to generate example classes?',
			default: true
		}
	];

	this.prompt(prompts, function (props) {
		this.appType = props.appType;
		this.appName = props.appName;
		this.appNS = props.appNS;
		this.jsPath = props.jsPath;
		if (this.appType === 'requirejs') {
			this.srcDir = props.srcDir;
			this.buildDir = props.buildDir;
		}

		this.createController = props.createController;
		this.createController;
		if (this.createController === true) {
			this.controllerName = props.controllerName;
		}

		this.createExampleClasses = props.createExampleClasses;

		cb();
	}.bind(this));
};

HanbsGenerator.prototype.app = function app() {
	this.template('_package.json', 'package.json');
	this.copy('_bower.json', 'bower.json');

	this.copy('editorconfig', '.editorconfig');
	this.copy('jshintrc', '.jshintrc');

	var options = {
		nested: true,
		appType: this.appType,
		appName: this.appName,
		appNS: this.appNS,
		jsPath: this.jsPath,
		srcDir: this.srcDir || null,
		buildDir: this.buildDir || null,
		createController: this.createController,
		controllerName: this.controllerName || null,
		createExampleClasses: this.createExampleClasses
	};
	var done = this.async();

	if (this.appType === 'standard') {
		this.invoke("hanbs:standard-app", {args: [''], options: options}, function() {
			done();
		});
	} else if (this.appType === 'requirejs') {
		this.invoke("hanbs:require-js-app", {args: [''], options: options}, function() {
			done();
		});
	}  else if (this.appType === 'wordpress') {
		this.invoke("hanbs:wordpress-app", {args: [''], options: options}, function() {
			done();
		});
	}
};

HanbsGenerator.prototype.projectfiles = function projectfiles() {
	// Save settings for later
	var savedSettings = {
		appType: this.appType,
		appName: this.appName,
		appNS: this.appNS,
		jsPath: this.jsPath,
		controllerName: this.controllerName
	}

	if (this.appType === 'requirejs') {
		savedSettings.srcDir = this.srcDir;
		savedSettings.buildDir = this.buildDir;
	}

	this.write( 'hanbs.json', JSON.stringify(savedSettings) );

};
