'use strict';

var fs = require('fs');

const fileData = fs.readFileSync('./input/day6.txt').toString();

let fishes = fileData.split(',').map(val => Number(val));

let newFish = 0;
const days = 256;

for (let i=0; i<days;i++) {
    const nextDay = fishes.map(fish => {
        if (fish > 0) {
            return --fish;
        } else {
            newFish++;
            return 6;
        }
    });
    
    if (newFish > 0) {
        fishes = [...nextDay, ...Array(newFish).fill(8)];
    } else {
        fishes = [...nextDay];

    }
    newFish = 0
}

console.log('total fish', fishes.length);