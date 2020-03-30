# Sudoku-solving-visualizer

##### [Live Site](https://tarikgul.github.io/Sudoku-solving-visualizer/dist/)

## Table of Contents

* [About](#about)
* [Algorithms](#algorithms)
* [Code Snippets](#code-snippets)

---

![sudoku](public/sudoku-gif.gif)

---

## About

#### Interface Theme

This site tries to keep the style simple and straight to the point. What is important here is the visualizer, and the algorithm's themselves, so I decided to keep it to almost the same feeling a newspaper would give you. Making it almost a flashback to how Sudokus were orginally accessed.

#### What are Sudoku's?

Sudokus are apart of a group known to the Exact Cover problem. It stems from NP vs P, and Exact Cover problems are considered to be NP-Complete. This is quiet important and valuable because in computer science, any problem considered to be NP-Complete means its solution is also a solution for any, and all NP problems. This makes the nature of these types of problems quiet difficult and can usually be seen solved by heuristic brute force methods which we will get into further down. 

A Sudoku is a 9x9 puzzle, where every 3x3 grid is a collection of numbers 1 through 9. Now every row, and column are also 1 through 9, and may not repeat any indivudal number. This makes for an interesting puzzle when you start to take away certain blocks from the grid. The point of the puzzle is to find the correct numbers for every position in the grid. 

---

## Algorithms

* Backtracing
* Knuths Algorithm X

#### Backtracing

Backtracing is a recursive brute force method in order to check all possibilities to a problem. This method in particuler checks every block one by one horizontally, and will determine if the possible numbers for that position have been exhausted or not. If it has, it will go back up the stack, and try the next number in the previous call stack. This is repeated until the solution for the board is found, if there is one. Below in the code snippet you can see we have three main functions, ```solver```, ```assignBlock```, and ```getOptions```. what getOptions does is assign a position its 3x3 block, and tell give it an array of possible numbers. It is then put into the solve method, and the first the number in that array is chosen then the solver will go to the nxt position. Once a position is exhausted of all its numbers, the solver function will go backwards to a previous position and chose the next number in the array, and so on and so forth. 

``` javascript
class Backtrace {
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

    assignBlock(row, col, board) {
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
        let assigned = this.assignBlock(row, col, board);
        let mappedSquare = assigned.map((el) => el.val)
        options = options.filter((obj) => {
            return mappedSquare.indexOf(obj) === -1
        });

        return options;
    }
}
```

#### Knuths Algorithm X

Knuths Algorithm X, is a incredibly interesting approach to solving a Sudoku, and is considered an Optimized Brute Force method, which can also be assigned a heuristic method on top of it to make it more efficient. 
