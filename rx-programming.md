
Problem: your UI hangs while you are fetching or calculating some data
Use: callbacks to become asynchronous

Problem: you don't want to get into callback hell
Solution: use promises
http://callbackhell.com/

Problem: you have too many inputs and outputs and hard to keep track of it
Solution: use asynchronous event streams (observables) and functional programming style
Solution: use push and pull pattern to define the inputs and outputs, and also functional style of programming 
to make it easier to understand and to test

Problems: you want to return the results not a function
Solution: use flatMap

Problem: you want to run two streams and get a single output
Solution: use merge

Problem: you want to convert a promise to an observable
Solution: use fromPromise in RxJs

Glossary
-------
* `reactive programming`
* `subscriber` / `subcribe`
* `publish`
* `observable` aka `observable sequence`
* `observer`
* `selector`
* `property`
* `function`
* `asynchronous`
* `error`
* `event`

* `marble diagram`
* `stream` - multiple streams can used as input to other streams
* `event stream`
* `promise` (see angular promise)  - fromPromise (convert a promise to observable)
A Promise is simply an Observable with one single emitted value. Rx streams go beyond promises by allowing many returned values.
promise example: http://stackoverflow.com/questions/24517778/javascript-promises-sample-in-js-fiddle-not-working
Promise nuggets: http://promise-nuggets.github.io/articles/01-the-simplest-example.html

* `callback` (see examples)

* `merge`
* `map`
* `flatMap`

* RxJS
* BaconJS

Fundamentals
* functional programming (map, filter, reduce/scan)
* promises vs. observable
* DOM 
* attribute, property
* return value
* push pattern
* pull pattern
* Observable pattern
* callback
* promise
* deferred
* functional programming
* imperative programming
* declarative programming

ajax 
-----
$.ajax() <- jQuery

$http() <- angular

"For example, imagine your Twitter feed would be a data stream in the same fashion that click events are. You can listen to that stream and react accordingly."

Asynchronous, in JavaScript means we can call a function and register a callback to be notified when results are available, so we can continue with execution and avoid the Web Page from being unresponsive. This is used for ajax calls, DOM-events, Promises, WebWorkers and WebSockets.
Data, raw information in the form of JavaScript data types as: Number, String, Objects (Arrays, Sets, Maps).
Streams, sequences of data made available over time. As an example, opposed to Arrays you don’t need all the information to be present in order to start using them.


Sources:
Snake in BaconJS: http://philipnilsson.github.io/badness/
BaconJS tutorial: https://baconjs.github.io/tutorials.html
Intro to RxJS: https://medium.com/google-developer-experts/angular-introduction-to-reactive-extensions-rxjs-a86a7430a61f#.rjbixl76p
Tutorial: https://gist.github.com/staltz/868e7e9bc2a7b8c1f754