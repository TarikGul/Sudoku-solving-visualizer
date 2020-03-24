class Tile {
    constructor(pos, val) {
        this.pos = pos;
        this.val = val;
        this.gridAttribute;
        this.candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        this.section();
    }

    section() {
        let [row, col] = this.pos;
        let rowStart = Math.floor(row / 3);
        let colStart = Math.floor(col / 3);
        const whites = ["[0,1]", "[1,0]", "[1,2]", "[2,1]"];
        let gridSection = [rowStart, colStart];
        if (whites.includes(JSON.stringify(gridSection))) {
            this.gridAttribute = "white";
        } else {
            this.gridAttribute = "gray";
        }
    }

}

export default Tile;