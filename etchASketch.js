const COLOR_SPACE_SIZE = 256;
const COLORING_MODE = {
    BLACK: 0,
    RAINBOW: 1,
    GRADIENT: 2,
    ERASER: 3 
}

const boardDiv = document.querySelector(".board");
const sizeSliderValue = document.querySelector(".size-selector > .size-value");
const sizeSlider = document.querySelector("input");
const blackButton = document.querySelector("button.black");
const rainbowButton = document.querySelector("button.rainbow");
const gradientButton = document.querySelector("button.gradient");
const eraserButton = document.querySelector("button.eraser");
const colorOptionsButtonList = [blackButton, rainbowButton, eraserButton];
const clearButton = document.querySelector("button.clear");

let coloringValue = COLORING_MODE.BLACK;
let mousePressed = false;
let gradientValue = 0; // incrementally make the pen darker (starting at white)

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
    } else if (coloringValue === COLORING_MODE.GRADIENT) {
        let totalTiles = (sizeSlider.value) ** 2;
        let gradientPercent = Math.max(0, 1-(gradientValue/totalTiles));
        newColor = `rgb(${Math.floor(gradientPercent*255)},
                        ${Math.floor(gradientPercent*255)}, 
                        ${Math.floor(gradientPercent*255)})`;
        gradientValue += 1;
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

function generateGrid(tilesPerRow) {
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

function handleButtonPress(buttonPressed, newColor) {
    colorOptionsButtonList.forEach(button => button.classList.remove('pressed'))
    buttonPressed.classList.add('pressed');
    coloringValue = newColor;
}

function hookUpListeners() {
    blackButton.addEventListener("click", () => handleButtonPress(blackButton, COLORING_MODE.BLACK));
    rainbowButton.addEventListener("click", () => handleButtonPress(rainbowButton, COLORING_MODE.RAINBOW));
    gradientButton.addEventListener("click", () => handleButtonPress(gradientButton, COLORING_MODE.GRADIENT));
    eraserButton.addEventListener("click", () => handleButtonPress(eraserButton, COLORING_MODE.ERASER));
    clearButton.addEventListener("click", () => setUpEtchASketch(sizeSlider.value));
    // Avoid needing to click every pixel. Makes it so clicking and dragging continues to draw
    boardDiv.addEventListener("mousedown", () => (mousePressed = true));
    boardDiv.addEventListener("mouseup", () => (mousePressed = false));
    boardDiv.addEventListener('mouseleave', () => mousePressed = false);
}

function setUpEtchASketch(tilesPerRow) {
    gradientValue = 0;
    boardDiv.replaceChildren([]); // delete existing board (if any)
    generateGrid(tilesPerRow);
    hookUpListeners();
}

// show the size as the user slides the bar
sizeSlider.addEventListener("input", () => {
    sizeSliderValue.textContent = sizeSlider.value + " x " + sizeSlider.value;
});
// wait until user releases mouse click to actually generate the grid
sizeSlider.addEventListener("mouseup", () => {
    setUpEtchASketch(sizeSlider.value);
});

sizeSliderValue.textContent = sizeSlider.value + " x " + sizeSlider.value;
setUpEtchASketch(sizeSlider.value);