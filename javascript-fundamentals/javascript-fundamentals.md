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
## Classes
```javascript
// constructor
function Point(x, y) { this.x  = x, this.y = y; }

// the prototype is the class
Point.prototype = {
    z: 0,
    magnitude: function() {
       return Math.sqrt(this.x*this.x + this.y*this.y + this.z*this.z)
    }
};
```
is the same as the python code
```python
class Point:
    def __init__(self, x, y):
        self.x, self.y = x,y
    z = 0
    def magnitude(self):
        return math.sqrt(self.x*self.x + self.y*self.y + self.z*self.z)
p = Point(3,4)
assert p.z == 0 
p.z = 10
```

## Class inheritance with Object.create()
```javascript
// Shape - superclass
function Shape() {
  this.x = 0;
  this.y = 0;
}

// superclass method
Shape.prototype.move = function(x, y) {
  this.x += x;
  this.y += y;
  console.info('Shape moved.');
};

// Rectangle - subclass
function Rectangle() {
  Shape.call(this); // call super constructor.
}

// subclass extends superclass
Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;

var rect = new Rectangle();
```
## Classes (ES2015/ES6)
Note that this syntax is syntatic sugar
```javascript
class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
  // Getter
  get area() {
    return this.calcArea();
  }
  // Method
  calcArea() {
    return this.height * this.width;
  }
}

const square = new Rectangle(10, 10);

console.log(square.area); // 100
```




### Source



https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create

https://javascriptweblog.wordpress.com/2010/07/06/function-declarations-vs-function-expressions/

https://stackoverflow.com/questions/1866084/javascript-function-declaration
