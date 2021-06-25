'use strict'

function sort (numArray) {
numArray.sort(function(a, b) {return a-b;});
//log the contents of the array
console.log(numArray);
//log the array length
console.log("array length is: " + numArray.length);
//Split the array in half
var middle = Math.floor(numArray.length / 2);
//function to find the median
  if(numArray.length % 2 === 0) {
      return  (numArray[middle - 1]  +  numArray[middle])/2
  } else {
    return numArray[middle]
  }

}

module.exports = { sort }