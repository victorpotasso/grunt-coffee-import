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
				var coffeeClasses = checkImports(file, classPath, '');

				coffeeClasses = clearDuplicates(coffeeClasses);

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
		var coffeeClasses = [];
		if (fs.existsSync(p_file))
		{
			var contents = fs.readFileSync(p_file, 'utf8');
			var regex = /#import\s+([^\s]+)/g;
			var match;

			var i = 0;
			var arr;
			while(match = regex.exec(contents))
			{
				var file = p_classPath + match[1].replace(/\./g,'/') + '.coffee'
				if (fs.existsSync(p_file))
				{
					coffeeClasses[i++] = file
					arr = checkImports(file, p_classPath, p_file);
					if(arr.length > 0)
					{
						coffeeClasses = [].concat(arr, coffeeClasses);
						i = coffeeClasses.length;
					}
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
		coffeeClasses[i++] = p_file;
		return coffeeClasses;
	}

	function fileNotFound(p_file, p_context)
	{
		var file = p_file.replace(classPath, '');
		var context = p_context.replace(classPath, '');
		grunt.fail.warn("Error to import " + file + " from " + context);
	}

	function clearDuplicates(arr)
	{
		var newArr = [];
		var i = -1;
		var l = arr.length
		var c = 0;
		var f;
		while(++i < l)
		{
			f = arr[i];
			if(newArr.indexOf(f) >= 0)
			{
				continue;
			}
			newArr[c++] = f;
		}
		return newArr;
	}
};