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

    // This is where we choose which algorithm is going to be solved an initialized
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

    visualizeAlgo() {

        let i = 0;
        const loopStep = () => {
            
            if (i === this.orderedTraversal.length) {
                return;
            } else if (this.reset === true) {
                this.reset = false
                return;
            }
            let lastPos;
            if (i !== 0) {
                lastPos = this.orderedPositions[i - 1].parsePos();
            }
            const nextPos = this.orderedPositions[i].parsePos();
            const nextVal = this.orderedTraversal[i];

            const [cur_x, cur_y] = this.orderedPositions[i];
            
            setTimeout(() => {
                const tile = document.getElementById(nextPos);
                const lastTile = document.getElementById(lastPos)
                const timer = document.getElementById('time');
                const counter = document.getElementById('counter');
                
                counter.innerText = `Iterations: ${this.count}`
                timer.innerText = `Time: ${sudokuUtil.timeConversion(this.time)}`
                if (nextVal === 0) {
                    tile.innerText = '';
                } else {
                    tile.innerText = `${nextVal}`;
                }

                tile.style.background = 'red';
                
                if (lastPos !== undefined) {
                    lastTile.style.background = '';
                }
                if (i === this.orderedPositions.length) {
                    tile.style.background = '';
                }
                this.board.puzzle[cur_x][cur_y].val = nextVal;
                this.count += 1
                this.time += this.speed
                loopStep();
                i++
            }, this.speed)
        }
        loopStep();
    }

    abort() {   
        this.reset = true
    }
}

Array.prototype.parsePos = function () {
    const x = this[0];
    const y = this[1];

    return `${x}-${y}`;
};

export default Visualize;