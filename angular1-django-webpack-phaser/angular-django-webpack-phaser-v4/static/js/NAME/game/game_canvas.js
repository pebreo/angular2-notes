angular.module('app.game')
.directive('phaserCanvas', ['$window','$injector', function($window, $injector) {

  var linkFn = function(scope, ele, attrs ){
      var w = angular.element($window);
      w.bind('resize', function(evt) {
          //console.log(evt.target.screen.width);
      });
      require('./phaser_main')(scope, ele, attrs, scope.window_width, scope.window_height);

  };
  return {
    scope: {
      ngModel: '=',
      window_width: '=width',
      window_height: '=height'
    },
    template: '<div id="game-canvas"></div>',
    compile: function(iEle, iAttrs) {
      return linkFn;
    }
  }
}


]);
