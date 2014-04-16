(function() {
	/**
	 * @constructor
	 * @alias <%= appNS %>.MyWidget
	 * @classdesc An example widget.
	 * @param {string|HTMLElement} target A jQuery selector, the DOM element to widget-ize.
	 * @param {Object} options A list of options to override <code><strong>defaults</strong></code>.
	 * @requires HBS
	 * @requires jQuery
	 */
	var module = function(target, options) {
		// Instance is a great way to get a reference back to the widget or class from inside functions, event handlers,
		// etc., that change the value of "this"
		var instance = this;

		return $(target).each(function() {
			instance.init(this, options || {});
		});
	};

	/**
	 * Default options for the widget.
	 * @type {Object}
	 * @property {string} [color="#f00"] The color to turn widget text.
	 * @property {string} [fontWeight="bold"] The font weight for widget text.
	 * @property {string} [clickMessage="Widget was clicked!"] The message to display when a widget was clicked.
	 */
	module.prototype.defaults = {
		color: '#f00',
		fontWeight: 'bold',
		clickMessage: 'Widget was clicked!'
	};

	/**
	 * @private
	 */
	module.prototype.init = function(target, options) {
		// Create a local copy of options by extending the defaults with any user-specified options
		this.options = $.extend({}, this.defaults, options);

		this.domElement = $(target);

		// Create a reference back to the widget on the DOM element. You can get back to the widget from anywhere
		// by calling $('.dom-element').data('widget-mywidget');
		this.domElement.data('widget-mywidget', this);

		// This is just a sample of what you might do with a widget
		this.domElement.css(this.options);
		this.handleClicks();
	};

	/**
	 * Handle clicks to this widget
	 * @private
	 */
	module.prototype.handleClicks = function() {
		var instance = this;

		this.domElement.on('click', function() {
			alert(instance.options.clickMessage);
		});
	};

	HBS.namespace('<%= appNS %>.MyWidget', module);
}());