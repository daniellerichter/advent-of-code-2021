'use strict';

var fs = require('fs');


// console.time();
const fileData = fs.readFileSync('./input/day1.txt').toString();
const list = fileData.split('\n').map(x => Number(x));


const result = list.filter((value, index) => index > 0 && value > list[index-1]);
console.log(result.length);