(function() {
	/**
	 * @exports <%= appNS %>.controllers.<%= controllerName %>
	 * @requires HBS
	 */
	var module = {};

	module.init = function() {
		console.log('Hi from <%= controllerName %>.init()');
	};

	module.examplePage = function() {
		console.log('Hi from <%= controllerName %>.examplePage()');
		<% if (createExampleClasses) { %>
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
		<% } %>
	};

	HBS.namespace('<%= appNS %>.controllers.<%= controllerName %>', module);
}());