const sudokuUtil = {
    createPuzzle: (arr) => {
        // debugger
        for(let i = 0; i < arr.length; i++) {
            // debugger
            for(let j = 0; j < arr[i].length; j++) {
                const value = arr[i][j].val
                const div = document.getElementById(`${i}-${j}`)
                const text = document.createTextNode(value)
                console.log("th")
                if (value !== 0) {
                    div.appendChild(text)
                }
            }
        }
    },
}

export default sudokuUtil;