#ES6 => Common Js
<br/>
#install babel 2018 
<br/>
    1. Install cli babel
<br/>
        cmd : npm install --save-dev babel-cli
<br/>
        cmd : npm install babel-preset-env --save-dev
<br/>
    2. copy .babelrc file inside my project to ur peoject
<br/>
    3. add script to package.json for building and save in folder built
<br/>
    4. Sometime babel give you some support in ES6 so we need to install plug-in:
<br/>
      #Spread Operator : 
<br/>
        .cmd: npm install --save-dev babel-plugin-transform-object-rest-spread
<br/>
        .add: dependacies to babel file.
<br/>
***** Note : file that we run it in ./build.....not ./src
<br/>
#install nodemon
<br/>
__1. Install nodemon module
<br/>
        ____cmd : npm install nodemon
<br/>
    2. Copy nodemon.json inside mine to your project for customize nodemon options.
<br/>
    3. #Key : 
<br/>
        watch: is used for watch what change in that. ex : ["src"] // ./src
<br/>
        ext: identifies extension ex: "js" //js
<br/>
        ignore: what we want to ignore to want
<br/>
        exec: execute when we call nodemon Ex: node build/index.js //run nodejs project at ./build and file index.js
<br/>
#install eslint for es version in project for checking code in project
<br/>
    1. cmd: npm install eslint --save-dev //add to dev dependacies
<br/>
    2. you can init by urself [ cmd: eslint --init ] or copy mine to ur project
<br/>
#install prettier for format code in vscode clean and very clean
<br/>
    1. Install modules
<br/>
        cmd: npm install --save-dev --save-exact prettier
<br/>
    2. Copy rules into your project mine have some if u have a better plz give me too $.$
<br/>
***** Note : Prettier with eslint, babel need :
<br/>
    1. Install modules: 
<br/>
      cmd: npm install eslint-config-prettier
<br/>
      cmd: npm install eslint-config-babel babel-eslint
<br/>
      cmd: npm install eslint-plugin-flowtype
<br/>
#install editor-config for set editor as we want
<br/>
    1. Install modules 
<br/>
    2. copy my file to your project
<br/>
