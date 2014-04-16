/**
 * @exports <%= appNS %>.controllers.mySection
 * @requires HBS
 * @requires <%= appNS %>/examples/MyClass
 * @requires <%= appNS %>/examples/MySubclass
 * @requires <%= appNS %>/examples/MySingleton
 * @requires <%= appNS %>/examples/MyWidget
 */
define([
	'hbs',
	// Remove these example classes if you don't need them. Don't forget to remove the references below.
	'<%= appNS %>/examples/MyClass',
	'<%= appNS %>/examples/MySubclass',
	'<%= appNS %>/examples/MySingleton',
	'<%= appNS %>/examples/MyWidget'
], function(HBS) {
	var module = {};

	module.init = function() {
		console.log('Hi from mySection.init()');
	};

	module.myPage = function() {
		console.log('Hi from mySection.myPage()');

		// Make a new MyClass
		console.log('#----- <%= appNS %>.MyClass -----#');
		var m = new <%= appNS %>.MyClass();

		// Make a new Subclass
		console.log('#----- <%= appNS %>.MySubclass -----#');
			var c = new <%= appNS %>.MySubclass();
				console.log("<%= appNS %>.MySubclass instanceof <%= appNS %>.MyClass: " + (c instanceof <%= appNS %>.MyClass) );

		// Get a reference to a Singleton
		console.log('#----- <%= appNS %>.MySingleton -----#');
		//var s = new <%= appNS %>.MySingleton(); // This will throw an error
		var s = <%= appNS %>.MySingleton.getInstance();
		console.log('Setting value to 5');
		s.setValue(5);
		console.log('s.getValue() is ' + s.getValue());

		// Get another reference to prove we're manipulating the same object
		console.log('Getting a second MySingleton instance');
		var s2 = <%= appNS %>.MySingleton.getInstance();
		console.log('s2.getValue() is ' + s.getValue());

		// Initialize some widgets
		var reds = new <%= appNS %>.MyWidget('.make-red');
		var blues = new <%= appNS %>.MyWidget('.make-blue', {
			color: '#00f',
			fontWeight: 'normal',
			fontStyle: 'italic',
			clickMessage: 'Whoa, a blue widget!'
		});
	};

	HBS.namespace('<%= appNS %>.controllers.mySection', module);
	return module;
});