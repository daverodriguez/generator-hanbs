# generator-hanbs

A [Yeoman](http://yeoman.io) generator for scaffolding HanBootStrap into all types of projects. Consolidated from the generator-hbs-standard, generator-hbs-requirejs, and generator-hanbs-wp projects.

## How to use

- Install with NPM:
```npm install -g generator-hanbs```
- Open a console at the the root of your project
- Enter `yo hanbs` and follow the prompts to scaffold your project

## New features

Version 0.1.2 adds a new "class" subgenerator that you can use to scaffold HanBS-compatible classes. The syntax is:
`yo hanbs:class ClassName`

If you add dots or slashes to the class name, the class will be put into a subfolder, e.g.

As of version 0.1.0, your initial settings will be saved to `hanbs.json` for future use.

## Scaffolding controllers
- Open a console at the root of your project
- Enter `yo hanbs:controller "myController"`
- If you have a saved hanbs.json file, your settings will be loaded. Otherwise you'll be prompted for the file path and namespace.

Enjoy!
