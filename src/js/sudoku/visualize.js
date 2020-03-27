import Backtrace from './backtrace'
import _ from 'lodash'

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
        this.time = 0
    }

    // This is where we choose which algorithm is going to be solved an initialized
    initializeAlgo() {
        if (this.algorithm === "Backtrace") {
            let solved = new Backtrace(_.cloneDeep(this.board.puzzle));
            solved.solver();
            this.orderedPositions =  solved.orderedPos
            this.orderedTraversal = solved.orderedVal
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
            const nextPos = this.orderedPositions[i].parsePos();
            const nextVal = this.orderedTraversal[i];
            let [cur_x, cur_y] = this.orderedPositions[i];
            setTimeout(() => {
                const tile = document.getElementById(nextPos);
                const counter = document.getElementById('counter')
                counter.innerText = `Iterations: ${this.count}`
                if (nextVal === 0) {
                    tile.innerText = '';
                } else {
                    tile.innerText = `${nextVal}`;
                }
                this.board.puzzle[cur_x][cur_y].val = nextVal;
                this.count += 1
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