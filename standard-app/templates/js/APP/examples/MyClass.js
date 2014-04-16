(function() {
	/**
	 * @constructor
	 * @alias <%= appNS %>.MyClass
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
		// Test calling all three types of functions
		this.publicFunction();
		module.staticFunction();
		privateFunction();
	};

	/**
	 * A public function
	 */
	module.prototype.publicFunction = function() {
		console.log('MyClass: I\'m a public function!');
	};

	/**
	 * A static function
	 * @static
	 */
	module.staticFunction = function() {
		console.log('MyClass: I\'m a static function!');
	};

	/**
	 * A private function that can be called by other functions in this class but not externally
	 * @internal
	 */
	var privateFunction = function() {
		console.log('MyClass: I\'m a private function. Shhh!');
	};

	HBS.namespace('<%= appNS %>.MyClass', module);
}());