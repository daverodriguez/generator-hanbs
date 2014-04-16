(function() {
	var singleton = function () {
		throw new Error('Use MySingleton.getInstance()!');
	};

	/**
	 * Singleton init
	 */
	var init = function() {
		/**
		 * @constructor
		 * @alias <%= appNS %>.MySingleton
		 * @classdesc An example Singleton. Use MySingleton.getInstance() to get a reference to the Singleton.
		 */
		var module = function() {
			/**
			 * A stored value
			 * @internal
			 * @type number
			 */
			this.value;
		};

		/**
		 * Retrieves the stored value
		 * @returns {number}
		 */
		module.prototype.getValue = function() {
			return this.value;
		};

		/**
		 * Sets the stored value
		 * @param {number} val
		 */
		module.prototype.setValue = function(val) {
			this.value = val;
		};

		return module.prototype;
	};

	/**
	 * @desc Gets an instance of MySingleton.
	 * @returns {MySingleton}
	 */
	singleton.getInstance = function () {
		this.instance = this.instance || init();
		return this.instance;
	};

	HBS.namespace('<%= appNS %>.MySingleton', singleton);
}());