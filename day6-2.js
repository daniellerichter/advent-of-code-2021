'use strict';

var fs = require('fs');

const fileData = fs.readFileSync('./input/day6.txt').toString();

let fishes = fileData.split(',').map(val => Number(val));

const days = 256;
let fishMap = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0
};

fishes.forEach(fish => {
    fishMap[fish] = fishMap[fish] + 1;
});

for (let i=0; i<days;i++) {
    const fishMapCopy = {...fishMap};
    const newFish = fishMap[0];
    Object.keys(fishMap).map(key => Number(key)).forEach(key => {
        if (key === 8) {
            fishMap[key] = newFish;
        }
        else if (key === 6) {
            fishMap[key] = fishMapCopy[key + 1] + newFish;
        } else {
            fishMap[key] = fishMapCopy[key + 1];
        }
    });
}

const fishValues = Object.values(fishMap);
const sum =fishValues.reduce((acc, curr) => acc + curr, 0)

console.log('total fish', sum);