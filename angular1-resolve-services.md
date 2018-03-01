# Simple greeting service
### the services
```javascript
app.factory("messageService", function($q){
    return {
        getMessage: function(){
            return $q.when("Hello World!");
        }
    };
});

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
});
```

### the controller for `/news` state
```javascript
app.controller("newsController", function($scope, message, greeting){
  $scope.message = message;
  $scope.greeting = greeting;
});
```

# Combining promises from different services
### service
```javascript
app.factory("newsControllerInitialData", function(messageService, greetingService, $q){
  return function(){
      // assign the two promises
      var message = messageService.getMessage();
      var greeting = greetingService.getGreeting();
      
      // only resolve and combine the two promises 
      //   using the `$q.all()` function
      return $q.all([message, greeting]).then(function(results){
        
        return {
            message: results[0];
            greeting: results[1];
        }
      })
  }
});
```

### state provider
```javascript
.when("/news", {
  templateUrl: "newsView.html",
  controller: "newsController",
  resolve: {
     initialData: function(newsControllerInitialData) {
            return newsControllerInitialData();
     }
  }
});
```

### controller for the `/news` state
```javascript
app.controller("newsController",function($scope, initialData){
    $scope.message = initialData.message;
    $scope.greeting= initialData.greeting;
});
```



https://odetocode.com/blogs/scott/archive/2014/05/20/using-resolve-in-angularjs-routes.aspx
