# Skeleton to run a Angular+Phaser app on Django
These snippets demonstrates how to run a Angular+Phaser
game on Django. You'll notice that the Phaser code is in the `linkFn` in the `index.js`
which defines a directive called `phaserCanvas`.

For better organization, you'll probably want to use `require()` syntax
to import code. To do that, you'lle have to use `gulp` and `browserify`.

### `urls.py`
```
# DJANGO REST + ANGULAR
from django.views.generic.base import TemplateView

urlpatterns +=  [
    url(r'', TemplateView.as_view(template_name='pong/index.html')),
]
```

### `templates/index.html`
```
{% load staticfiles %}
<!doctype html>
<html>
    <head>
        <title>Pong</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

    </head>
    <body ng-app="app">
        <div ui-view></div>


        <script src='https://ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular.js'></script>
        <script src='https://cdnjs.cloudflare.com/ajax/libs/angular-ui-router/1.0.3/angular-ui-router.min.js'></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/phaser/2.6.2/phaser.min.js"></script>
        <!-- <script src="{% static 'js/pong/main.js' %}"></script> -->
        <script src="{% static 'js/pong/game/index.js' %}"></script>
        <script src="{% static 'js/pong/main.js' %}"></script>

    </body>
</html>
```

### `static/js/pong/main.js`
```
angular.module('app', [
  'ui.router',
  'app.game',
  // require('./menu').name,
  // require('./game').name,
  // require('./user').name,
  // require('./navbar').name,
  // require('./overlay').name,
  // require('./network').name,
])
.config(function($urlRouterProvider) {
  $urlRouterProvider
    .otherwise('/game');
})

```


### `static/js/pong/game/index.js`
```

angular.module('app.game', ['ui.router'])
.config(function($stateProvider) {
  $stateProvider
    .state('game', {
      url: '/game',
      template: '<div>\
        <div phaser-canvas></div>\
      </div>',

    })
})

.directive('phaserCanvas', function($window, $injector) {

  var linkFn = function(scope, ele, attrs) {
      // Phaser code here
      var gameProperties = {
          screenWidth: 640,
          screenHeight: 480,
      };

      var mainState = function(game){};
      mainState.prototype = {
          preload: function () {

          },

          create: function () {

          },

          update: function () {

          },
      };

      var game = new Phaser.Game(gameProperties.screenWidth, gameProperties.screenHeight, Phaser.AUTO, 'game-canvas');
      game.state.add('main', mainState);
      game.state.start('main');


  };

  return {
    scope: {
      ngModel: '=',
      mapId: '='
    },
    template: '<div id="game-canvas"></div>',
    compile: function(iEle, iAttrs) {
      return linkFn;
    }
  }
})

```
