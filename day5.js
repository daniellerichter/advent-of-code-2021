'use strict';

var fs = require('fs');

const fileData = fs.readFileSync('./input/day5.txt').toString();

const linesInput = fileData.split('\n');

const lines = linesInput.map(lineInput => lineInput.split(' -> '))
.map(line => {
    return line.map(pointInput => pointInput.split(','));
})
.map(line => {
    const [point1, point2] = line;
    const [x1, y1] = point1;
    const [x2, y2] = point2;
    return {x1: Number(x1), y1: Number(y1), x2: Number(x2), y2: Number(y2)}
})
.filter(({x1, y1, x2, y2}) => x1 === x2 || y1 === y2)

const xAxis = lines.reduce((acc, {x1, x2}) => {
    return Math.max(x1, x2, acc);
}, 0);

const yAxis = lines.reduce((acc, {y1, y2}) => {
    return Math.max(y1, y2, acc);
}, 0);


const gameBoard = Array(yAxis+1).fill(0).map(() => Array(xAxis+1).fill(0));

lines.forEach(({x1, y1, x2, y2}) => {
    const points = findPointsOnLine(x1, y1, x2, y2);
    points.forEach(({x,y}) => {
        try {
            const value = gameBoard[y][x];
            gameBoard[y][x] = value+1;
        } catch(e) {
            console.log(`Failed at ${x}, ${y}`);
        }

    })
})

const total = gameBoard.reduce((acc, curr) => {
    // console.log(curr);
    const values = curr.filter(val => val >= 2);
    return values.length + acc;
}, 0);
console.log('Total danger', total);



function findPointsOnLine(x1, y1, x2, y2) {
    if (x1 === x2) {
        const yValues = fillArrayRange(Math.min(y1,y2), Math.max(y1,y2));
        return yValues.map(y => ({x: x1, y}));        
    }

    if (y1 === y2) {
        const xValues = fillArrayRange(Math.min(x1,x2), Math.max(x1,x2));
        return xValues.map(x => ({x, y: y1}));    
    }
}

function fillArrayRange(start, end) {
    return Array(end - start + 1).fill().map((_, idx) => start + idx);
}