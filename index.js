const header = document.getElementById("header");
const body = document.getElementById("body");


for(let i=65; i<=90; i++){
    let char= String.fromCharCode(i);

    const bold = document.createElement("b");
    bold.innerText = char;

    header.appendChild(bold);
}



//inside each row create 26 + 1 cells (1 for serial no.).

function createAndAppendRow(rowNumber) {

    const row = document.createElement("div");
    row.className = "row";

    for(let i=64;i<=90;i++){
    if(i===64){
        //represent serial no.
        const b =document.createElement("b");
        b.innerText = rowNumber;
        row.appendChild(b);
    }
    else{
        //represent empty cell
        const cell = document.createElement("div");
        cell.id = `${String.fromCharCode(i)}${rowNumber}`; //dynamic id colrow =>like : C7 ,A6 ,M7
        cell.contentEditable = "true"; //enable the contenteditable to edit the cell
        cell.addEventListener("focus", onCellFocus);
        row.appendChild(cell);
    }
}
body.appendChild(row);
    
}

for(let i=1;i<=102;i++){
    createAndAppendRow(i);
}
