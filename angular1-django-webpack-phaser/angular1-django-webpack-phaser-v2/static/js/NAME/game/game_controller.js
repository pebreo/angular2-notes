angular.module('app.game')
.controller('GameController',["$scope","$stateParams", "$window", "$rootScope",  function($scope, $stateParams, $window, $rootScope) {


  $scope.window_width = $window.innerWidth;
  $scope.window_height = $window.innerHeight;

  $rootScope.$on('game:mainStateLoad', function(evt, data) {
    console.log('mainState loaded');
  });

  $scope.$on('$destroy', function() {
    $scope.$emit('player leaving');
  });

}]);
