angular.module('app.game')
.controller('GameController',["$scope","$stateParams", "$window", "$rootScope",  function($scope, $stateParams, $window, $rootScope) {

  $scope.window_width = $window.innerWidth;
  $scope.window_height = $window.innerHeight;

  // phaser event listener
  $rootScope.$on('game:wrongWay', function(evt, data) {
      angular.element("#wrongWay")[0].style.display = "block";
  });

  $rootScope.$on('game:rightWay', function(evt, data) {
      angular.element("#wrongWay")[0].style.display = "none";
  });

  $scope.$on('$destroy', function() {
    $scope.$emit('player leaving');
  });

}]);
