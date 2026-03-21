function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;

    img.onload = () => resolve(img);
    img.onerror = reject;
    console.log("Loaded");
  });
}

const spriteSheet = await loadImage("../images/chess/Chess_Pieces.png");
console.log("after");

window.addEventListener("beforeunload", (event) => {
  event.preventDefault();
});

const white = [];
const black = [];
const startRow = [5, 4, 3, 2, 1, 3, 4, 5];
const rowChars = ["A", "B", "C", "D", "E", "F", "G", "H"];
let temp = 0;

if (Math.random() < .5) {
    console.log("White");
    temp = 0;
} else {
    console.log("Black");
    temp = 1;
}
const you = temp;
loadPieces(you);

function loadPieces(start) {
    let b = start == 0 ? true : false;
    for (let i = 0; i < 16; i++) {
        if (i == 8) {
            b = !b;
        }
        const square1 = document.querySelector(`#${rowChars[i < 8 ? i : i - 8]}${i < 8 ? "1" : "8"}`);
        const canvas1 = document.createElement("canvas");
        canvas1.classList.add("piece");
        const w = 213;
        const h = 213;
        canvas1.width = w;
        canvas1.height = h;
        const ctx1 = canvas1.getContext("2d");
        ctx1.drawImage(spriteSheet, w * (startRow[i < 8 ? i : i - 8] - 1), b ? 0 : w + 1, w, h, 0, 0, w, h);
        square1.appendChild(canvas1);
        b ? white.push({ "id": i < 8 ? i : i - 8, "c": canvas1, "t": startRow[i < 8 ? i : i - 8], "l": `${rowChars[i < 8 ? i : i - 8]}${i < 8 ? "1" : "8"}`}) : black.push({ "id": i < 8 ? i : i - 8, "c": canvas1, "t": startRow[i < 8 ? i : i - 8], "l": `${rowChars[i < 8 ? i : i - 8]}${i < 8 ? "1" : "8"}`});

        const square2 = document.querySelector(`#${rowChars[i < 8 ? i : i - 8]}${i < 8 ? "2" : "7"}`);
        const canvas2 = document.createElement("canvas");
        canvas2.classList.add("piece");
        canvas2.width = w;
        canvas2.height = h;
        const ctx2 = canvas2.getContext("2d");
        ctx2.drawImage(spriteSheet, w * 5, b ? 0 : w + 1, w, h, 0, 0, w, h);
        square2.appendChild(canvas2);
        b ? white.push({ "id": i < 8 ? i + 8 : i, "c": canvas2, "t": 6, "l": `${rowChars[i < 8 ? i : i - 8]}${i < 8 ? "2" : "7"}`}) : black.push({ "id": i < 8 ? i + 8 : i, "c": canvas1, "t": 6, "l": `${rowChars[i < 8 ? i : i - 8]}${i < 8 ? "2" : "7"}`});
    }
    console.log(white);
    console.log(black);
}
