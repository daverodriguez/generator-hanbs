'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

var StandardappGenerator = module.exports = function StandardappGenerator(args, options, config) {
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

util.inherits(StandardappGenerator, yeoman.generators.NamedBase);

StandardappGenerator.prototype.files = function files() {
	this.mkdir(this.jsPath + '/');
	this.mkdir(this.jsPath + '/' + this.appNS);
	this.template('js/APP/main.js', this.jsPath + '/' + this.appNS + '/main.js');

	this.mkdir(this.jsPath + '/lib');
	this.template('js/lib/hbs.js', this.jsPath + '/' + 'lib/hbs.js');
	this.template('js/lib/jquery-1.10.2.min.js', this.jsPath + '/' + 'lib/jquery-1.10.2.min.js');
	this.template('js/lib/modernizr-2.6.2.min.js', this.jsPath + '/' + 'lib/modernizr-2.6.2.min.js');

	this.controllerPath = '';
	if (this.createExampleClasses) {
		this.controllerPath = this.appNS + '.controllers.' + this.controllerName;

		this.mkdir(this.jsPath + '/' + this.appNS + '/examples');
		this.template('js/APP/examples/MyClass.js', this.jsPath + '/' + this.appNS + '/examples/MyClass.js');
		this.template('js/APP/examples/MySingleton.js', this.jsPath + '/' + this.appNS + '/examples/MySingleton.js');
		this.template('js/APP/examples/MySubclass.js', this.jsPath + '/' + this.appNS + '/examples/MySubclass.js');
		this.template('js/APP/examples/MyWidget.js', this.jsPath + '/' + this.appNS + '/examples/MyWidget.js');

		this.template('index.html', 'index.html');

		this.mkdir('css');
		this.copy('css/bootstrap.css', 'css/bootstrap.css');
	}

	if (this.createController) {
		this.mkdir(this.jsPath + '/' + this.appNS + '/controllers');
		this.template('js/APP/controllers/mysection.js', this.jsPath + '/' + this.appNS + '/controllers/' + this.controllerName + '.js');
	}
};
