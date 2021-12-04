'use strict';

var fs = require('fs');

const fileData = fs.readFileSync('./input/day2.txt').toString();
const instructions = fileData.split('\n');

let distance = 0; 
let depth = 0;
let aim = 0;

instructions.map(instruction => instruction.split(' ')).forEach(([direction, value]) => {
    if (direction === 'forward') {
        distance += Number(value);
        depth += aim * value;
    }

    if (direction === 'up') {
        aim -= Number(value);
    }

    if (direction === 'down') {
        aim += Number(value);
    }
});

console.log('result', depth * distance);