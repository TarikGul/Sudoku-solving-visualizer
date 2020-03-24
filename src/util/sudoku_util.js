const sudokuUtil = {
    createPuzzle: (arr) => {
        for(let i = 0; i < arr.length; i++) {
            for(let j = 0; j < arr[i].length; j++) {
                const tile = arr[i][j]
                const div = document.getElementById(`${i}-${j}`)
                const text = document.createTextNode(tile.val)
                if (tile.val !== 0) {
                    div.appendChild(text)
                }
                if (tile.gridAttribute === 'gray') {
                    div.classList.add("gray")
                } else {
                    div.classList.add("white")
                }
            }
        }
    },
}

export default sudokuUtil;