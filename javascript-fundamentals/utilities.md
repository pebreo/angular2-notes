
### Combinations
```javascript
function k_combinations(set, k) {
    let i, j, combs, head, tailcombs;
    
    // There is no way to take e.g. sets of 5 elements from
    // a set of 4.
    if (k > set.length || k <= 0) {
        return [];
    }
    
    // K-sized set has only one K-sized subset.
    if (k == set.length) {
        return [set];
    }
    
    // There is N 1-sized subsets in a N-sized set.
    if (k == 1) {
        combs = [];
        for (i = 0; i < set.length; i++) {
            combs.push([set[i]]);
        }
        return combs;
    }
    

    combs = [];
    for (i = 0; i < set.length - k + 1; i++) {
        // head is a list that includes only our current element.
        head = set.slice(i, i + 1);
        // We take smaller combinations from the subsequent elements
        tailcombs = k_combinations(set.slice(i + 1), k - 1);
        // For each (k-1)-combination we join it with the current
        // and store it to the set of k-combinations.
        for (j = 0; j < tailcombs.length; j++) {
            combs.push(head.concat(tailcombs[j]));
        }
    }
    return combs;
}

console.log(k_combinations([1,2,3],2))
```
source:  https://gist.github.com/axelpale/3118596

### Permutations
```javascript

function k_perms(array, k){
    let combinations = []
    let indices = []
    
    let perms = []
    
    function run(level, start){
    
        for(let i=0; i < array.length; i++){
            
            if(!indices[i]){
            
                indices[i] = true;
                
                combinations[level] = array[i]
                
                if(level < k - 1){
                    run(level + 1, i + 1)
                } else {
                    // console.log(combinations.join(" "))
                    let thisComb = [].concat(combinations)
                    perms.push(thisComb)
                }
                
                indices[i] = false;
            }
        }
        
    }
   
    run(0, 0);
    return perms
}

console.log(k_perms([1,2,3],3))
```
source: http://rextester.com/OUC90847


### Zip
```javascript
const zip = (...rows) => [...rows[0]].map((_,c) => rows.map(row => row[c]))
```
source: https://stackoverflow.com/questions/4856717/javascript-equivalent-of-pythons-zip-function

### dictZip
equivalent to python's dict(zip())
```javascript
function dictZip(key_array, val_array) {
  if (key_array.length === val_array.length) {
    return key_array.reduce((acc, curr, index) => {
      acc[curr] = val_array[index];
      return acc;
    }, {});
  } else {
    console.error("Wrong length");
  }
}
```
source: https://gist.github.com/ThomasG77/2186830

### Cycle (finite)
```
var cycle = function(array, count) {
    var output = [];

    for (var i = 0; i < count; i++) {
        output.push(array[i % array.length]);
    }

    return output;
}
```
source: https://stackoverflow.com/questions/21439115/cycle-function-in-javascript

### Cycle (iterator)
Behaves like Python : https://docs.python.org/2/library/itertools.html#itertools.cycle
which means it goes on indefinitely.
```
function*
yield
next
```
source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators

### You don't need lodash

source : https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore