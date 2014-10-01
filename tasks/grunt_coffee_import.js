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
	var compileOptions;
	var options;
	var classPath;
	var deployPath;
	var classes;

	grunt.registerMultiTask('grunt_coffee_import', 'Import for Coffeescript', function()
	{
		compileOptions = {}
		options = this.options();
		classPath = options.classPath || '';
		deployPath = options.deployPath || '';
		classes = this.data;
		if(this.target === 'files')
		{
			var i=0;
			while(i<classes.length)
			{
				var file = classPath + classes[i];
				coffeeClasses = [];
				checkImports(file, classPath, '');

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

				grunt.log.writeln(classes[i] + " is compiled successfully.");

				i++;
			}

			// Run compile
			grunt.config('coffee',compileOptions);
			grunt.task.run("coffee");
		}
		else {
			grunt.fail.warn('node `files` is missing.');
		}
	});

	function checkImports(p_file,p_classPath, p_parent)
	{
		if (fs.existsSync(p_file))
		{
			var contents = fs.readFileSync(p_file, 'utf8');
			var regex = /#import\s+([^\s]+)/g;
			var match;
			while(match = regex.exec(contents))
			{
				var file = p_classPath + match[1].replace(/\./g,'/') + '.coffee'
				if (fs.existsSync(p_file))
				{
					coffeeClasses.unshift(file);
					checkImports(file, p_classPath, p_file)
				}
				else {
					grunt.fail.warn(file + ' not exist.');
				}
			}
		}
		else
		{
			fileNotFound(p_file, p_parent)
		}
		coffeeClasses.push(p_file);
	}

	function fileNotFound(p_file, p_context)
	{
		var file = p_file.replace(classPath, '');
		var context = p_context.replace(classPath, '');
		// var contents = fs.readFileSync(p_context, 'utf8');
		// var line = null;
		// console.log(contents);
		grunt.fail.warn("Error to import " + file + " from " + context);
	}
};
