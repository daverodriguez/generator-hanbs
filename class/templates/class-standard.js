(function() {
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

	/**
	 * A private function that can be called by other functions in this class but not externally
	 * @internal
	 */
	var privateFunction = function() {

	};

	HBS.namespace('<%= packageName %>', module);
}());