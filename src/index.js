console.log('hello');

let cells = document.querySelectorAll('.cell');
const chessmenContainer = document.getElementById('chessmen-container'); ;
let indexY = 0;
let indexX = 0;
let iter = 0;
const symb = ['a','b','c','d'];
const tableCoords = {};
cells.forEach(function(cell,index){
    // coords
    let coords = cell.getBoundingClientRect();
    console.log(coords);

    indexY++;
    let ostatok = index % 4;
    if (!ostatok) {
        indexX++;
        indexY = 1;
    }
    let currIndexY = indexY;
    let currIndexX = indexX;
    // let name = `${symb[currIndexX-1]}${currIndexY}`;
    let name = `${currIndexX}${currIndexY}`;
    tableCoords[name] = {
        x:coords.x,
        y:coords.y
    };
    cell.setAttribute('data-x',currIndexX);
    cell.setAttribute('data-y',currIndexY);
    cell.setAttribute('data-pos-x',coords.x);
    cell.setAttribute('data-pos-y',coords.y);
});
console.log(tableCoords);
const coords = {
    x:[1,2,3,4],
    y: [1,2,3,4]
}

// const chessmen = 

class Elem{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
    draw(name){
        let elem = document.createElement("div");
        elem.classList.add('chessman');
        let coordObj = tableCoords[`${this.x}${this.y}`];
        console.log(coordObj);
        
        elem.innerHTML = 'xep';
        chessmenContainer.append(elem);
        //elem.setAttribute("style", `left:${coordObj.x}; top: ${coordObj.y};`);
        elem.style.left = `${coordObj.x}px`;
        elem.style.top =`${coordObj.y}px`;
        
        // return name;
    }
}

new Elem(1,2).draw('pawn');