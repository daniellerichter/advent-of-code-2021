'use strict';

var fs = require('fs');

const fileData = fs.readFileSync('./input/day7.txt').toString();

const crabs = fileData.split(',').map(crab => Number(crab));

const medianCrabs = median(crabs);
console.log('median', medianCrabs);

const totalFuel = crabs.reduce((acc, crab) => {
    const fuel = Math.abs(medianCrabs - crab);
    return acc + fuel;
}, 0)

console.log(totalFuel);

function median(numbers) {
    const sorted = numbers.sort((a, b) => a- b);
    console.log(sorted);
    const middle = sorted[numbers.length / 2];
    return middle;
}