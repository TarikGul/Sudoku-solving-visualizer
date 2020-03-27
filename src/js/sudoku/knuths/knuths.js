import { solutionGenerator } from './dlx'

const internalOnSearchStep = (onSearchStep, internalRows) =>
    rowIndices => onSearchStep(internalRows, rowIndices);

const internalOnSolutionFound = (onSolutionFound, internalRows) =>
    rowIndices => onSolutionFound(internalRows, rowIndices);


// C.puzzle is going to be the puzzle i make and pass into the buildinternalrows function
export const solve = (puzzle, onSearchStep, onSolutionFound) => {
    const internalRows = buildInternalRows(puzzle);
    const matrix = buildDlxMatrix(internalRows);
    return solutionGenerator(
        matrix,
        internalOnSearchStep(onSearchStep, internalRows),
        internalOnSolutionFound(onSolutionFound, internalRows));
};


export const rowIndicesToSolution = (puzzle, internalRows, rowIndices) => {
    const values = puzzleStringToValues(puzzle);
    const solutionInternalRows = rowIndices.map(rowIndex => internalRows[rowIndex]);
    solutionInternalRows.forEach(internalRow => {
        const { row, col } = internalRow.coords;
        values[row * 9 + col] = String(internalRow.value);
    });
    return valuesToPuzzleString(values);
};

// again c.puzzle is going to be the puzzle i pass into it
const puzzleStringToValues = puzzle => flatten(puzzle.map(s => s.split('')));

const valuesToPuzzleString = values =>
    INDICES.reduce((acc, n) => {
        acc.push(values.slice(n * 9, n * 9 + 9).join(''));
        return acc;
    }, []);

const INDICES = Array.from(Array(9).keys());
const ROWS = INDICES;
const COLS = INDICES;
const DIGITS = INDICES.map(n => n + 1);

const buildInternalRows = puzzle => {
    const seqs = ROWS.map(row =>
        COLS.map(col => {
            const coords = { row, col };
            const initialValue = lookupInitialValue(puzzle, row, col);
            return buildInternalRowsForCell(coords, initialValue);
        }));
    return flatten(flatten(seqs));
};

const flatten = xss => xss.reduce((acc, xs) => acc.concat(xs), []);

const lookupInitialValue = (puzzle, row, col) => Number(puzzle[row][col]);

const buildInternalRowsForCell = (coords, initialValue) => {
    return initialValue
        ? [{ coords, value: initialValue, isInitialValue: true }]
        : DIGITS.map(digit => ({ coords, value: digit, isInitialValue: false }));
};

const buildDlxMatrix = internalRows => internalRows.map(internalRow => buildDlxRow(internalRow));

const buildDlxRow = internalRow => {
    const { row, col } = internalRow.coords;
    const value = internalRow.value;
    const box = rowColToBox(row, col);
    const posVals = encode(row, col);
    const rowVals = encode(row, value - 1);
    const colVals = encode(col, value - 1);
    const boxVals = encode(box, value - 1);
    const result = posVals.concat(rowVals, colVals, boxVals);
    return result;
};

const rowColToBox = (row, col) => Math.floor(row - (row % 3) + (col / 3));

const encode = (major, minor) => {
    const result = Array(81).fill(0);
    result[major * 9 + minor] = 1;
    return result;
};
