import{Solver} from './solver.js';
var selectedCell = null;

window.onload = function() {
   initalise();
}

function initalise() {
    // board 
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let cell = document.createElement('div');
            cell.id = 'cell' + r.toString() + c.toString();
            cell.innerText = null;
            cell.addEventListener('click', cellClick);
            cell.classList.add('cell');
            if (r === 2 || r === 5) {cell.classList.add('horizontal-border');}
            if (c === 2 || c === 5) {cell.classList.add('vertical-border');}
            document.getElementById('board').appendChild(cell);
        }
    }

    // numpad
    for (let i = 1; i < 10; i++) {
        let num = document.createElement('div');
        num.id = i;
        num.innerText = i;
        num.addEventListener('click', numClick);
        num.classList.add('num');
        document.getElementById('numpad').appendChild(num);
    }

    let del = document.createElement('div');
    del.id = 'delete'
    del.innerText = 'delete'
    del.addEventListener('click', delClick);
    del.classList.add('delete')
    document.getElementById('numpad').appendChild(del);

    // buttonpad
    document.getElementById('clear').addEventListener('click', clear);
    document.getElementById('solve').addEventListener('click', solve);
}

function cellClick() {
    if (selectedCell !== null) {selectedCell.classList.remove('cell-selected');}
    selectedCell = this;
    selectedCell.classList.add('cell-selected');
}

function numClick() {
    if (selectedCell !== null) {
        selectedCell.innerText = this.id;
    }
}

function delClick() {
    if (selectedCell !== null) {
        selectedCell.innerText = null;
    }
}

function clear() {
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let id = 'cell' + r.toString() + c.toString();
            document.getElementById(id).innerText = null;
        }
    }
}


function solve() {
    let solv;
    let board = [];
    for (let r = 0; r < 9; r++) {
        let line = [];
        for (let c = 0; c < 9; c++) {
            let id = 'cell' + r.toString() + c.toString();
            let value = document.getElementById(id).innerText;
            line[c] = (value === '') ? 0 : parseInt(value);
        }
        board[r] = line;
    }

    try {
        solv = new Solver(board);
    } catch (error) {
        console.error(error);
        return;
    }

    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let id = 'cell' + r.toString() + c.toString();
            document.getElementById(id).innerText = solv.solution[r][c].toString();
        }
    }
} 

