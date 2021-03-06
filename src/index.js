import Board from './js/sudoku/board';
import CreateBoard from './js/features/create_board';
import sudokuUtil from './util/sudoku_util';
import Visualize from './js/sudoku/visualize';


document.addEventListener("DOMContentLoaded", function () {
    //Set the grid up on the page
    const boardGrid = new CreateBoard(9, 9);
    boardGrid.makeRows();


    
    // Create variable that will be assigned by eventListeners
    let board;
    let vis;
    let algo;
    let speed;
    let currentDifficulty = 'easy';

    // Initialize a new board every time an event is clicked on the board
    const initalizeBoard = (diff, algo = 'Backtrace') => {
        speed = Math.abs(document.getElementById('slider-2').value - 101);
        board = new Board(diff);
        vis = new Visualize(algo, board, speed);
        sudokuUtil.clearBoard(9);
        sudokuUtil.createPuzzle(board.puzzle);
        vis.initializeAlgo();
    }
    //Create the default sudoku on the grid
    initalizeBoard('easy', algo);

    // When a difficulty is hit it will reset the board
    // It was also set the difficulty on the page
    document.addEventListener('click', (e) => {
        const diff = document.getElementById('diff')
        if (e.target.id === 'easy') {
            currentDifficulty = 'easy';
            diff.innerText = `Difficulty: Easy`
            vis.abort();
            initalizeBoard('easy', algo);
        } else if (e.target.id === 'medium') {
            currentDifficulty = 'medium';
            diff.innerText = `Difficulty: Medium`
            vis.abort();
            initalizeBoard('medium', algo);
        } else if (e.target.id === 'hard') {
            currentDifficulty = 'hard';
            diff.innerText = `Difficulty: Hard`
            vis.abort();
            initalizeBoard('hard', algo);
        } 
    });

    // When an algorithm is clicked on to change the current algo, and reset board
    document.addEventListener('click', (e) => {
        const chosenAlgo = document.getElementById('chosen-algo')
        if (e.target.id === 'backtrace') {
            algo = 'Backtrace';
            chosenAlgo.innerText = 'Algorithm: Backtracing';
            vis.abort();
            initalizeBoard(currentDifficulty, algo)
        } else if (e.target.id === 'algox') {
            algo = 'AlgoX';
            chosenAlgo.innerText = 'Algorithm: Knuths Algorithm X';
            vis.abort();
            initalizeBoard(currentDifficulty, algo)
        } 
    })

    // When the reset button is hit to reset the board on the most
    // recent difficulty, and algorithm
    const reset = document.getElementById('reset');
    const counter = document.getElementById('counter');
    const timer = document.getElementById('time');
    reset.addEventListener('click', (e) => {
        if (currentDifficulty === undefined) {
            vis.abort();
            initalizeBoard('easy', algo);
        } else if (e.target.id === 'reset') {
            vis.abort();
            initalizeBoard(currentDifficulty, algo);
        }
        counter.innerText = 'Iterations: 0';
        timer.innerText = 'Time: 0ms';
    }) 

    // Solve the board
    const solve = document.getElementById('solve-1')
    solve.addEventListener('click', () => {
        vis.visualizeAlgo();
    });
});