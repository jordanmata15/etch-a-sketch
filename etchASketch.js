const boardDiv = document.querySelector(".board");

function getExpectedWidth(dimension) {
    return Math.floor(boardDiv.clientWidth / dimension);
}

function generateTile(dimension, index) {
    let expectedSize = getExpectedWidth(dimension);
    let tile = document.createElement('div');
    tile.classList.add("tile", "column", "col-" + index);
    tile.style["width"] = expectedSize + "px";
    tile.style["height"] = expectedSize + "px";
    tile.style["display"] = "flex"; 
    tile.style["justify-content"] = "center";
    tile.style["align-items"] = "center";
    tile.style["flex-direction"] = "row";
    tile.textContent = index;
    return tile;
}

function addRowStyle(row) {
    row.style["display"] = "flex";
    row.style["justify-content"] = "center";
    row.style["align-items"] = "center";
    row.style["flex-direction"] = "row";
    return row;
}

function createGrid(dimension) {
    let rowI;
    let colJ;
    for (let i = 0; i < dimension; ++i) {
        rowI = document.createElement('div');
        rowI.classList.add("tile", "row", "row-" + i);
        for (let j = 0; j < dimension; ++j) {
            colJ = generateTile(dimension, j);
            rowI.appendChild(colJ);
            
        }
        rowI = addRowStyle(rowI);
        boardDiv.appendChild(rowI);
    }
}

let gridSize = prompt("Please enter a size for number of squares on each side of the grid:");
createGrid(gridSize);