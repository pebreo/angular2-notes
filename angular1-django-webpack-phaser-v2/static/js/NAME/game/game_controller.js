angular.module('app.game')
.controller('GameController',["$scope","$stateParams", "$window",  function($scope, $stateParams, $window) {
  $scope.players = [];
  $scope.mapId = $stateParams.id || '1';

  $scope.window_width = $window.innerWidth;
  $scope.window_height = $window.innerHeight;

  $scope.$on('game:getAvailablePlayers', function(players) {
    $scope.players = players;
  });

  $scope.$on('$destroy', function() {
    $scope.$emit('player leaving');
  });

}]);
