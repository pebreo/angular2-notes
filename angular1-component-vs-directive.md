
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
    },
    template: `
        <div class="todo">
            <input type="text" ng-model="$ctrl.count">
            <button type="button" ng-click="$ctrl.increment()">+<button>
            <button type="button" ng-click="$ctrl.decrement()">-</button>
        </div>
    `
});
```
