/*global module:false*/
module.exports = function (grunt) {

	// Project configuration.
	grunt.initConfig({
		// Metadata.
		pkg: grunt.file.readJSON('package.json'),
		connect: {
			server: {
				options: {
					port: 3000,
					keepalive: true,
					livereload: true,
					base: 'src/',
					hostname: '*'
				}
			}
		},
		requirejs: {
			compile: {
				options: {
					mainConfigFile: "src/js/<%= appNS %>/main.js",
					dir: 'src/js-built',
					appDir: 'src/js',
					optimize: 'uglify2',
					skipDirOptimize: true,
					//generateSourceMaps: true,
					//preserveLicenseComments: false,
					findNestedDependencies: true,
					modules: [
						//First set up the common build layer.
						{
							//module names are relative to baseUrl
							name: '<%= appNS %>/main'
						},
						//Now set up a build layer for each main layer, but exclude
						//the common one. "exclude" will exclude nested
						//the nested, built dependencies from "common". Any
						//"exclude" that includes built modules should be
						//listed before the build layer that wants to exclude it.
						{
							//module names are relative to baseUrl/paths config
							name: '<%= appNS %>/controllers/mysection',
							exclude: ['<%= appNS %>/main']
						}
					]
				}
			}
		}
	});

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-requirejs');

	// Default task.
	grunt.registerTask('default', []);

};
