class Board {
    constructor(row, col) {
        this.rowLen = row;
        this.colLen = col;
    }

    makeRows() {
        const container = document.getElementsByClassName('sudoku-board')[0]
        console.log("the dolphin has")
        for (let i = 0; i < this.rowLen; i += 1) {
            const row = document.createElement('div');
            row.className = 'grid-row';
            container.appendChild(row);

            for (let j = 0; j < this.colLen; j += 1) {
                const cell = document.createElement('div');
                cell.className = 'grid-item';
                row.appendChild(cell);
                cell.id = `${i}-${j}`;
            }
        };
    }
}

export default Board;