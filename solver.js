//solves an unfinished Sudoku
class Solver {
    constructor(board, size) {
        this.board = board;
        this.size = size;
        if(this.checkMistakes()) {throw new Error('Board has mistake');}
        this.solution = new Array(size).fill(new Array(size));
        if(!this.solve()) {throw new Error('No solution');}
    }

    //recursive backtarcking method
    solve() {

        //searches for first open cell
        let r, c;
        let gotCell = false;
        for(r = 0; r < this.size && !gotCell; r++) {
            for (c = 0; c < this.size && !gotCell; c++) {
                if(this.board[r][c] !== 0) {gotCell = true;}
            }
        }
        if(!gotCell) {return true;} //returns true if there are no open cells

        //goes through the usable numbers
        let usable = this.getUsable(r, c);
        usable.forEach(n => {
            this.board[r][c] = n;
            if(this.solve()) {
                this.solution[r][c] = n;
                console.log(n);
                return true;
            }
        });
        this.board[r][c] = 0;
        return false; //returns false if all usable numbers are wrong

    }

    //returns the usable numbers for a given cell
    getUsable(x, y) {
        let usable = [];
        for(let n = 1; n < this.size + 1; n++) {
            let isUsable = true;
            //check x, y axis
            for(let r = 0; r < this.size && isUsable; r++) {
                if(this.board[r][y] === n) {isUsable = false;}
            }
            for(let c = 0; c < this.size && isUsable; c++) {
                if(this.board[x][c] === n) {isUsable = false;}
            }

            //check block
            //TODO: annyira nem akarom

            if(isUsable) {usable.push(n);}
        }
        return usable;
    }

    //searches the board for errors
    checkMistakes() {
        return false;
        //TODO: ehez kell a getUsable
    }
}

try {
    let solv = new Solver([
        [6, 3, 5, 0, 8, 0, 1, 0, 0],
        [0, 0, 0, 5, 3, 0, 0, 4, 0],
        [0, 0, 7, 0, 0, 1, 3, 0, 0],
        [5, 0, 0, 0, 9, 2, 0, 1, 0],
        [9, 0, 2, 0, 0, 0, 0, 0, 4],
        [1, 8, 0, 0, 0, 0, 0, 0, 2],
        [4, 0, 0, 0, 2, 0, 0, 7, 0],
        [7, 0, 0, 0, 0, 5, 0, 0, 8],
        [3, 0, 8, 0, 0, 0, 0, 9, 0]
    ], 9);
    console.log(solv.solution);
} catch (e) {
   console.error(e);
}
/*
[0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0],
*/

