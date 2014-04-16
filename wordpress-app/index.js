'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

var WordpressappGenerator = module.exports = function WordpressappGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.NamedBase.apply(this, arguments);

  console.log('You called the wordpressApp subgenerator with the argument ' + this.name + '.');
};

util.inherits(WordpressappGenerator, yeoman.generators.NamedBase);

WordpressappGenerator.prototype.files = function files() {
  this.copy('somefile.js', 'somefile.js');
};
