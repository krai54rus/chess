let cells = document.querySelectorAll('.cell');
const chessmenContainer = document.getElementById('chessmen-container');
const tableMeasure = document.getElementById('table').getBoundingClientRect();
let indexX = 0;
let indexY = 9;
let iter = 0;
const symb = ['a','b','c','d','e','f','g','h'];
const tableCoords = {};
let cellsColor = 1;
const light = '#F2CEA7';
const brown = '#AE572D';
function tableColor(cell,index){
    if (index % 2) {
        if (cellsColor) {
            cell.style.backgroundColor = brown;
        }else{
            cell.style.backgroundColor = light;
        }
        if (index % 8 == 7) {
            if (cellsColor) {
                cellsColor = 0;
            }else{
                cellsColor = 1;
            }
        }
    }else{
        if (!cellsColor) {
            cell.style.backgroundColor = brown;
        }else{
            cell.style.backgroundColor = light;
        }
    }
}
cells.forEach(function(cell,index){
    tableColor(cell,index);
    // Получаем координаты и размеры клетки
    let cellMeasure = cell.getBoundingClientRect(),
    relativePos = {};

    relativePos.x = cellMeasure.left - tableMeasure.left;
    relativePos.y = cellMeasure.top - tableMeasure.top;
    // Каждый 4 индекс переносим цифру по X и смещаем Н lj 1
    indexX++;
    let ostatok = index % 8;
    if (!ostatok) {
        indexY--;
        indexX = 1;
    }
    // Текущие Y и X по шахматной доске
    let currIndexY = indexY;
    let currIndexX = symb[indexX-1];
    let name = `${currIndexX}${currIndexY}`;
    // Таблица клеток доски с их страничными координатами
    tableCoords[name] = {
        x:relativePos.x,
        y:relativePos.y,
        width:cellMeasure.width,
        height:cellMeasure.height
    };
    // Имя клетки
    cell.setAttribute('coord',name);
    // Координаты доски
    cell.setAttribute('data-x',currIndexX);
    cell.setAttribute('data-y',currIndexY);
    // Координаты страницы
    cell.setAttribute('data-pos-x',cellMeasure.x);
    cell.setAttribute('data-pos-y',cellMeasure.y);
});
console.log(tableCoords);
// const coords = {
//     x:[1,2,3,4],
//     y: [1,2,3,4]
// }

// class Figure {
//     constructor(cell){
//         this.cell = cell;
//         // this.x = x;
//         // this.y = y;
//     }
//     draw(name){
//         let coordObj = tableCoords[`${this.cell}`];

//         let elem = document.createElement("div");
//         elem.classList.add('chessman');

//         elem.innerHTML = `<img class="chessman-img" src="./assets/chessmen/${name}.svg" alt="">`;
//         elem.style.left = `${coordObj.x+(coordObj.width-35)/2}px`;
//         elem.style.top =`${coordObj.y+(coordObj.width-35)/2}px`;
//         chessmenContainer.append(elem);
//     }
//     move(){
//         console.log('move');
//     }
// }
class ChessMan{
    constructor(cell,name){
        this.cell = cell;
        this.go = 50;
    }
    draw(name){
        let coordObj = tableCoords[`${this.cell}`];

        let elem = document.createElement("div");
        elem.classList.add('chessman');

        elem.innerHTML = `<img class="chessman-img" src="./assets/chessmen/${name}.svg" alt="">`;
        elem.style.left = `${coordObj.x+(coordObj.width-35)/2}px`;
        elem.style.top =`${coordObj.y+(coordObj.width-35)/2}px`;
        elem.addEventListener('click',(e)=>{
            this.move(elem);
        });
        chessmenContainer.append(elem);
    }
    move(elem){
        let currY = window.getComputedStyle(elem).top.split('px')[0];
        elem.style.top = `${Number(currY)-this.go}px`;
        console.log(currY);
    }
}

class Pawn extends ChessMan{
    constructor(...figure){
        super(figure);
    }
    // move(){
    //     console.log('move');
    // }
}

class Knight extends ChessMan{
    constructor(figure){
        super(figure);
    }
    move(){
        console.log('move');
    }
}

class Bishop extends ChessMan{
    constructor(figure){
        super(figure);
    }
    move(){
        console.log('move');
    }
}

class Rook extends ChessMan{
    constructor(figure){
        super(figure);
    }
    move(){
        console.log('move');
    }
}

class King extends ChessMan{
    constructor(figure){
        super(figure);
    }
    move(){
        console.log('move');
    }
}

class Queen extends ChessMan{
    constructor(figure){
        super(figure);
    }
    move(){
        console.log('move');
    }
}


function Figure(figure){
    if (figure.name == 'pawn') {
        new Pawn(figure.cell).draw(figure.name);
    }
    if (figure.name == 'knight') {
        new Knight(figure.cell).draw(figure.name);
    }
    if (figure.name == 'bishop') {
        new Bishop(figure.cell).draw(figure.name);
    }
    if (figure.name == 'rook') {
        new Rook(figure.cell).draw(figure.name);
    }
    if (figure.name == 'king') {
        new King(figure.cell).draw(figure.name);
    }
    if (figure.name == 'queen') {
        new Queen(figure.cell).draw(figure.name);
    }
}

class Table {
    constructor(){
        this.whitePos = [
            {
                cell:'a2',
                name:'pawn'
            },
            {
                cell:'b2',
                name:'pawn'
            },
            {
                cell:'c2',
                name:'pawn'
            },
            {
                cell:'d2',
                name:'pawn'
            },
            {
                cell:'e2',
                name:'pawn'
            },
            {
                cell:'f2',
                name:'pawn'
            },
            {
                cell:'g2',
                name:'pawn'
            },
            {
                cell:'h2',
                name:'pawn'
            },
            {
                cell:'a1',
                name:'rook'
            },
            {
                cell:'b1',
                name:'knight'
            },
            {
                cell:'c1',
                name:'bishop'
            },
            {
                cell:'d1',
                name:'queen'
            },
            {
                cell:'e1',
                name:'king'
            },
            {
                cell:'f1',
                name:'bishop'
            },
            {
                cell:'g1',
                name:'knight'
            },
            {
                cell:'h1',
                name:'rook'
            }
        ]
    }
    init(){
        this.whitePos.forEach(function(figure){
            Figure(figure);
            // new Figure(figure.cell).draw(figure.name);
        });
    }
}
new Table().init();

// new Figure('a2').draw('pawn');
