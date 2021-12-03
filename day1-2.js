'use strict';

var fs = require('fs');

const fileData = fs.readFileSync('./input/day1.txt').toString();
const list = fileData.split('\n').map(x => Number(x));

const windows = list.filter((value, index) => list.length >= index+3).map((value, index) => {
    return value + list[index+1] + list[index+2]
});


const result = windows.filter((value, index) => index > 0 && value > windows[index-1]);
console.log(result.length);