import { solve, rowIndicesToSolution } from './knuths';

class AlgoX {
    constructor(puzzle) {
        this.puzzle = puzzle
        this.queue = [];
        this.orderedPos = [];
        this.orderedVal = [];

        this.onSearchStep = this.onSearchStep.bind(this)
        this.onSolutionFound = this.onSolutionFound.bind(this)

        this.solutionGenerator = solve(this.puzzle, this.onSearchStep, this.onSolutionFound);
        this.solutionGenerator.next();
        this.parse(this.puzzle, this.queue)
    }

    onSearchStep(internalRows, rowIndices) {
        const partialSolution = rowIndicesToSolution(this.puzzle, internalRows, rowIndices);
        this.queue.push(partialSolution);
    }

    onSolutionFound(internalRows, rowIndicies) {
        const solution = rowIndicesToSolution(this.puzzle, internalRows, rowIndicies);
        this.queue.push(solution);
    }

    parse(puzzle, queue) {
        let occupied = [];
        for (let i = 0; i < puzzle.length; i++) {
            for (let j = 0; j < puzzle[i].length; j++) {
                if (puzzle[i][j] !== ' ') {
                    occupied.push(`[${i},${j}]`)
                }
            }
        }
        for (let i = 0; i < queue.length; i++) {
            for (let j = 0; j < queue[i].length; j++) {
                for (let p = 0; p < queue[i][j].length; p++) {
                    let val = queue[i][j][p];
                    if (!occupied.includes(`[${j},${p}]`) && val !== ' ') {
                        this.orderedPos.push([j, p])
                        this.orderedVal.push(val)
                    }
                }
            }
        }
    }
}

export default AlgoX;