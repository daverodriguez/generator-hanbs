define(['hbs'], function(HBS) {
	/**
	 * @constructor
	 * @alias <%= packageName %>
	 * @classdesc An example class.
	 * @requires HBS
	 */
	var module = function() {
		this.init();
	};

	/**
	 * @private
	 */
	module.prototype.init = function() {

	};

	/**
	 * A public function
	 */
	module.prototype.publicFunction = function() {

	};

	/**
	 * A static function
	 * @static
	 */
	module.staticFunction = function() {

	};

	HBS.namespace('<%= packageName %>', module);
	return module;
});