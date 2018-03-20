#### move this file to a separate directory


## Understanding `this`
If we declare an object literal
```
MyObj = {
    name: 'My name',
    // a function property
    update: function() {
       this.name = "Updated name";
    }
}
console.log(MyObj);
MyObj.update();
console.log(MyObj);

```

## Functions
```
// a function expression
myfunc = function() {  return 1+1; }
myfunc();

// a function declaration aka function statement aka function definition

// anonymous functions
```


### Source

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions

https://javascriptweblog.wordpress.com/2010/07/06/function-declarations-vs-function-expressions/

https://stackoverflow.com/questions/1866084/javascript-function-declaration
