# grunt-coffee-import

> Import for Coffeescript

* Source: [github.com/victorpotasso/grunt-coffee-import](https://github.com/victorpotasso/grunt-coffee-import)
* NPM: [npmjs.org/package/grunt_coffee_import](https://www.npmjs.org/package/grunt-coffee-import)
* Home Page: [victorpotasso.com/](http://www.victorpotasso.com)
* Twitter: [@victorpotasso](https://twitter.com/victorpotasso)

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-coffee-import --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-coffee-import');
```

## The "grunt_coffee_import" task

### Overview
It helps you work with external coffee files. You have just to write the import command e.g.`#import lib.Class1`.

### Options

#### options.classPath
Type: `String`
Default value: `',  '`

A string value that represents the classes path.

#### options.deployPath
Type: `String`
Default value: `'.'`

A string value that represents the path to deploy.

### Usage Example

```js
grunt.initConfig({
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
```
