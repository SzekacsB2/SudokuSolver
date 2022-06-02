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
}

function cellClick() {
    if (selectedCell !== null) {selectedCell.classList.remove('cell-selected');}
    selectedCell = this;
    selectedCell.classList.add('cell-selected');
}

function numClick() {
    if (selectedCell !== null) {
        selectedCell.innerText = this.id;
        selectedCell.classList.add('cell-active');
    }
}

function delClick() {
    if (selectedCell !== null) {
        selectedCell.innerText = null;
        selectedCell.classList.remove('cell-active')
    }
}

