

### `index.html` - the webpage
```html
```

### `app.js` - 
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


### `main.js` - the phaser game
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
```


