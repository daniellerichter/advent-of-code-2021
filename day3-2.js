'use strict';

var fs = require('fs');

const fileData = fs.readFileSync('./input/day3.txt').toString();
const numberList = fileData.split('\n');

const oxygen = findOxygen(numberList, 0);
console.log('oxygen', oxygen);

const co2 = findCo2(numberList, 0);
console.log('co2', co2);

const result = parseInt(oxygen, 2) * parseInt(co2, 2);
console.log(result);

function findOxygen(numbers, index) {
    if (numbers.length === 1) {
        return numbers[0];
    }
    const valuesAtIndex = numbers.map(x => x[index]);
    const ones = valuesAtIndex.join('').match(/1/g);
    const common = ones.length >= (valuesAtIndex.length/2) ? '1' : '0';
    const found = numbers.filter(number => {
        return number[index] === common;
    })

    return findOxygen(found, ++index);
}


function findCo2(numbers, index) {
    if (numbers.length === 1) {
        return numbers[0];
    }
    const valuesAtIndex = numbers.map(x => x[index]);
    const zeros = valuesAtIndex.join('').match(/0/g);
    const leastCommon = zeros.length <= (valuesAtIndex.length/2) ? '0' : '1';
    const found = numbers.filter(number => {
        return number[index] === leastCommon;
    })

    return findCo2(found, ++index);
}