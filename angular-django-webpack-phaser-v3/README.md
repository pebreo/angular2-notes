
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

## Communicating between Phaser and Angular using `scope.$on` and `scope.$emit`
```

```
In the controller or service
```
```


## State snippet
```
var StateNAME = (function(game) {
});

StateNAME.prototype = {
    preload: function () {

    },

    create: function () {
        console.log('ready zombies');
    },

    update: function () {

    },


};

module.exports = StateNAME;

// phaser_main.js

var StateNAME = require('./states/StateNAME.js');

game.state.add('StateNAME', StateNAME);
```

## Sources / inspired by

http://www.zekechan.net/getting-started-html5-game-development-pong2/

https://github.com/fullstackio/ng-game

https://github.com/ezhome/django-webpack-loader

Talk about Angular+Phaser

https://www.youtube.com/watch?v=8giyBgNhfkU&t=1005s