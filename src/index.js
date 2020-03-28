import regeneratorRuntime from "regenerator-runtime";
import { Dlx } from './js/sudoku/knuths/dlx'
import Board from './js/sudoku/board';
import CreateBoard from './js/features/create_board';
import sudokuUtil from './util/sudoku_util';
import Visualize from './js/sudoku/visualize';
import { solve1, rowIndicesToSolution } from './js/sudoku/knuths/knuths';


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
        vis = new Visualize('Backtrace', board, speed)
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
    const counter = document.getElementById('counter')
    reset.addEventListener('click', (e) => {
        if (currentDifficulty === undefined) {
            vis.abort();
            initalizeBoard('easy');
        } else if (e.target.id === 'reset') {
            vis.abort();
            initalizeBoard(currentDifficulty);
        }
        counter.innerText = 'Iterations: 0'
    }); 

    const solve = document.getElementById('solve-1')
    solve.addEventListener('click', () => {
        vis.visualizeAlgo();
    });


    const matrix = [
        [1, 0, 0, 0],
        [0, 1, 1, 0],
        [1, 0, 0, 1],
        [0, 0, 1, 1],
        [0, 1, 0, 0],
        [0, 0, 1, 0]
    ]

    const onStep = e =>
        console.log(`step[${e.stepIndex}]: ${e.partialSolution}`)

    const onSolution = e =>
        console.log(`solution[${e.solutionIndex}]: ${e.solution}`)

    const dlx = new Dlx()
    dlx.on('step', onStep)
    dlx.on('solution', onSolution)
    dlx.solve(matrix)

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
    // what i need to do next is make a function that returns the puzzle in str 
    // form. and pass it into the function below as a constant
    let queue = [];
    debugger
    const onSearchStep = (internalRows, rowIndices) => {
        const partialSolution = rowIndicesToSolution(PUZZLE, internalRows, rowIndices);
        queue.push(drawPartialSolution(partialSolution));
    };
    const onSolutionFound = (internalRows, rowIndices) => {
        const solution = rowIndicesToSolution(PUZZLE, internalRows, rowIndices);
        queue.push(drawSolution(solution));
    };
    debugger
    const solutionGenerator = solve1(PUZZLE, onSearchStep, onSolutionFound);
    solutionGenerator.next();
    console.log(queue)
});