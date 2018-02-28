
Angular 1.5.x Components vs. Directives
=======
Starting with Angular 1.5.x you can used components definition instead of directive definition.

## Directive appoarch
```
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
