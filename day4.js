'use strict';

var fs = require('fs');

const transpose = m => m[0].map((x,i) => m.map(x => x[i]));


const fileData = fs.readFileSync('./input/day4.txt').toString();
const [instructions, ...bingoBoards] = fileData.split('\n\n');

const boards = bingoBoards.map(board => board.split('\n').map(row => row.trim().split(/\s+/)));

const bingoNums = instructions.split(',');
let index =0;
let bingo = false;

while (!bingo) {

    let bingoNumber = bingoNums[index];
    const bingoBoard = boards.find((board, boardIndex) => {
        // board is a 2d array
        board.forEach((row, rowIndex) => {
            const foundIndex = row.findIndex(val => val === bingoNumber);
            if (foundIndex > -1) {
                row.splice(foundIndex, 1, 'X');
            }
        });

        bingo = checkForBingo(board);
        if (bingo) {
            console.log(`Bingo in board ${boardIndex} on ${bingoNumber}`);
        }

        return bingo;
    });

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


    index++;
}

function checkForBingo(board) {
    let bingo = false;

    const bingoRow = board.find(row => {
        const x = row.join().match(/X/g) || [];
        console.log(`Row ${x} has length ${x.length}`);
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