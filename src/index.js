import Board from './js/sudoku/board'
import CreateBoard from './js/features/create_board'
import sudokuUtil from './util/sudoku_util'
import Visualize from './js/sudoku/visualize'
//Set the grid up on the page
const boardGrid = new CreateBoard(9, 9)
boardGrid.makeRows();

//Create the default sudoku on the grid
// let board = new Board('easy');
let board;
let vis;

const initalizeBoard = (diff) => {
    board = new Board(diff)
    vis = new Visualize('Backtrace', board)
    sudokuUtil.clearBoard(9)
    sudokuUtil.createPuzzle(board.puzzle)
    vis.initializeAlgo();
}
initalizeBoard('easy');

document.addEventListener('click', (e) => {
    if (e.target.id === 'easy') {
        initalizeBoard('easy')
    } else if (e.target.id === 'medium') {
        initalizeBoard('medium')
    } else if (e.target.id === 'hard') {
        initalizeBoard('hard')
    }
    console.log(e.target.id)
})



//assign the visualize to the algorithm that the user picks
// need to add an event listener so that that this can change
// to whatever the user 'Selects'
// let vis = new Visualize('Backtrace', board)
// vis.initializeAlgo();

const solve = document.getElementById('solve-1')
solve.addEventListener('click', () => {
    console.log('clicked')
    vis.visualizeAlgo();
});


