'use strict';

var fs = require('fs');

const fileData = fs.readFileSync('./input/day3.txt').toString();
const numbers = fileData.split('\n');

const splitNumbers = numbers.map(number => Array.from(number));

const keys = Object.keys(splitNumbers[0]);
const reversed = keys.map(value => {
    return splitNumbers.reduce((acc, curr) => {
        acc.push(curr[value]);
        return acc;
    }, [])
});

const gamma = reversed.map(bits => {
    const bitString = bits.join('');
    const ones = bitString.match(/1/g).length;
    return ones > (bitString.length /2) ? '1' : '0';
});

const gammaDecimal = parseInt(gamma.join(''), 2);

const epsilon = gamma.map(bit => {
    return !!Number(bit) ? 0 : 1
});
const epsilonDecimal = parseInt(epsilon.join(''), 2);

const power = gammaDecimal * epsilonDecimal;
console.log(power);