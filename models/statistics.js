'use strict'

function sort (numArray) {
numArray.sort(function(a, b) {return a-b;});

var sum = 0;
for(var index = 0; index < numArray.length; index++) {
    sum += numArray[index];
}
var avg = sum / numArray.length;
return avg
}

module.exports = { sort }