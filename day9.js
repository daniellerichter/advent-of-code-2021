'use strict';

var fs = require('fs');

const fileData = fs.readFileSync('./input/day9.txt').toString();

const heightMap = fileData.trim().split('\n').map(rows => rows.split('').map(value => Number(value)));

console.log(heightMap);

const directions = [{ x: 0, y: 1 }, { x: 0, y: -1 }, { x: 1, y: 0 }, { x: -1, y: 0 }];

const lowPoints = heightMap.flatMap((row, rowIndex) => {
  return row.map((col, colIndex) => {
    const surroundingItems = getSurroundingItems(rowIndex, colIndex);

    const lowerItem = surroundingItems.find(item => item <= col);
    if (lowerItem === undefined) {
      console.log(`Col ${col} at ${rowIndex},${colIndex} is low point`);
      return col;
    }
  })
})
  .filter(point => point !== undefined);

const dangerScore = lowPoints.map(point => point + 1).reduce((acc, curr) => acc + curr, 0);
console.log(dangerScore);



function getSurroundingItems(row, col) {
  return directions
    .filter(direction => {
      const y = row + direction.y;
      const x = col + direction.x;
      return y >= 0 && y < heightMap.length && x >= 0 && x < heightMap[0].length
    })
    .map(direction => {
      return heightMap[row + direction.y][col + direction.x];
    })
}
