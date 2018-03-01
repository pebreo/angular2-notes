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



https://odetocode.com/blogs/scott/archive/2014/05/20/using-resolve-in-angularjs-routes.aspx
