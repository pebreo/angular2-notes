

### `index.html` - the webpage
```html
```

### `app.js` - 
```javascript
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


