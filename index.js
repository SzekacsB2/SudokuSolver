import{Solver} from './solver.js';
var selectedCell = null;

window.onload = function() {
   initalise();
}

document.onkeyup = function(e) {
    if (e.code.includes('Digit')) {
        let n = e.code[5];
        if (n === '0') {return;}
        selectedCell.style.color = 'black';
        selectedCell.innerText = n;
        return;
    }
    if (e.code.includes('Arrow')) {
        let r = selectedCell.id[4];
        let c = selectedCell.id[5];
        switch (e.code) {
            case 'ArrowDown':
                r++;
                if (r > 8) {r = 0;}
                break;
            case 'ArrowUp':
                r--;
                if (r < 0) {r = 8;}
                break;
            case 'ArrowLeft':
                c--;
                if (c < 0) {c = 8;}
                break;
            case 'ArrowRight':
                c++;
                if (c > 8) {c = 0;}
                break;
            default:
                return;
        }
        let id = 'cell' + r.toString() + c.toString();

        selectedCell.classList.remove('cell-selected');
        selectedCell = document.getElementById(id);
        selectedCell.classList.add('cell-selected');
        return;
    }
    if (e.code === 'Backspace') {
        selectedCell.innerText = null;
    }
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

    selectedCell = document.getElementById('cell00');
    selectedCell.classList.add('cell-selected');

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

    document.getElementById('help').addEventListener('click', hide);
    document.getElementById('descr').style.display = 'none';
}

function cellClick() {
    selectedCell.classList.remove('cell-selected');
    selectedCell = this;
    selectedCell.classList.add('cell-selected');
}

function numClick() {
    selectedCell.style.color = 'black';
    selectedCell.innerText = this.id;
}

function delClick() {
    selectedCell.innerText = null;
}

function clear() {
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let id = 'cell' + r.toString() + c.toString();
            document.getElementById(id).innerText = null;
        }
    }
}

function hide() {
    let descr = document.getElementById('descr')
    if (descr.style.display !== 'none') {
        descr.style.display = 'none';
    } else {
        descr.style.display = 'flex';
        document.body.scrollIntoView(false);
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
        alert('ERROR:  board has a mistake');
        return;
    }

    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let id = 'cell' + r.toString() + c.toString();
            let cell = document.getElementById(id);
            if (cell.innerText === '') {
                cell.style.color = '#5e80e6';
                cell.innerText = solv.solution[r][c].toString();
            }
        }
    }
} 

