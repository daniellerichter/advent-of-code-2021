'use strict';

var fs = require('fs');

const fileData = fs.readFileSync('./input/day9.txt').toString();

const heightMap = fileData.trim().split('\n').map(rows => rows.split('').map(value => Number(value)));

const directions = [{ x: 0, y: 1 }, { x: 0, y: -1 }, { x: 1, y: 0 }, { x: -1, y: 0 }];

let lowPoints = heightMap.flatMap((row, rowIndex) => {
  return row.map((col, colIndex) => {
    const surroundingItems = getSurroundingItems(rowIndex, colIndex);
    const lowerItem = surroundingItems.find(item => item.value <= col);
    if (lowerItem === undefined) {
      return { x: colIndex, y: rowIndex };
    }
  })
})
  .filter(point => point !== undefined);

const basins = lowPoints.map(point => {
  const surroundingItems = getSurroundingItems(point.y, point.x);
  surroundingItems.forEach(item => {
    heightMap[item.y][item.x] = 'X';
  })
  heightMap[point.y][point.x] = 'X';
  const basin = getBasin(surroundingItems);
  return basin.length + 1;
})

const highestBasins = basins.sort((a, b) => a - b).slice(basins.length - 3);

const product = highestBasins.reduce((acc, curr) => acc * curr, 1);
console.log(product);


function getBasin(surroundingItems) {
  let basinItems = surroundingItems.filter(item => item.value !== 'X' && item.value !== 9);
  const remainingBasinItems = basinItems.flatMap(item => {
    const surrounding = getSurroundingItems(item.y, item.x);
    surroundingItems.forEach(item => {
      heightMap[item.y][item.x] = 'X';
    })
    return getBasin(surrounding);
  });
  return [...basinItems, ...remainingBasinItems];
}



function getSurroundingItems(row, col) {
  return directions
    .filter(direction => {
      const y = row + direction.y;
      const x = col + direction.x;
      return y >= 0 && y < heightMap.length && x >= 0 && x < heightMap[0].length
    })
    .map(direction => {
      return { value: heightMap[row + direction.y][col + direction.x], x: col + direction.x, y: row + direction.y };
    })
}
