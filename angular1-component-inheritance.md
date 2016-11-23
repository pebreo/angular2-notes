A Simple Parent-Child Component Demo
------------------------------------
Plunker link:

http://plnkr.co/edit/XR1tyelmDhe8uu8ia6pE?p=preview


#### The HTML
Some notes about the html code:
* the `<parent>` tag is taking in the `<child>` tag so it must have a `transclude` defined 
in the component definition
* the `name` property must be defined in `bindings` in the component definition
```html
<!DOCTYPE html>
<html ng-app="plunker">
  <head>
    <link rel="stylesheet" href="style.css">
     <script data-require="angular.js@1.4.x" src="https://code.angularjs.org/1.5.0/angular.js" data-semver="1.4.9"></script>
    
    <script src="script.js"></script>
  </head>

  <body>
    <h1>Hello Plunker!</h1>

    <parent-component name="Parent">
      <child name="Child"></child>
    </parent-component>
  
  </body>
</html>
```
#### The Javascript code
Here are some notes about the following code:
* `transclude` means the tag `<parent-component>` will accept whatever inside the html tag 
e.g. `<foo> something </foo>` - here, `something` is being processed by the component `foo`
* use `require` to enable `child` to access the properties of `parentComponent`
* the tick mark ^ in front of the component string means that `child` can access the parent and it's controller
```javascript
var app = angular.module('plunker', []);
app.component('parentComponent', {
    transclude: true,
    template: '<p>Hello I am {{parentCnt.name}} and my name is {{parentCnt.myName}}</p><ng-transclude></ng-transclude>',
    bindings: {
        name: '@'
    },
    controller: function() {
        this.myName = 'George';
    },
    controllerAs: 'parentCnt'
})
app.component('child', {
    require: {
        parent: '^parentComponent'
    },
    template: '<p>Hello I am {{$ctrl.name}} and my parent is {{$ctrl.myNameFromParent}}  </p>',
    bindings: {
        name: '@'
    },

    controller: function() {
        this.$onInit = function() {
            // you can access the parent's properties
            this.myNameFromParent = this.parent.myName;
        };

    }
});
```