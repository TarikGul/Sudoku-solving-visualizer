import Board from './js/sudoku/board'
import SudokuBoard from './js/features/sudoku_board'
import sudokuUtil from './util/sudoku_util'
import Visualize from './js/sudoku/visualize'
//Set the grid up on the page
const boardGrid = new SudokuBoard(9, 9)
boardGrid.makeRows();

//Create the default sudoku on the grid
let board = new Board('easy');
sudokuUtil.createPuzzle(board.puzzle)

//assign the visualize to the algorithm that the user picks
// need to add an event listener so that that this can change
// to whatever the user 'Selects'
let vis = new Visualize('Backtrace', board)
vis.initializeAlgo();

const solve = document.getElementById('solve-1')
solve.addEventListener('click', () => {
    console.log('clicked')
    vis.visualizeAlgo();
});


