'use strict';

var fs = require('fs');

const fileData = fs.readFileSync('./input/day7.txt').toString();

const crabs = fileData.split(',').map(crab => Number(crab));

const sortedCrabs = crabs.sort((a, b) => a-b);

const range = fillArrayRange(sortedCrabs[0], sortedCrabs[sortedCrabs.length -1]);

const fuelValues = range.map(val => calculateFuel(val));

const minFuel = fuelValues.reduce((acc, curr) => Math.min(acc, curr), fuelValues[0]);

console.log(`Minimum fuel is ${minFuel}`);


function calculateFuel(value) {
    return crabs.reduce((acc, crab) => {
        const difference = Math.abs(value - crab);
        const fuel = (difference * (1 + difference)) / 2;
        return acc + fuel;
    }, 0)
}

function fillArrayRange(start, end) {
    return Array(end - start + 1).fill().map((_, idx) => start + idx);
}