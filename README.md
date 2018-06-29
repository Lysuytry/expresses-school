#ES6 => Common Js
#install babel 2018 
    1. Install cli babel
        cmd : npm install --save-dev babel-cli
        cmd : npm install babel-preset-env --save-dev
    2. copy .babelrc file inside my project to ur peoject
    3. add script to package.json for building and save in folder build
    4. Sometime babel give you some support in ES6 so we need to install plug-in:
      #Spread Operator : 
        .cmd: npm install --save-dev babel-plugin-transform-object-rest-spread
        .add: dependacies to babel file.
***** Note : file that we run it in ./build.....not ./src
#install nodemon
    1. Install nodemon module
        cmd : npm install nodemon
    2. Copy nodemon.json inside mine to your project for customize nodemon options.
    3. #Key : 
        watch: is used for watch what change in that. ex : ["src"] // ./src
        ext: identifies extension ex: "js" //js
        ignore: what we want to ignore to want
        exec: execute when we call nodemon Ex: node build/index.js //run nodejs project at ./build and file index.js
#install eslint for es version in project for checking code in project
    1. cmd: npm install eslint --save-dev //add to dev dependacies
    2. you can init by urself [ cmd: eslint --init ] or copy mine to ur project
#install prettier for format code in vscode clean and very clean
    1. Install modules
        cmd: npm install --save-dev --save-exact prettier
    2. Copy rules into your project mine have some if u have a better plz give me too $.$
***** Note : Prettier with eslint, babel need :
    1. Install modules: 
      cmd: npm install eslint-config-prettier
      cmd: npm install eslint-config-babel babel-eslint
      cmd: npm install eslint-plugin-flowtype
#install editor-config for set editor as we want
    1. Install modules 
    2. copy my file to your project
