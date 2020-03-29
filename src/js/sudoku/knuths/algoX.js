import { solve, rowIndicesToSolution } from './knuths';

class AlgoX {
    constructor(puzzle) {
        this.puzzle = puzzle
        this.queue = [];
        
        this.onSearchStep = this.onSearchStep.bind(this)
        this.onSolutionFound = this.onSolutionFound.bind(this)

        this.solutionGenerator = solve(this.puzzle, this.onSearchStep, this.onSolutionFound);
        this.solutionGenerator.next();
    }

    onSearchStep(internalRows, rowIndices) {
        const partialSolution = rowIndicesToSolution(this.puzzle, internalRows, rowIndices);
        this.queue.push(partialSolution);
    }

    onSolutionFound(internalRows, rowIndicies) {
        const solution = rowIndicesToSolution(this.puzzle, internalRows, rowIndicies);
        this.queue.push(solution);
    }
}

export default AlgoX;