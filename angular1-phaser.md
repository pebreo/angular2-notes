

### `index.html` - the webpage
```html
```

### `app.js` - 
```javascript
// the app module
angular.module('app', [
   'ui.router',
    require('./menu').name,  // use the CommonJS require syntax (use Gulp to handle transpiling this syntax)
    require('./game).name
]).config(function($urlRouterProvider){
    $urlRouterProvider.otherwise('/menu');
})

// the game module
angular.module('app.game', [ui.router'])
.config(function($urlRouterProvider){
    // we'll define our game states here
})

// game Phaser game canvas directive
angular.module('app.game').directive('gameCanvas', function($window, $injector){
      // will allow use to communicate with the Phaser game
      linkFn = function(scope, ele, attrs){
          // import the Phaser code here
          require('./main.js');  
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
```javascript
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


