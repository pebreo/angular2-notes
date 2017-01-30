
BASIC EXAMPLE
----------------
Goto your Firebase console and create a project
Then goto Authentication and setup a signup method.
You can pick anonymous for the easiest way to get the required
keys below.
```javascript
 // Initialize Firebase

var config = {
    apiKey: "mykeyhere",
    authDomain: "<myauthdoman>.firebaseapp.com",
    databaseURL: "https://proj2-aa6bd.firebaseio.com",
    storageBucket: "proj2-aa6bd.appspot.com",
    messagingSenderId: "383124449842"
  };
firebase.initializeApp(config);
  
 
var db = firebase.database();
 
// purge collections
db.ref('words').set({}); // purge collection

// append an item
db.ref('words/').push({word: 'a word', item_index: 1}); // works
 
// get key right before you append
var newPostKey = db.ref().child('words').push().key;
console.log(newPostKey);
db.refs('words/' +  newPostKey).set({word: 'apple'});

// same as
db.refs('words').push({word: 'apple'})

```
For more queries see youtube: sql to firebase queries

Working with lists 
-----------------
```javascript
var els = db.ref('words').limitToLast(100);

var els = db.ref('words').orderByChild('word');

// get most recently added element 
var els = db.ref('words').limitToLast(1);
els.once('value', showData, console.error);


function showData(snap){
    $('#pr').text( JSON.stringify(snap.val(), null, 2) );
};
```

Rules
-----
Disable writing for anonymous
First, you should make sure that enable anonymous authentication
using the firebase console then change the rules in the Database section
```javascript
{
  "rules": {
    ".read": "auth == null",
    ".write": "false"
  }
}
```


Resources
--------

https://jsfiddle.net/katowulf/81maLhf0/