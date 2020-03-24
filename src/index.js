import SudokuBoard from './js/features/sudoku_board'
import Board from './js/sudoku/board'

//Set the grid up on the page
const boardGrid = new SudokuBoard(9, 9)
boardGrid.makeRows();

//Create the default sudoku on the grid
const board = new Board('easy');
console.log(board)