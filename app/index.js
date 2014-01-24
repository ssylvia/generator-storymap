'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var StorymapGenerator = module.exports = function StorymapGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(StorymapGenerator, yeoman.generators.Base);

StorymapGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [{
    name: 'appTitle',
    message: 'What is the title of your app?'
  }];

  this.prompt(prompts, function (props) {
    this.appTitle = props.appTitle;

    cb();
  }.bind(this));
};

StorymapGenerator.prototype.app = function app() {
  this.mkdir('app');
  this.mkdir('app/templates');

  this.copy('_package.json', 'package.json');
  this.copy('_bower.json', 'bower.json');
};

StorymapGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};
