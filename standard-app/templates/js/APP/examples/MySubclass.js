(function() {
	/**
	 * @constructor
	 * @alias <%= appNS %>.MySubclass
	 * @extends <%= appNS %>.MyClass
	 * @classdesc An example subclass.
	 * @requires HBS
	 */
	var module = HBS.extend(<%= appNS %>.MyClass, function() {
		this.init();
	});

	/**
	 * @private
	 */
	module.prototype.init = function() {
		// Call the init() method of my parent.
		// You have to use .call(this) to explicitly set the value of (this) to the child in the parent's methods.
		this._super.init.call(this);
	};

	/**
	 * Does something. Overrides <%= appNS %>.MyClass.publicFunction
	 */
	module.prototype.publicFunction = function() {
		console.log('SubClass: I\'m overriding my parent\'s public function!');
	};

	HBS.namespace('<%= appNS %>.MySubclass', module);
}());