import Board from './js/sudoku/board';
import CreateBoard from './js/features/create_board';
import sudokuUtil from './util/sudoku_util';
import Visualize from './js/sudoku/visualize';
let $ = require("jquery");


//Set the grid up on the page
const boardGrid = new CreateBoard(9, 9);
boardGrid.makeRows();


//Create the default sudoku on the grid
// let board = new Board('easy');
let board;
let vis;
let currentDifficulty;

const initalizeBoard = (diff) => {
    board = new Board(diff)
    vis = new Visualize('Backtrace', board)
    sudokuUtil.clearBoard(9)
    sudokuUtil.createPuzzle(board.puzzle)
    vis.initializeAlgo();
}
initalizeBoard('easy');

// When a difficulty is hit it will reset the board
document.addEventListener('click', (e) => {
    if (e.target.id === 'easy') {
        currentDifficulty = 'easy';
        vis.abort();
        initalizeBoard('easy');
    } else if (e.target.id === 'medium') {
        currentDifficulty = 'medium';
        vis.abort();
        initalizeBoard('medium');
    } else if (e.target.id === 'hard') {
        currentDifficulty = 'hard';
        vis.abort();
        initalizeBoard('hard');
    } 
});

// When the reset button is hit to reset the board on the most
// recent difficulty
const reset = document.getElementById('reset')
reset.addEventListener('click', (e) => {
    if (currentDifficulty === undefined) {
        vis.abort();
        initalizeBoard('easy');
    } else if (e.target.id === 'reset') {
        vis.abort();
        initalizeBoard(currentDifficulty);
    }
}); 

const solve = document.getElementById('solve-1')
solve.addEventListener('click', () => {
    vis.visualizeAlgo();
});


