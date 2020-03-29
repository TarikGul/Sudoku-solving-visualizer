import Board from './js/sudoku/board';
import CreateBoard from './js/features/create_board';
import sudokuUtil from './util/sudoku_util';
import Visualize from './js/sudoku/visualize';
import AlgoX from './js/sudoku/knuths/algoX'


document.addEventListener("DOMContentLoaded", function () {
    //Set the grid up on the page
    const boardGrid = new CreateBoard(9, 9);
    boardGrid.makeRows();


    //Create the default sudoku on the grid
    // let board = new Board('easy');
    let board;
    let vis;
    let currentDifficulty;
    let speed;

    const initalizeBoard = (diff) => {
        speed = Math.abs(document.getElementById('slider-2').value - 101)
        board = new Board(diff)
        vis = new Visualize('AlgoX', board, speed)
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
    const reset = document.getElementById('reset');
    const counter = document.getElementById('counter');
    const timer = document.getElementById('time');
    reset.addEventListener('click', (e) => {
        if (currentDifficulty === undefined) {
            vis.abort();
            initalizeBoard('easy');
        } else if (e.target.id === 'reset') {
            vis.abort();
            initalizeBoard(currentDifficulty);
        }
        counter.innerText = 'Iterations: 0';
        timer.innerText = 'Time: 0ms'
    }); 

    const solve = document.getElementById('solve-1')
    solve.addEventListener('click', () => {
        vis.visualizeAlgo();
    });

    const PUZZLE = [
        "8        ",
        "  36     ",
        " 7  9 2  ",
        " 5   7   ",
        "    457  ",
        "   1   3 ",
        "  1    68",
        "  85   1 ",
        " 9    4  "
    ];
    const algo = new AlgoX(PUZZLE)
    console.log(algo)
});