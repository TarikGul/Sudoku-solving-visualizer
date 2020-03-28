import { solutionGenerator } from './dlx'

class AlgoX {
    constructor(puzzle) {
        this.puzzle = puzzle;
        this.INDICES = Array.from(Array(9).keys());
        this.ROWS = INDICES;
        this.COLS = INDICES;
        this.DIGITS = INDICES.map(n => n + 1);
        this.queue = [];
    }

    internalOnSearchStep(onSearchStep, internalRows) {
        rowIndices => onSearchStep(internalRows, rowIndices)
    };

    internalOnSolutionFound(onSolutionFound, internalRows) {
        rowIndicies => onSolutionFound(internalRows, rowIndicies)
    };

    solve(puzzle, internalRows, rowIndicies) {
        const internalRows = this.buildInternalRows(puzzle);
        const matrix = this.buildDlxMatrix(internalRows)
        return solutionGenerator(matrix, 
            this.internalOnSearchStep(onSearchStep, internalRows),
            this.internalOnSolutionFound(onSolutionFound, internalRows));
    };

    rowIndiciesToSolution(puzzle, internalRows, rowIndicies) {
        const values = this.puzzleStringToValues(puzzle)
        const solutionInternalRows = rowIndicies.map(rowIndex => internalRows[rowIndex]);
            solutionInternalRows.forEach(internalRow => {
                const { row, col } = internalRow.coords;
                values[row * 9 + col] = String(internalRow.value);
            });
        return this.valuesToPuzzleString(values)
    }

    puzzleStringToValues(puzzle) {
        this.flatten(puzzle.map(s => s.split('')))
    }

    valuesToPuzzleString(values) {
        this.INDICES.reduce((acc, n) => {
            acc.push(values.slice(n * 9, n * 9 + 9).join(''));
            return acc;
        }, []);
    }

    // Note the extra bracket here, and the difference between the OG --v
    buildInternalRows(puzzle) {
        const ses = this.ROWS.map(row => {
            this.COLS.map(col => {
                const coords = { row, col };
                const initialValue = this.lookupInitialValue(puzzle, row, col);
                return this.buildInternalRowsForCell(coords, initialValue);
            })
        });
        return flatten(flatten(seqs));
    };

    flatten(xss) {
        xss.reduce((acc,xs) => acc.concat(xs), []);
    };

    lookupInitialValue(puzzle, row, col) {
        Number(puzzle[row][col])
    };

    buildInternalRowsForCell(coords, initialValue) {
        return initialValue
            ? [{ coords, value: initialValue, initialValue: true }]
            : DIGIITS.map(digit => ({coords, value: digit, isInitialValue: false}))
    };

    buildDlxMatrix(internalRow) {
        const { row, col } = internalRow.coords;
        const value = internalRow.value;
        const box = this.rowColToBox(row, col);
        const posVals = this.encode(row, col);
        const rowVals = this.encode(row, value - 1);
        const colVals = this.encode(col, value - 1);
        const boxVals = this.encode(box, value - 1);
        const result = posVals.concat(rowVals, colVals, boxVals);
        return result;
    }

    rowColToBox(row, col) {
        Math.floor(row - (row % 3) + (col / 3));
    };

    encode(major, minor) {
        const result = Array(81).fill(0);
        result[major * 9 + minor] = 1;
        return result;
    }
}

export default AlgoX;