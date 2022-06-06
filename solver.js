//solves an unfinished Sudoku
class Solver {

    constructor(board, size = 9) {

        this.board = board;
        this.size = size;
        if (this.checkMistakes()) {throw new Error('Board has mistake');}

        this.solution = [[]];
        for (let i = 1; i < size; i++) {this.solution.push([])}
        
        if (!this.solve()) {throw new Error('No solution');}
        else {
            for (let r = 0; r < this.size; r++) {
                for (let c = 0; c < this.size; c++) {
                    let n = this.board[r][c];
                    if (n !== 0) {this.solution[r][c] = n;}
                }
            }
        }
    }

    //recursive backtarcking method
    solve() {

        //searches for first open cell
        let r, c;
        let gotCell = false;
        for (r = 0; r < this.size && !gotCell; r++) {
            for (c = 0; c < this.size && !gotCell; c++) {
                if (this.board[r][c] === 0) {gotCell = true;}
            }
        }
        if (!gotCell) {return true;} //returns true if there are no open cells
        r--;
        c--;

        //goes through the usable numbers
        let usable = this.getUsable(r, c);
        for (const n of usable) {
            this.board[r][c] = n;
            if (this.solve()) {
                this.solution[r][c] = n;
                return true;
            }
        }
        this.board[r][c] = 0;
        return false; //returns false if all usable numbers are wrong

    }


    //returns the usable numbers for a given cell
    getUsable(x, y) {

        let usable = [];
        let startr = Math.floor(x / 3)*3;
        let startc = Math.floor(y / 3)*3;
        let endr = startr + 3;
        let endc = startc + 3;

        for (let n = 1; n < this.size + 1; n++) {
            let isUsable = true;

            //check x, y axis
            for (let i = 0; i < this.size; i++) {
                if (this.board[i][y] === n || this.board[x][i] === n) {
                    isUsable = false;
                    break;
                }
            }
            
            // check block
            if (this.size === 9 && isUsable) {
                for (let r = startr; r < endr; r++) {
                    for (let c = startc; c < endc; c++) {
                        if (this.board[r][c] === n) {isUsable = false;}
                    }
                }
            }

            if (isUsable) {usable.push(n);}
        }
        return usable;
    }

    //searches the board for errors
    checkMistakes() {
       for (let r = 0; r < this.size; r++) {
           for (let c = 0; c < this.size; c++) {
               let cell = this.board[r][c];
               if (cell === 0) {continue;}
               this.board[r][c] = 0;
               let usable = this.getUsable(r, c);
               this.board[r][c] = cell;
               if (!usable.includes(cell)) {return true;}
           }
       }
       return false;
    }
}

export{Solver};

