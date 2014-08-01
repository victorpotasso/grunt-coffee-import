/*
 * grunt_coffee_import
 * https://github.com/victorpotasso/grunt-coffee-import
 *
 * Copyright (c) 2014 Victor Potasso
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt)
{
	grunt.initConfig(
	{
		grunt_coffee_import:
		{
			options:
			{
				classPath: 'test/src/classes/',
				deployPath:'test/deploy/'
			},
			files:
			[
				'Preloader.coffee',
				'Main.coffee'
			]
		}
	});

	grunt.loadTasks('tasks');
	grunt.registerTask('default', ['grunt_coffee_import']);
};
