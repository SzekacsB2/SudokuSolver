class Solver {
    constructor(size, board) {
        this.size = size
        this.board = board
        this.solution = new Array(size).fill(new Array(size))
        this.isSolvable = undefined
    }

    Solve() {
        for(let r = 0; r < this.size; r++) {
            for (let c = 0; c < this.size; c++) {
                if(this.board[r][c] !== 0) continue
                
            }
        }
    }
}