module.exports =
angular.module('app.game', ['ui.router'])
.config(['$stateProvider', function($stateProvider) {
  $stateProvider
    .state('game', {
      url: '/game',
      controller: 'GameController',
      template: '<div>\
        <div id="phaserCanvas" phaser-canvas="foo" width="window_width" height="window_height"></div>\
      </div>',

    })
}]);

require('./game_controller.js')
require('./game_canvas.js')
