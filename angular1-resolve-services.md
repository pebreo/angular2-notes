# Simple greeting service
### the service
```javascript
app.factory("greetingService", function($q, $timeout){
  return {
    getGreeting: function(){
        var deferred = $q.defer();
        $timeout(function(){
          deferred.resolve("Allo!");
        }, 2000);
        return deferred.promise;
    }
  }
});
```
### the state provider
```javascript
.when("/news", {
  templateUrl: "newsView.html",
  controller: "newsController",
  resolve: {
      message: function(messageService){
          return messageService.getMessage();
      },
      greeting: function(greetingService){
          return greetingService.getGreeting();
      }
  }
})
```

### the controller for `/news` state
```javascript
app.controller("newsController", function($scope, message, greeting){
  $scope.message = message;
  $scope.greeting = greeting;
});
```


https://odetocode.com/blogs/scott/archive/2014/05/20/using-resolve-in-angularjs-routes.aspx
