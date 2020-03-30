const sudokuUtil = {
    // This is to create the board default board on the screen.
    // It also fills in the puzzle and sets the colors for the background
    // and text
    createPuzzle: (arr) => {
        for(let i = 0; i < arr.length; i++) {
            for(let j = 0; j < arr[i].length; j++) {
                const tile = arr[i][j];
                const div = document.getElementById(`${i}-${j}`);
                const text = document.createTextNode(tile.val);
                if (tile.val === 0) {
                    div.classList.remove('red');
                }
                if (tile.val !== 0) {
                    div.appendChild(text);
                    div.classList.add('red');
                }
                if (tile.gridAttribute === 'gray') {
                    div.classList.add("gray");
                } else {
                    div.classList.add("white");
                };
            };
        };
    },
    // This clears the board so that when you reset no existing things from
    // the last puzzle are still there.
    clearBoard: (num) => {
        for (let i = 0; i < num; i++) {
            for (let j = 0; j < num; j++) {
                const div = document.getElementById(`${i}-${j}`);
                div.innerText = '';
            }
        }
    },
    // Time calculator from milliseconds to real time.
    timeConversion: (millisec) => {

        let seconds = (millisec / 1000).toFixed(1);

        let minutes = (millisec / (1000 * 60)).toFixed(1);

        let hours = (millisec / (1000 * 60 * 60)).toFixed(1);

        let days = (millisec / (1000 * 60 * 60 * 24)).toFixed(1);

        if (seconds < 60) {
            return seconds + " sec";
        } else if (minutes < 60) {
            return minutes + " min";
        } else if (hours < 24) {
            return hours + " hrs";
        } else {
            return days + " days";
        }
    },
    // This is used for knuths algorithm so that i take feed it the puzzle 
    // structure that it is expecting
    algoPuzzleParser: (puzzle) => {
        let newPuzzle = [];
        for(let i = 0; i < puzzle.length; i++) {
            let str = "";
            for(let j = 0; j < puzzle.length; j ++) {
                if( puzzle[i][j].val !== 0) {
                    str += puzzle[i][j].val;
                } else {
                    str += ' ';
                }
            }
            newPuzzle.push(str);
        }
        return newPuzzle;
    }
}

export default sudokuUtil;