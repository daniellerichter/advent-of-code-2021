'use strict';

var fs = require('fs');

const fileData = fs.readFileSync('./input/day8.txt').toString();

const entries = fileData.split('\n');


const results = entries.map(entry => {
    const [signalPatterns, outputs] = entry.split('|');
    const outputValues = outputs.trim().split(' ');
    const mapping = determineMapping(signalPatterns);
    const reversedMapping = reverseMap(mapping);
    
    const mappedDigits = outputValues.map(outputValue => {
        const sorted = Array.from(outputValue).sort().join('');
        return reversedMapping[sorted];
    });

    return Number(mappedDigits.join(''));
});

const sum = results.reduce((acc, curr) => acc + curr, 0);
console.log('sum', sum);

function reverseMap(mapping) {
    const map = {};
    const entries = Object.entries(mapping);
    entries.forEach(([key, value]) => {
        map[value] = Number(key);
    })
    return map;
}

function determineMapping(signalPatterns) {
    const mapping = {};
    const patterns = signalPatterns.trim().split(' ').map(pattern => Array.from(pattern).sort().join(''));
    mapping[1] = patterns.find(pattern => pattern.length === 2);
    mapping[4] = patterns.find(pattern => pattern.length === 4);
    mapping[7] = patterns.find(pattern => pattern.length === 3);
    mapping[8] = patterns.find(pattern => pattern.length === 7);

    const [part1, part2] = mapping[1].split('');
    const missingPart1 = patterns.filter(pattern => !pattern.includes(part1));
    const missingPart2 = patterns.filter(pattern => !pattern.includes(part2));
    const missingC = missingPart1.length === 2 ? missingPart1 : missingPart2;
    const missingF = missingPart1.length === 1 ? missingPart1 : missingPart2;
    mapping[5] = missingC.find(pattern => pattern.length === 5);
    mapping[6] = missingC.find(pattern => pattern.length === 6);
    mapping[2] = missingF[0];


    const remainingPatterns = patterns.filter(pattern => {
        return !Object.values(mapping).includes(pattern)
    });

    const foundIndex = remainingPatterns.findIndex(pattern => pattern.length === 5);
    mapping[3] = remainingPatterns[foundIndex];
    remainingPatterns.splice(foundIndex, 1);
    
    remainingPatterns.find(pattern => {
        const eight = new Set([...Array.from(pattern), ...Array.from(mapping[4])]);
        if (arrayEquals(Array.from(eight), Array.from(mapping[8]))) {
            mapping[0] = pattern;
        } else {
            mapping[9] = pattern;
        }
    });
    return mapping;
}

function arrayEquals(array1, array2) {
    return array1.sort().toString() === array2.sort().toString()
}