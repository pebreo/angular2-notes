Angular 2 vs. Angular1
---------------------

COMPONENTS VS DIRECTIVES and CONTROLLERS
----------------------------------------
#### A component replaces directives & controllers
In Angular 2, a component has the functionality of an Angular 1
directive and controller.

In Angular 2, **controllers and $scope** are gone.
```javascript
////Angular 1.x using Controller and $scope
var myApp = angular
 .module("myModule", []) 
 .controller("productController", function($scope) {
    var prods = { name: "Prod1", quantity: 1 }; 
    $scope.products = prods;
});
 
///Angular 2 Components using TypeScript
import { Component } from ‘angular2/core’;
@Component({
 selector: ‘prodsdata’,
 template: `
 <h3>{{techncalDiary}}</h3> `
})
export class ProductComponent {
 prods = { name: ‘Prod1’, quantity: 1 };
}
```

TEMPLATES
---------

#### Loops using *ngFor
```html
// ng-repeat is replaced with *ngFor
///Angular 1.x structural directives:
<ul>
    <li ng-repeat="item in items">
        {{item.name}}
    </li>
</ul>
 
///Angular 2 structural directives:
<ul>
    <li *ngFor="#item of items">
        {{item.name}}
    </li>
</ul>
// Note: built-in directives using camelcase e.g. ngFor
```

#### In Angular 2, local variables replaced with hash prefix
```html
<div *ngFor="#technicalDiary of technicalDiries">
```

#### Two way data binding
```html
///Angular 1.x, two-way data binding using 'ng-model'
<input ng-model="technology.name"></input>
 
/////In Angular 2,two-way data binding using '[(ngModel)]'
<input [(ngModel)]="http://technology.name"></input>
```

### Events syntax
```
// Angular 1
<button ng-click="doSomething()">

// Angular 2
<button (click)="doSomething()">
```



TYPESCRIPT
----------
#### Typescript: Interface
```javascript
interface foo {
    
}


```

#### Typescript: Class


#### Typescript: @ annotation / decorator
```
```


Sources: 
http://www.technicaldiary.com/difference-angular-1-vs-angular-2/
https://www.youtube.com/watch?v=KL4Yi3WtymA&feature=youtu.be
