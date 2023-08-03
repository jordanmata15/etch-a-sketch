const COLOR_SPACE_SIZE = 256;

const boardDiv = document.querySelector(".board");

let mousePressed = false;
document.body.onmousedown = () => (mousePressed = true)
document.body.onmouseup = () => (mousePressed = false)


function getTileWidth(tilesPerRow) {
    return Math.floor(boardDiv.clientWidth / tilesPerRow);
}

function assignNewColor(event) {
    let tile = event.target;
    if (event.type === "mouseover" && !mousePressed) return;
    tile.style["background-color"] = "black";
}

function generateTile(tilesPerRow) {
    let tileSize = getTileWidth(tilesPerRow);
    let tile = document.createElement('div');
    tile.classList.add("tile");
    tile.style["width"] = tileSize + "px";
    tile.style["height"] = tileSize + "px";
    tile.addEventListener('mousedown', assignNewColor);
    tile.addEventListener('mouseover', assignNewColor);
    return tile;
}

function createGrid(tilesPerRow) {
    let rowI;
    let colJ;
    for (let i = 0; i < tilesPerRow; ++i) {
        rowI = document.createElement('div');
        rowI.classList.add("row");
        for (let j = 0; j < tilesPerRow; ++j) {
            colJ = generateTile(tilesPerRow, j);
            rowI.appendChild(colJ);
        }
        boardDiv.appendChild(rowI);
    }
}

let tilesPerRow = prompt("Please enter a size for number of squares on each side of the grid:");
createGrid(tilesPerRow);