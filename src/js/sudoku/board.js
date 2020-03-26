import Tile from './tile';
import Backtrace from './backtrace';
import _ from 'lodash'

class Board {
    constructor(level) {
        this.level = level;
        //creating the groundwork for the new sudoku puzzle
        this.grid = this.createGrid(9, 9);
        this.fillNumbers();
        this.solver1 = new Backtrace(this.grid);
        this.solved = this.solver1.solver()
        this.puzzle = this.generatePuzzle();
    }

    generatePuzzle() {
        let levels = {
            "easy": 36,
            "medium": 46,
            "hard": 52
        };

        let newBoard = _.cloneDeep(this.solved);

        for (let i = 0; i < levels[this.level]; i+=2) {
            let r_x = Math.floor(Math.random() * 9);
            let r_y = Math.floor(Math.random() * 9);
            let p_x = Math.abs(r_x - 8);
            let p_y = Math.abs(r_y - 8);
            if (newBoard[r_x][r_y].val === 0) {
                i-=2;
            } else {
                newBoard[r_x][r_y].val = 0
                newBoard[p_x][p_y].val = 0
            }
        }
        return newBoard;
    }


    createGrid(row, col) {
        let positions = []
        for (let i = 0; i < row; i++) {
            let row = [];
            for (let j = 0; j < col; j++) {
                let curTile = new Tile([i, j], 0);
                row.push(curTile)
            }
            positions.push(row)
        }
        return positions
    }

    fillNumbers() {
        let block = [];
        block.push(this.generateBlockPositions(0, 2));
        block.push(this.generateBlockPositions(3, 5));
        block.push(this.generateBlockPositions(6, 8));

        for (let i = 0; i < block.length; i++) {
            let nums = this.generateRandomNumbers();
            for (let j = 0; j < nums.length; j++) {
                const [pos_x, pos_y] = block[i][j];
                this.grid[pos_x][pos_y].val = nums[j];
            }
        }
    }

    generateRandomNumbers() {
        return this.shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9])
    }

    shuffle(originalArray) {
        let array = [].concat(originalArray);
        let curIdx = array.length, temVal, ranIdx;
        while (0 !== curIdx) {
            // Pick a remaining element...
            ranIdx = Math.floor(Math.random() * curIdx);
            curIdx -= 1;

            // And swap it with the current element.
            temVal = array[curIdx];
            array[curIdx] = array[ranIdx];
            array[ranIdx] = temVal;
        }
        return array;
    }

    generateBlockPositions(startIdx, endIdx) {
        let posArr = [];
        for (let i = startIdx; i <= endIdx; i++) {
            for (let j = startIdx; j <= endIdx; j++) {
                posArr.push([i, j])
            }
        }
        return posArr;
    }
}

export default Board;