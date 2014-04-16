{
	dir: '../web/js-built/APP',
	//mainConfigFile: '../../src/main/webapp/content/js/common.js',
	appDir: '../web/js/APP',
	baseUrl: './',
	optimize: 'uglify2',
	skipDirOptimize: true,
	//generateSourceMaps: true,
	//preserveLicenseComments: false,
	findNestedDependencies: true,
	modules: [
		//First set up the common build layer.
		{
			//module names are relative to baseUrl
			name: 'main'
		},
		//Now set up a build layer for each main layer, but exclude
		//the common one. "exclude" will exclude nested
		//the nested, built dependencies from "common". Any
		//"exclude" that includes built modules should be
		//listed before the build layer that wants to exclude it.
		{
			//module names are relative to baseUrl/paths config
			name: 'APP/controllers/mySection',
			exclude: ['common']
		}
	]
}