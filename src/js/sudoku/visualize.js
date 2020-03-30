import Backtrace from './backtrace'
import AlgoX from './knuths/algoX'
import _ from 'lodash'
import sudokuUtil from '../../util/sudoku_util'

// Import all the algorithms in here, make a select event listener 
// Once a person selects and clicks solve it will visualize the algorithm for you

class Visualize {
    constructor(algorithm, board, speed = 100) {
        this.algorithm = algorithm
        this.board = board
        this.orderedTraversal;
        this.orderedPositions;
        this.reset = false;
        this.speed = speed
        this.count = 0;
        this.time = 0;
    }

    // This is where we choose which algorithm is going to be solved and initialized
    // The structure of the solution received from each algorithm needs to be the same
    initializeAlgo() {
        if (this.algorithm === "Backtrace") {
            let solved = new Backtrace(_.cloneDeep(this.board.puzzle));
            solved.solver();
            this.orderedPositions =  solved.orderedPos;
            this.orderedTraversal = solved.orderedVal;
        } else if (this.algorithm === "AlgoX") {
            let puzzle = sudokuUtil.algoPuzzleParser(this.board.puzzle);
            let solved = new AlgoX(puzzle);
            this.orderedPositions = solved.orderedPos;
            this.orderedTraversal = solved.orderedVal;
        }
    }

    // This is where we visualize the algorithm on the board everytime solved
    // is clicked
    visualizeAlgo() {

        let i = 0;

        // Enter a loopstep recurisve call, that will act as a setInterval
        const loopStep = () => {
            
            // Base case to allow us to leave the function for a reset, 
            // or exit the recursive call when we reach the last entry in the array
            if (i === this.orderedTraversal.length) {
                return;
            } else if (this.reset === true) {
                this.reset = false
                return;
            }

            // These are the positions and values that are going to be placed
            // on the board. They are formatted specifically for this in the 
            // algorithms
            const nextPos = this.orderedPositions[i].parsePos();
            const nextVal = this.orderedTraversal[i];

            const [cur_x, cur_y] = this.orderedPositions[i];
            
            setTimeout(() => {
                const tile = document.getElementById(nextPos);
                const timer = document.getElementById('time');
                const counter = document.getElementById('counter');
                
                // This allows us to change the counter, timer, and inner text
                // of each element on the board
                counter.innerText = `Iterations: ${this.count}`
                timer.innerText = `Time: ${sudokuUtil.timeConversion(this.time)}`
                if (nextVal === 0) {
                    tile.innerText = '';
                } else {
                    tile.innerText = `${nextVal}`;
                }

                // Add the cool styling so that each element looks like its
                // apart of a proper visualizer
                tile.classList.add('o-red')
                setTimeout(() => {
                    tile.classList.remove('o-red');
                }, 500)
        
                // Set the tile value to its proper value
                this.board.puzzle[cur_x][cur_y].val = nextVal;
                this.count += 1
                this.time += this.speed
                loopStep();
                i++
            }, this.speed)
        }
        loopStep();
    };

    // This is used to abort out of the recursive call in order to reset the board
    abort() {   
        this.reset = true;
    };
}

Array.prototype.parsePos = function () {
    const x = this[0];
    const y = this[1];

    return `${x}-${y}`;
};

export default Visualize;