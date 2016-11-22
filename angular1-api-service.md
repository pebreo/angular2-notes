OVERVIEW
---------

USING A FACTORY
---------------
#### Django REST Framework serializer
This is what the `serializer.py` looks like on the Django REST Framework-based
backend. All the items in `fields` are required to be posted. 
Depending on the field requirements set in `models.py` they can be blank or not.
```python
# serializer.py
from journal.models import Entry
from rest_framework import serializers

class EntrySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Entry
        fields = ('pk','entry', 'achieved_goal','created')
```

#### Usage
```javscript
// get
API.$get("", {
    success: function (data) {
        $log.log(data.results[0]);
    }
});

// post
var json_date_now = (new Date()).toJSON();
var saveData = {
    'entry': $scope.entry,
    'goal_words': 200,
    'achieved_goal': $scope.achieved_goal,
};
API.$post("", saveData, {success: successFunction});
```

#### Define a factory that return an object full of methods
```javascript
var app = angular.module('myApp', ['ngCookies', 'ngRoute', 'ngAnimate', 'ui.bootstrap']);

app.factory("API", ["$http", "$cookies", "$log", function ($http, $cookies, $log) {
    // helper method
    var apiRequest = function (method, path, requestData, callbacks) {
        var djangoToken = $cookies.get('csrftoken');
        var fullPath = "/api/journal/" + path;

        $http({
            method: method,
            url: fullPath,
            headers: {"X-CSRFToken": djangoToken},
            data: requestData || {}
        }).success(function (data, status, headers, config) {
            if (callbacks && callbacks.success) {
                callbacks.success(data);
            }

        }).error(function (data, status, headers, config) {
            if (status == 403) {
                window.location = "/journal";
                return;
            }

            if (callbacks && callbacks.failure) {
                callbacks.failure(data);
            }

        });
    };

    return {
        $get: function (path, callbacks) {
            return apiRequest("get", path, {}, callbacks);
        },
        $post: function (path, requestData, callbacks) {
            return apiRequest("post", path, requestData, callbacks);
        },
        $put: function (path, requestData, callbacks) {
            return apiRequest("put", path, requestData, callbacks);
        },
        $patch: function (path, requestData, callbacks) {
            return apiRequest("patch", path, requestData, callbacks);
        },
        $delete: function (path, callbacks) {
            return apiRequest("delete", path, {}, callbacks);
        }
    };

}]);
```

#### Services that return promises
#### Define the service that returns a promise
```javascript
app.service("EventData", ["API", "$http", "$cookies", function (API, $http, $cookies) {
    var path = "";
    requestData = {};
    var djangoToken = $cookies.csrftoken;
    var fullPath = "/entries/" + path;

    var callbacks = {};
    var promise = $http({
        method: "GET",
        url: fullPath,
        headers: {"X-CSRFToken": djangoToken},
        data: requestData || {}
    });
    return promise;
}]);
```

#### Using the service 
```javascript
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/calendar', {
            templateUrl: '/static/journal/ng-templates/calendar.html',
            controller: 'myCalendarCtrl',
            resolve: {
                events_data: function ($q, EventData) {
                    return EventData;
                }
            }
        })
        .when('/journal', {
            templateUrl: '/static/journal/ng-templates/journal.html',
            controller: 'myJournalCtrl'
        })
        .otherwise({
            redirectTo: '/journal'
        });

}]);
```