# AngularJS + Phaser
If you want to control a Phaser-based game using AngularJS, you have
to use a directive and then pass in the `scope` as well as the `$injector`.

The `scope` allows you to send information to the Phaser game 
We use `scope.$on()` to send from Angular to Phaser ("top to bottom")
and we use `scope.$emit()` that goes from Phaser to Angular ("bottom to top").

The process is easier if you use the CommonJS syntax of `require` to make your 
code more readable and easier to debug. However, you will need to use 
Gulp which is a transpiling tool (among others things) to be able to use `require` syntax.

### `index.html` - the webpage
```html
<html>
   <head>
   </head>
   
   <body ng-app='app'>
         <div navbar></div>
         <div overlay-bar></div>
         <div class="content">
               <!-- since we are using ui provider -->
               <div ui-view></div>
         </div>
   </body>
   
   <script src='angular.js'></script>
   <script src='angular-ui-router.js'></script>
   <script src='phaser.js'></script>
   <script src='game.js'></script>
</html>
```

### `game.js` - the angular module that will control the canvas via a directive
Note that we use `require()` syntax for convenience, but that also means
that we need to use `gulp` to transpile our code.
```javascript
// the app module
angular.module('app', [
   'ui.router',
    require('./menu').name, 
    require('./game').name,
]).config(function($urlRouterProvider) {
    $urlRouterProvider.otherwise('/menu');
});

// the game module
angular.module('app.game', [ui.router'])
.config(function($urlRouterProvider) {
    // we'll define our game states here
});

// game Phaser game canvas directive
angular.module('app.game').directive('gameCanvas', function($window, $injector){
      // will allow use to communicate with the Phaser game
      linkFn = function(scope, ele, attrs) {
          // import the Phaser code here
          require('./main.js')(
            scope,
            scope.players,
            scope.mapId,
            $injector
          );  
      };
      
      // directive definition
      return {
        scope: {
          players: '='
        },
        template: '<div id="gameCanvas"></div>',
        link: linkFn
      }
})

```


### `main.js` - the Phaser game that will control a canvas
This code in is imported to the `app.game` directive using the `require` syntax.
Note that the code has to be as a `(function(){})` in a `module.exports` object
in order to by imported using the `require` syntax.
```javascript
module.exports = (function(scope, players, mapId, injector) {
      // Build the game object
      var height = parseInt(),
        width = parseInt()
      // note that element is the angular style my-directive naming syntax  
      var game = new Phaser.Game(width, height, Phaser.AUTO, 'game-canvas');
      
      // Load our custome Game object
      var Game   = require('./states'), 
          states = Game.States;
          
      // Add our game states
      game.state.add('Boot', states.Boot);
      game.state.add('Preloader', states.Preloader);
      game.state.add('MainMenu', states.MainMenu);
      game.state.add('Play', states.Play);
      
      // Start the game
      game.state.start('Boot');
});
```


### gulpfile.js
```javascript
var wrapCommonjs = require('gulp-wrap-commonjs');
 
gulp.task('commonjs', function(){
  gulp.src(['app/*.js'])
    .pipe(wrapCommonjs())
    .pipe(gulp.dest('build/'));
});

gulp.task('default', ['commonjs'], function () {
  browserSync({
    notify: false,
    proxy: "127.0.0.1:8000"
  });

  gulp.watch(['web/**/*.html'], reload);
  // gulp.watch(['web/static/styles/**/*.{scss,css}'], ['styles', reload]);
  // gulp.watch(['web/static/scripts/**/*.js'], ['jshint']);
  // gulp.watch(['web/static/scripts/**/*.coffee'], ['coffeelint']);
  // gulp.watch(['web/static/scripts/**/*.{js,coffee}'], ['scripts', reload]);
  // gulp.watch(['web/static/images/**/*'], reload);
});
```

### package.json
```
{
  "name": "gulpdemo",
  "version": "1.0.0",
  "description": "$ npm install -g gulp $ cd myproj $ npm install gulp --save-dev",
  "main": "gulpfile.js",
  "devDependencies": {
    "browser-sync": "^2.3.1",
    "gulp": "^3.8.11",
    "gulp-plumber": "^1.0.0",
    "gulp-uglify": "^1.1.0",
    "gulp-wrap-commonjs": "^0.1.14"
  },
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

### gulp usage
```
npm install -y gulp
gulp 
```


source:
Ari Lerner - "Building games with AngularJS"
https://www.youtube.com/watch?v=8giyBgNhfkU
