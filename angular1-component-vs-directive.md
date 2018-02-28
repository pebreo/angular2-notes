
Angular 1.5.x Components vs. Directives
=======
Starting with Angular 1.5.x you can used components definition instead of directive definition.

## Directive approach
```javascript
.directive('counter', function counter(){
    return {
      scope: {},
      bindToController: {
          count: '='
      },
      controller: function() {
          function increment() {
              this.count++;
          }
          function decrement() {
              this.count--;
          }
          this.increment = increment;
          this.decrement = decrement;
      },
      controllerAs: 'counter'
    };
});
```

## Component approach
```javascript
.component('counter', function counter(){
    bindings: {
        count: '='
    },
    controller: function(){
        function increment() {
            this.count++;
        }
        function decrement() {
            this.count--;
        }
        this.increment = increment;
        this.decrement = decrement;
    }
});
```


## Example component
Note that the default controller name for a component is `$ctrl`.
```javascript
// The component approach
.component('counter', function counter(){
    bindings: {
        count: '='      
    },
    controller: function(){
        function increment() {
            this.count++;
        }
        function decrement() {
            this.count--;
        }
        this.increment = increment;
        this.decrement = decrement;
    },
    template: `
        <div class="todo">
            <input type="text" ng-model="$ctrl.count">
            <button type="button" ng-click="$ctrl.increment()">+<button>
            <button type="button" ng-click="$ctrl.decrement()">-</button>
        </div>
    `
});

// The directive approach
.directive('counter', function counter(){
    return {
      scope: {},
      bindToController: {
          count: '='
      },
      controller: function() {
          function increment() {
              this.count++;
          }
          function decrement() {
              this.count--;
          }
          this.increment = increment;
          this.decrement = decrement;
      },
      controllerAs: 'counter',
      template: `
        <div class="todo">
            <input type="text" ng-model="controller.count">
            <button type="button" ng-click="controller.increment()">+<button>
            <button type="button" ng-click="controller.decrement()">-</button>
        </div>
    `
    };
});
```

### Example movie information component
We can use a component definition to pass through information to a template
which will be a small part of a larger web page.
```
// movie.component.js
.component('counter', function counter(){
    bindings: {
        movie: '=data'      
    },
    templateUrl: 'js/movie/movie.html'
});

// movie.html
<div class="row">
    <div class="col-md-3">
        <img class="poster" ng-src="{{$ctrl.movie.poster}}">
    </div>
    
    <div class="col-md-6">
        <div class="details">
            <h2> {{ $ctrl.movie.title }} <span>{{ $ctrl.movie.release_year }}</span> </h2>
            <div class="meta">
                {{ $ctrl.movie.rating }} | {{$ctrl.movie.duration}}
            </div>
            <p>{{ $ctrl.movie.overview }}</p>
        </div>
        
    </div>

</div>
```

## Passing data to the movie component
In the example below, we we have a `component` named `movie`
and a state provider also named `movie`.

When the `/movie/:id` route is called then the state provider
will call the `MovieService` and return a promise to the
`data` parameter of the movie component through the `$resolve` property.
Note that we assume that `MovieService` returns a promise which is best practice.
```
app.component('movie', function counter(){
    bindings: {
        movie: '=data'      
    },
    controller: // blah
    template: `
      {{ $ctrl.movie.name }}
    `
});

app.config(function($stateProvider) {
    $stateProvider.state('movie', {
        url: '/movie/:id',
        // call the movie component and 
        //  pass the resolve promise contained in movie{} object
        template: '<movie data="$resolve.movie"></movie>',
        
        resolve: {
            // the movie object 
            movie: function(MovieService, $stateParams){
                return MovieService.findMovieId($stateParams.id);
            }
        }
    });
});
```

source: 
https://odetocode.com/blogs/scott/archive/2014/05/20/using-resolve-in-angularjs-routes.aspx
