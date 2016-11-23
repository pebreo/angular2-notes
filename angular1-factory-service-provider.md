Services vs. Factories vs. Providers
-------------------------------------
It's important to understand the similarities and differences of services, factories, and providers.
All three types of "helpers" make it easier for the developer to stay DRY.
The differences are not difficult to understand:
* A service is already instatiated - you have to add properties to `this`.
* A factory returns an object.
* A provider is the only service that can be passed into `config()`


#### Factory example
```javascript
app.factory('myFactory', function($http, $q){
    var service = {};
    var baseUrl = 'https://foo.com/search?term=';
    var _artist = '';
    var _finalUrl = '';

    var makeUrl = function(){
        _artist = _artist.split(' ').join('+');
        _finalUrl = baseUrl + _artist + '&callback=JSON_CALLBACK';
        return _finalUrl;
    };
    service.setArtist = function(artist) {
        _artist = artist;
    };
    service.getArtist = function(){
        return _artist;
    };
    service.callItunes = funuction(){
        makeUrl();
        var deferred = $q.defer();
        $http({
                method: 'JSONP',
                url: _finalUrl

        }).success(function(data){
            deferred.resolve(data);
        }).error(function(){
            deferred.reject('There was an error');
        });
        return deferred.promise;
    };

    return service;
});

app.controller('myCtrl', function($scope, myFactory){
    $scope.data = {};
    $scope.updateArtist = function(){
        myFactory.setArtist($scope.data.artist);
    };
    $scope.submitArtist = function(){
        myFactory.callItunes().
            then(function(data){
                $scope.data.artistData = data;
            }, function(data){ alert(data)
        })
    };
});
```

#### Provider
```javascript
app.controller('myCtrl', function($scope, myProvider){
    $scope.artist = myProvider.getArtist();
    $scope.data.thingFromConfig = myProvider.thingOnConfig;
})
app.provider('myProvider', function(){
    this._artist = '';
    this.thingFromConfig = '';
    this.$get = function(){
        var that = this;
        getArtist: function(){
            return that._artist;
        },
        thingOnConfig: that.thingFromConfig;
    };
});

app.config(function(myProvider){
    myProvider.thingFromConfig = 'This was set in config()';
});
```


#### Service
```javascript
app.service('myService', function($http, $q){
    var baseUrl = 'https://foo.com/search?term=';
    var _artist = '';
    var _finalUrl = '';

    var makeUrl = function(){
        _artist = _artist.split(' ').join('+');
        _finalUrl = baseUrl + _artist + '&callback=JSON_CALLBACK';
        return _finalUrl;
    };
    this.setArtist = function(artist) {
        _artist = artist;
    };
    this.getArtist = function(){
        return _artist;
    };
    this.callItunes = funuction(){
        makeUrl();
        var deferred = $q.defer();
        $http({
                method: 'JSONP',
                url: _finalUrl

        }).success(function(data){
            deferred.resolve(data);
        }).error(function(){
            deferred.reject('There was an error');
        });
        return deferred.promise;
    };    
});

app.controller('myCtrl', function($scope, myService){
    $scope.data = {};
    $scope.updateArtist = function(){
        myService.setArtist($scope.data.artist);
    };
    $scope.submitArtist = function(){
        myService.callItunes().
            then(function(data){
                $scope.data.artistData = data;
            }, function(data){ alert(data)
        })
    };
});
```
Source:


https://tylermcginnis.com/angularjs-factory-vs-service-vs-provider-5f426cfe6b8c#.4ps9hfs0c
