const COLOR_SPACE_SIZE = 256;
const COLORING_MODE = {
    BLACK: 0,
    RAINBOW: 1,
    ERASER: 2 
}

const boardDiv = document.querySelector(".board");
const blackButton = document.querySelector("button.black");
const rainbowButton = document.querySelector("button.rainbow");
const eraserButton = document.querySelector("button.eraser");

let coloringValue = COLORING_MODE.BLACK;
let mousePressed = false;

function getTileWidth(tilesPerRow) {
    return Math.floor(boardDiv.clientWidth / tilesPerRow);
}

function assignNewColor(event) {
    let tile = event.target;
    if (event.type === "mouseover" && !mousePressed) return;

    let newColor = "black";
    if (coloringValue === COLORING_MODE.RAINBOW) {
        let r = Math.floor(Math.random() * COLOR_SPACE_SIZE),
            g = Math.floor(Math.random() * COLOR_SPACE_SIZE),
            b = Math.floor(Math.random() * COLOR_SPACE_SIZE);
        newColor = `rgb(${r},${g},${b})`;
    } else if (coloringValue === COLORING_MODE.ERASER) {
        newColor = "white";
    }
    tile.style["background-color"] = newColor;
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
    for (let i = 0; i < tilesPerRow; ++i) {
        let rowI = document.createElement('div');
        rowI.classList.add("row");
        for (let j = 0; j < tilesPerRow; ++j) {
            let colJ = generateTile(tilesPerRow, j);
            rowI.appendChild(colJ);
        }
        boardDiv.appendChild(rowI);
    }
}

function hookUpListeners() {
    blackButton.addEventListener("click", () => coloringValue = COLORING_MODE.BLACK);
    rainbowButton.addEventListener("click", () => coloringValue = COLORING_MODE.RAINBOW);
    eraserButton.addEventListener("click", () => coloringValue = COLORING_MODE.ERASER);
    // Avoid needing to click every pixel. Makes it so clicking and dragging continues to draw
    boardDiv.addEventListener("mousedown", () => (mousePressed = true));
    boardDiv.addEventListener("mouseup", () => (mousePressed = false));
    boardDiv.addEventListener('mouseleave', () => mousePressed = false);
}

function setUpEtchASketch() {
    let tilesPerRow = prompt("Please enter a size for number of squares on each side of the grid:");
    createGrid(tilesPerRow);
    hookUpListeners();
}

setUpEtchASketch();