# REST with JWT or CSRF (django builtin)

## Installation
```
django>=1.8,<1.9
djangorestframework==3.5.4
djangorestframework-jwt==1.11.0
```

## Test using curl
```
# login
 curl -X POST -d "email=admin@foo.com&password=abc123" http://localhost:8000/api/auth/token/
```




## AngularJS auth with JWT login Service
```javascript

angular.module('loginDetail').
    component('loginDetail', {
        templateUrl: '/api/templates/login-detail.html',
        controller: function(
                $cookies,
                $http,
                $location,
                $routeParams,
                $rootScope,
                $scope
            ){
            var loginUrl = '/api/auth/token/'
            $scope.user = {
            }
            var tokenExists = $cookies.get("token");
            if (tokenExists) {
                // verify token
                $scope.loggedIn = true;
                $cookies.remove("token")
                $scope.user = {
                    email: $cookies.get("email")
                }
             }
            $scope.doLogin = function(user){
                console.log(user)

                var reqConfig = {
                    method: "POST",
                    url: loginUrl,
                    data: {
                        email: user.email,
                        password: user.password
                    },
                    headers: {}
                }
                var requestAction = $http(reqConfig)

                requestAction.success(function(r_data, r_status, r_headers, r_config){
                        //console.log(r_data) // token
                        $cookies.put("token", r_data.token);
                        $cookies.put("email", user.email);
                        // message
                        $location.path("/")
                })
                requestAction.error(function(e_data, e_status, e_headers, e_config){
                        console.log(e_data) // error
                })

            }
        }
});
```

## Login interceptor - redirect user to login
``` 
'use strict';

angular.
    module('core.interceptors').
        factory("LoginRequiredInterceptor", function($cookies, $location){
                return function(response){
                        console.log("working")
                        //console.log("interceptor error")
                        //console.log(response)
                        if (response.status == 401){
                            var currentPath = $location.path();
                            console.log(currentPath)
                            if (currentPath == "/login") {
                                $location.path("/login")
                            } else {
                                $location.path("/login").search("next", currentPath)
                            }
                        }
                    }
        })
```

## REST call with JWT auth
```
angular.
    module('core.comment').
        factory('Comment', function(LoginRequiredInterceptor, $cookies, $httpParamSerializer, $location, $resource){
            var url = '/api/comments/:id/';
            var commentQuery = {
                url: url,
                method: "GET",
                params: {},
                isArray: true,
                cache: false,
                transformResponse: function(data, headersGetter, status){
                    // console.log(data)
                    var finalData = angular.fromJson(data)
                    return finalData.results
                }
            }

            var commentGet = {
                    method: "GET",
                    params: {"id": "@id"},
                    isArray: false,
                    cache: false,
                }

             var commentCreate = {
                    url: '/api/comments/create/',
                    method: "POST", 
                    interceptor: {responseError: LoginRequiredInterceptor}
                    // params: {"id": "@id"},
                    // isArray: false,
                    // cache: false,
                }
            var commentUpdate = {
                    url: '/api/comments/:id/',
                    method: "PUT",
                    interceptor: {responseError: LoginRequiredInterceptor}
                    // params: {"id": "@id"},
                    // isArray: false,
                    // cache: false,
                }

             var commentDelete = {
                    url: '/api/comments/:id/',
                    method: "DELETE",
                    interceptor: {responseError: LoginRequiredInterceptor}
                    // params: {"id": "@id"},
                    // isArray: false,
                    // cache: false,
                }

            var token = $cookies.get("token")
            if (token){
                commentCreate["headers"] = {"Authorization": "JWT " + token}
                commentDelete["headers"] = {"Authorization": "JWT " + token}
                commentUpdate["headers"] = {"Authorization": "JWT " + token}
            }

            return $resource(url, {}, {
                query: commentQuery,
                get: commentGet,
                create: commentCreate,
                delete: commentDelete,
                update: commentUpdate,
            })

        });
```


## REST with CSRF token
```javascript

angular.
    module('core.comment').
        factory('Comment', function(LoginRequiredInterceptor, $cookies, $httpParamSerializer, $location, $resource){
            var url = '/api/comments/:id/';
           
            var commentQuery = {
                url: url,
                method: "GET",
                params: {},
                isArray: true,
                cache: false,
                transformResponse: function(data, headersGetter, status){
                    // console.log(data)
                    var finalData = angular.fromJson(data)
                    return finalData.results
                }
            }

            var commentGet = {
                    method: "GET",
                    params: {"id": "@id"},
                    isArray: false,
                    cache: false,
                }

             var commentCreate = {
                    url: '/api/comments/create/',
                    method: "POST", 
                    interceptor: {responseError: LoginRequiredInterceptor}
                    // params: {"id": "@id"},
                    // isArray: false,
                    // cache: false,
                }
            var commentUpdate = {
                    url: '/api/comments/:id/',
                    method: "PUT",
                    interceptor: {responseError: LoginRequiredInterceptor}
                    // params: {"id": "@id"},
                    // isArray: false,
                    // cache: false,
                }

             var commentDelete = {
                    url: '/api/comments/:id/',
                    method: "DELETE",
                    interceptor: {responseError: LoginRequiredInterceptor}
                    // params: {"id": "@id"},
                    // isArray: false,
                    // cache: false,
                }

            var djangoToken = $cookies.get('csrftoken'); 
            if (token){
                commentCreate["headers"] = {"X-CSRFToken": djangoToken}
                commentDelete["headers"] = {"X-CSRFToken": djangoToken}
                commentUpdate["headers"] = {"X-CSRFToken": djangoToken}
            }

            return $resource(url, {}, {
                query: commentQuery,
                get: commentGet,
                create: commentCreate,
                delete: commentDelete,
                update: commentUpdate,
            })

        });
```


### Source / inspired by

https://github.com/codingforentrepreneurs/Django-AngularJS/blob/master/src/static/js/app/core/comment/comment.service.js