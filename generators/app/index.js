'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  games = [];
  addGame = true;
  props;
  async prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the awesome ${chalk.red('generator-publisher')} generator!`)
    );

    
    const prompts = [
      {
        type: 'list',
        name: 'projectType',
        message: 'What would you like to make ?',
        default: 'game',
        choices: [
          {
            name: 'game (A typescript project)',
            value: 'game',
          }, {
            name: 'unify layer (A bundling tool)',
            value: 'unify'

          }
        ]
      },
      {
        type: 'input',
        name: 'projectName',
        message: 'Enter the name of project',
        default: this.appname
      }
    ];

     this.props = await this.prompt(prompts);
      // To access props later use this.props.projectType
      console.log(this.props.projectType);
      if(this.props.projectType == 'unify') {
      while(this.addGame){
        const unifyPrompts = [
          {
            type: 'input',
            name: 'game',
            message: 'Enter the name of game you want to use',
            default: "jquery"
          },
          {
            type: 'confirm',
            name: 'again',
            message: 'Would you like to add more?',
            default: false
          }
        ];
       var unifyProps = await this.prompt(unifyPrompts);
          // To access props later use this.props.projectType;
          this.games.push(unifyProps.game);
          this.addGame = unifyProps.again;
      
      }
   
  }
  }

 

  
  
  

  writing() {
    if(this.props.projectType == 'game') {
      this.fs.copyTpl(
        this.templatePath('game/package_json'),
        this.destinationPath('package.json'),
        { title: this.props.projectName }
      );

      this.fs.copyTpl(
        this.templatePath('game/src'),
        this.destinationPath('src')  
      );

      this.fs.copyTpl(
        this.templatePath('game/travis.yml'),
        this.destinationPath('.travis.yml')  
      );

      this.fs.copyTpl(
        this.templatePath('game/tsconfig_json'),
        this.destinationPath('tsconfig.json')  
      );

      this.fs.copyTpl(
        this.templatePath('game/tsconfig_build_json'),
        this.destinationPath('tsconfig.build.json')  
      );
    } else {
      this.fs.copyTpl(
        this.templatePath('unify/package_json'),
        this.destinationPath('package.json'),
        { title: this.props.projectName,
          games:this.games,
        }
      );

      for (var ind in this.games) {
        this.fs.copyTpl(
          this.templatePath('unify/src/gameTemplate.ts'),
          this.destinationPath('src/'+this.games[ind]+".ts"),
          {
            name: this.games[ind]
          }  
        );

      }

      this.fs.copyTpl(
        this.templatePath('unify/_babelrc.js'),
        this.destinationPath('.babelrc.js')  
      );

      this.fs.copyTpl(
        this.templatePath('unify/tsconfig_json'),
        this.destinationPath('tsconfig.json')  
      );
      

      this.fs.copyTpl(
        this.templatePath('unify/webpack_config.js'),
        this.destinationPath('webpack.config.js'),
        {
          entries:this.games
        }  
      );

      this.fs.copyTpl(
        this.templatePath('unify/webpack_server_config.js'),
        this.destinationPath('webpack.server.config.js'),
        {
          entries:this.games
        }  
      );

      this.fs.copyTpl(
        this.templatePath('unify/express'),
        this.destinationPath('express'),
        {
          entries:this.games
        }  
      );

      this.fs.copyTpl(
        this.templatePath('unify/template.html'),
        this.destinationPath('precompute/index.html'),
        {
          games:this.games,
          seperator:'-'
        }  
      );
    }
  }

  install() {
    this.installDependencies({
      bower: false
    });
  }
};
