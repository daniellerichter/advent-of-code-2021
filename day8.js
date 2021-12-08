'use strict';

var fs = require('fs');

const fileData = fs.readFileSync('./input/day8.txt').toString();

const entries = fileData.split('\n');
const uniqueDigits = [2,4,3,7];

const uniqueOutputs = entries.map(entry => {
    const [signalPatterns, outputs] = entry.split('|');
    const outputValues = outputs.trim().split(' ');
    const uniqueValues = outputValues.filter(value => {
        return uniqueDigits.includes(value.length)
    });
    return uniqueValues.length;
});

const totalUniqueDigits = uniqueOutputs.reduce((acc, curr) => acc + curr, 0);
console.log(totalUniqueDigits);