/*
 * grunt_coffee_import
 * https://github.com/victor.potasso/slikland-coffee-import
 *
 * Copyright (c) 2014 Victor Potasso
 * Licensed under the MIT license.
 */

'use strict';

var fs = require('fs');
var path = require('path');

module.exports = function(grunt)
{
	var coffeeClasses;

	grunt.registerMultiTask('grunt_coffee_import', 'Import for Coffeescript', function()
	{
		var compileOptions = {}
		var options = this.options();
		var classPath = options.classPath || '';
		var deployPath = options.deployPath || '';
		var classes = this.data;
		if(this.target === 'files')
		{
			var i=0;
			while(i<classes.length)
			{
				var file = classPath + classes[i];
				coffeeClasses = [];
				checkImports(file, classPath);
				coffeeClasses.push(file);

				// add options to compiler
				var deployFile = deployPath + classes[i].replace('.coffee', '.js');
				if(coffeeClasses.length > 0)
				{
					grunt.loadNpmTasks('grunt-contrib-coffee');
					var id = classes[i].replace('.coffee','');
					compileOptions[id] = {options:{},files:{}};
					compileOptions[id]['options']['join'] = true;
					compileOptions[id]['files'][deployFile] = coffeeClasses;
				}

				grunt.log.writeln(classes[i] + " is checked.");

				i++;
			}

			// Run compile
			grunt.config('coffee',compileOptions);
			grunt.task.run("coffee");
		}
		else {
			grunt.log.error('node `files` is missing.');
		}
	});

	function checkImports(p_file,p_classPath)
	{
		if (fs.existsSync(p_file))
		{
			var contents = fs.readFileSync(p_file, 'utf8');
			var regex = /#import\s+([^\s]+)/g;
			var match;
			while(match = regex.exec(contents))
			{
				var file = p_classPath + match[1].replace(/\./g,'/') + '.coffee'
				coffeeClasses.unshift(file);
				checkImports(file, p_classPath)
			}
		}
		else
		{
			grunt.log.error(p_file + ' not exist.');
		}
	}
};
