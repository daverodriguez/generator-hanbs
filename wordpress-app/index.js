'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

var WordpressappGenerator = module.exports = function WordpressappGenerator(args, options, config) {
	var instance = this;

	// By calling `NamedBase` here, we get the argument to the subgenerator call
	// as `this.name`.
	yeoman.generators.NamedBase.apply(this, arguments);

	// Load options from parent generator
	this.nested = instance.options.nested;
	this.appName = instance.options.appName;
	this.appNS = instance.options.appNS;
	this.jsPath = instance.options.jsPath;
	this.appType = instance.options.appType;
	this.createController = instance.options.createController;
	this.controllerName = instance.options.controllerName;
	this.createExampleClasses = instance.options.createExampleClasses;
};

util.inherits(WordpressappGenerator, yeoman.generators.NamedBase);

WordpressappGenerator.prototype.files = function files() {
	this.mkdir(this.jsPath);

	this.mkdir(this.jsPath + '/' + 'lib');
	this.template('js/lib/hbs.js', this.jsPath + '/' + 'lib/hbs.js');

	this.mkdir(this.jsPath + '/' + this.appNS);
	this.template('js/APP/main.js', this.jsPath + '/' + this.appNS + '/main.js');

	if (this.createController) {
		this.mkdir(this.jsPath + '/' + this.appNS + '/controllers');
		this.template('js/APP/controllers/controller.js', this.jsPath + '/' + this.appNS + '/controllers/' + this.controllerName + '.js');
	}
};
