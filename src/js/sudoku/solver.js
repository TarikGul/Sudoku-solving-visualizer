import _ from 'lodash'

class Solver {
    constructor(grid) {
        this.board = grid
        this.orderedPos = [];
        this.orderedVal = [];
    }

    solver() {
        let row = this.board.length - 1;
        let col = this.board.length - 1;

        for (let i = 0; i <= row; i++) {
            for (let j = 0; j <= col; j++) {
                if (this.board[i][j].val !== 0) {
                    continue;
                }

                let options = this.getOptions(i, j, this.board)
                if (options.length === 0) {
                    return null;
                }

                for (let k = 0; k < options.length; k++) {
                    this.board[i][j].val = options[k];
                    this.orderedPos.push([i, j]);
                    this.orderedVal.push(options[k]);

                    if (this.solver()) {
                        return this.board;
                    }
                    this.board[i][j].val = 0;
                    this.orderedPos.push([i, j]);
                    this.orderedVal.push(0);
                }
                return null;
            }
        }
        return this.board;
    }

    assign_block(row, col, board) {
        let block = []
        let rowStart = 3 * Math.floor(row / 3)
        let colStart = 3 * Math.floor(col / 3)

        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 2; j++) {
                let curVal = board[rowStart + i][colStart + j]
                block.push(curVal)
            }
        }

        return block
    }

    getOptions(row, col, board) {
        let options = [1, 2, 3, 4, 5, 6, 7, 8, 9]

        //rows
        let mappedRow = board[row].map((el) => el.val)
        options = options.filter((obj) => {
            return mappedRow.indexOf(obj) === -1
        })

        //colunmns
        let columns = []
        for (let i = 0; i < board.length; i++) {
            columns.push(board[i][col]);
        }
        let mappedCols = columns.map((el) => el.val)
        options = options.filter((obj) => {
            return mappedCols.indexOf(obj) === -1
        });

        // square
        let assigned = this.assign_block(row, col, board);
        let mappedSquare = assigned.map((el) => el.val)
        options = options.filter((obj) => {
            return mappedSquare.indexOf(obj) === -1
        });

        return options;
    }
}

export default Solver;