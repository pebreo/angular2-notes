
## App creation checklist

* Create `NAME.webpack.config.js`
* Create `js/NAME/index.js`
* Create `bundle/js/NAME/`
* Edit `settings.py`
* Edit `templates/NAME/index.html`
* Edit webpack and substitute name

## INSTALLATION
```
# if you don't have node 9.x
brew install node
npm install --save-dev

# or manual

for windows (install "git for windows" then open: git cmd)
npm install --save-dev webpack webpack-cli 
npm install --save-dev @uirouter/angularjs 

# django
pip install django-webpack-loader

```

## WATCH
```
# compile
./node_modules/.bin/webpack --config NAME.webpack.config.js --watch


# watch
./node_modules/.bin/webpack --config NAME.webpack.config.js --watch
```

## How AngularJS inserts the Phaser canvas

The `game` state has a certain template which defines a
div of `phaser-canvas` which coincides with the directive `phaserCanvas`. 
By angularjs convention, `phaserCanvas` directive is attached to the
element defined as `<div phaser-canvas></div>`  or `<phaser-canvas></phaser-canvas>`.

The `phaserCanvas` directive then inserts content to the `<dive phaser-canvas>`
element which is defined in it's own template definition. In this project's
case, we define the contents of the directive to be `<div id="game-canvas"></div>`
which the `new Phaser()` declaration will attach it's own `<cnavas>` element.

So basically it will look like this:
```html
<!-- inserted element by ui-router and attached to phaserCanvas directive -->
<div phaser-canvas>   
   <!-- inserted by phaserCanvas directive -->
  <div id="game-canvas">
     <!--  attached as child by phaser -->
     <canvas>
     </canvas>
  </div>
</div>
```

## Communicating between Phaser and Angular using `scope.$on`, `scope.$emit`, and
`$broadcast`.
When you want to send information to Phaser from Angular you would do something like this:
```javascript
// in angular
angular.module('app.overlay')
.controller('OverlayController', function($rootScope, $scope, players, feed) {
  var ctrl = this;

  ctrl.turnOffMusic = function() {
    $rootScope.$broadcast('game:toggleMusic');
  };

});


// in phaser
 scope.$on('game:toggleMusic', function() {
   StateMain.toggleMusic()
 });
```

When you want to send information to Angular from Phaser you would do this
```javascript
// phaser
this.game.scope.$emit('game:wrongWay', {});

// angular

angular.module('app.overlay')
.controller('OverlayController', function($rootScope, $scope, players, feed) {
  var ctrl = this;

  $rootScope.$on('game:wrongWay', function(evt, data) {
      console.log('wrong way');
  });

});

```


## State snippet
```
// ./states/index.js
var Game = {
  name: 'NAME',

};

require('./StatePreloader')(Game);
require('./StateMain')(Game);

module.exports = Game;

// ./states/StateMain.js
module.exports = (function(Game) {
  var g = Game;

  Game.StateMain = function(game) { };

  Game.StateMain.prototype = {
    preload: function () {
            
    },

    create: function () {
        console.log('ready main');
    },

    update: function () {

    }
  };
});


// phaser_main.js

var Game = require('./states');

game.state.add('StateNAME', Game.StateNAME);
```

## Sources / inspired by

https://gist.github.com/photonstorm/c4b07550ea77a6c9187d

http://www.zekechan.net/getting-started-html5-game-development-pong2/

https://github.com/fullstackio/ng-game

https://github.com/ezhome/django-webpack-loader

Talk about Angular+Phaser

https://www.youtube.com/watch?v=8giyBgNhfkU&t=1005s