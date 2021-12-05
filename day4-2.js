'use strict';

var fs = require('fs');

const transpose = m => m[0].map((x,i) => m.map(x => x[i]));


const fileData = fs.readFileSync('./input/day4.txt').toString();
const [instructions, ...bingoBoards] = fileData.split('\n\n');

const boards = bingoBoards.map(board => board.split('\n').map(row => row.trim().split(/\s+/)));

const bingoNums = instructions.split(',');
let index =0;
let bingo = false;
let lastBingo = false;
let bingoNumber;
while (boards.length > 1 || !lastBingo) {

    bingoNumber = bingoNums[index];
    boards.forEach((board, boardIndex) => {
        // board is a 2d array
        console.log(`Marking board ${boardIndex} for number ${bingoNumber}`)
        board.forEach((row, rowIndex) => {
            const foundIndex = row.findIndex(val => val === bingoNumber);
            if (foundIndex > -1) {
                row.splice(foundIndex, 1, 'X');
            }
        });
    });

    boards.forEach((board, boardIndex) => {
        bingo = checkForBingo(board);
        if (bingo) {
            if (boards.length === 1) {
                console.log('last bingo!', boardIndex, bingoNumber);
                lastBingo = true;
            } else {
                console.log(`${boards.length} bingo cards left`);
                console.log(`Bingo in board ${boardIndex} on ${bingoNumber}`);
                
                boards.splice(boardIndex, 1);
            }
        }
    })

    index++;
    console.log('last bingo?', lastBingo);
}

console.log('remaining board', boards);
calculateScore(boards[0], bingoNumber);


function calculateScore(bingoBoard, bingoNumber) {
    if (bingoBoard) {
        const sum = bingoBoard.reduce((acc, curr) => {
            const rowSum = curr.filter(val => val !== 'X').reduce((rowAcc, rowCurr) => {
                return Number(rowAcc) + Number(rowCurr);
            }, 0);
            return acc+=Number(rowSum);
        }, 0);
        console.log(sum);
        console.log('Result', sum * bingoNumber);
    }
}


function checkForBingo(board) {

    const bingoRow = board.find(row => {
        const x = row.join().match(/X/g) || [];
        return x.length === 5;
    });

    if (bingoRow) {        
        return true;
    }

    const cols = transpose(board);

    const bingoCol = cols.find(col => {
        const x = col.join().match(/X/g) || [];
        return x.length === 5;
    })

    return !!bingoCol;
}