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

// window.addEventListener("beforeunload", (event) => {
//   event.preventDefault();
// });

const white = [];
const black = [];
const place = [];
const startRow = [5, 4, 3, 2, 1, 3, 4, 5];
const rowChars = ["A", "B", "C", "D", "E", "F", "G", "H"];
const board = [ [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0], ]
const pawn = [[-1, -1], [1, -1], [0, -1], [0, -2]];
const horse = [[-1, -2], [1, -2], [-2, -1], [2, -1], [-2, 1], [2, 1], [-1, 2], [1, 2]];
let temp = 0;

if (Math.random() < .5) {
    console.log("Black");
    temp = 0;
} else {
    console.log("White");
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
        b ? white.push({ "id": i < 8 ? i : i - 8, "c": canvas1, "t": startRow[i < 8 ? i : i - 8], "l": `${rowChars[i < 8 ? i : i - 8]}${i < 8 ? "1" : "8"}`, "s": false}) : black.push({ "id": i < 8 ? i : i - 8, "c": canvas1, "t": startRow[i < 8 ? i : i - 8], "l": `${rowChars[i < 8 ? i : i - 8]}${i < 8 ? "1" : "8"}`, "s": false});
        b ? board[i < 8 ? 0 : 7][i < 8 ? i : i - 8] = startRow[i < 8 ? i : i - 8] : board[i < 8 ? 0 : 7][i < 8 ? i : i - 8] = startRow[i < 8 ? i : i - 8] + 10;

        const square2 = document.querySelector(`#${rowChars[i < 8 ? i : i - 8]}${i < 8 ? "2" : "7"}`);
        const canvas2 = document.createElement("canvas");
        canvas2.classList.add("piece");
        canvas2.width = w;
        canvas2.height = h;
        const ctx2 = canvas2.getContext("2d");
        ctx2.drawImage(spriteSheet, w * 5, b ? 0 : w + 1, w, h, 0, 0, w, h);
        square2.appendChild(canvas2);
        b ? white.push({ "id": i < 8 ? i + 8 : i, "c": canvas2, "t": 6, "l": `${rowChars[i < 8 ? i : i - 8]}${i < 8 ? "2" : "7"}`, "s": false}) : black.push({ "id": i < 8 ? i + 8 : i, "c": canvas2, "t": 6, "l": `${rowChars[i < 8 ? i : i - 8]}${i < 8 ? "2" : "7"}`, "s": false});
        b ? board[i < 8 ? 1 : 6][i < 8 ? i : i - 8] = 6 : board[i < 8 ? 1 : 6][i < 8 ? i : i - 8] = 16;
    }
    console.log(white);
    console.log(black);
    board.forEach(bo => {
        console.log(bo);
    });
}

for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
        const div = document.querySelector(`#${rowChars[j]}${i + 1}`);
        div.addEventListener("click", () => handleChessClick(you, `${rowChars[j]}${i + 1}`, div));
    }
}

function handleChessClick(side, name, div) {
    let p = [];
    if (side == 0) {
        p = black;
    } else {
        p = white;   
    }
    let found = false;
    for (const s of place) {
        console.log(`${s.s} ${name}`);
        if (s.s == name) {
            console.log(`Found: ${name}`);
            move(side, name);
            return;
        }
    }
    for (const b of p) {
        if (name == b.l && b.s) {
            placeCheck(b.l, side, b.s);
            b.s = false;
            found = true;
            break;
        } else if (name == b.l) {
            found = true;
            placeCheck(b.l, side, b.s);
            b.s = true;
            break;
        }
    }
    if (found) {
        p.forEach(b => {
            if (name != b.l && b.s) {
                b.s = false;
                const last = document.querySelector(`#${b.l}`);
                last.classList.remove("selected");
            }
        });
        div.classList.toggle("selected");
    }
    console.log(p);
}

function move(side, move) {
    let p = [];
    if (side == 0) {
        p = black;
    } else {
        p = white;   
    }
    for (const b of p) {
        if (b.s) {
            const x1 = rowChars.indexOf(b.l[0]);
            const y1 = Number(b.l[1]) - 1;
            const x2 = rowChars.indexOf(move[0]);
            const y2 = Number(move[1]) - 1;
            console.log(`${y1}, ${x1}, ${y2}, ${x2}`);
            placeCheck("", 0, true);
            const div = document.querySelector(`#${b.l}`);
            div.classList.remove("selected");
            div.removeChild(b.c);
            b.s = false;
            board[y1][x1] = 0;
            board[y2][x2] = side == 0 ? b.t + 10 : b.t;
            const last = document.querySelector(`#${move}`);
            last.appendChild(b.c);
            b.l = move;
            break;
        }
    }
    board.forEach(bo => {
        console.log(bo);
    });
}

function placeCheck(name, side, disable) {
    console.log(place.length);
    while (place.length > 0) {
        const r = place.pop().m;
        r.classList.remove("moves");
    }
    if (!disable) {
        const x = rowChars.indexOf(name[0]);
        const y = Number(name[1]) - 1;
        const type = board[y][x];
        if (type - (side == 0 ? 10 : 0) == 1) {
            console.log("King");
        } else if (type - (side == 0 ? 10 : 0) == 2) {
            console.log("Queen");
        } else if (type - (side == 0 ? 10 : 0) == 3) {
            console.log("Bishop");
        } else if (type - (side == 0 ? 10 : 0) == 4) {
            console.log("Horse");
            if (y + horse[0][1] >= 0 && x + horse[0][0] >= 0 && ((board[y + horse[0][1]][x + horse[0][0]] >= (side == 0 ? 1 : 11) && board[y + horse[0][1]][x + horse[0][0]] <= (side == 0 ? 6 : 16)) || board[y + horse[0][1]][x + horse[0][0]] == 0)) {
                const move = document.querySelector(`#${rowChars[x + horse[0][0]]}${y + horse[0][1] + 1}`);
                move.classList.add("moves");
                place.push({ "m": move, "s": `${rowChars[x + horse[0][0]]}${y + horse[0][1] + 1}`});
            }
            if (y + horse[1][1] >= 0 && x + horse[1][0] <= 7 && ((board[y + horse[1][1]][x + horse[1][0]] >= (side == 0 ? 1 : 11) && board[y + horse[1][1]][x + horse[1][0]] <= (side == 0 ? 6 : 16)) || board[y + horse[1][1]][x + horse[1][0]] == 0)) {
                const move = document.querySelector(`#${rowChars[x + horse[1][0]]}${y + horse[1][1] + 1}`);
                move.classList.add("moves");
                place.push({ "m": move, "s": `${rowChars[x + horse[1][0]]}${y + horse[1][1] + 1}`});
            }
            if (y + horse[2][1] >= 0 && x + horse[2][0] >= 0 && ((board[y + horse[2][1]][x + horse[2][0]] >= (side == 0 ? 1 : 11) && board[y + horse[2][1]][x + horse[2][0]] <= (side == 0 ? 6 : 16)) || board[y + horse[2][1]][x + horse[2][0]] == 0)) {
                const move = document.querySelector(`#${rowChars[x + horse[2][0]]}${y + horse[2][1] + 1}`);
                move.classList.add("moves");
                place.push({ "m": move, "s": `${rowChars[x + horse[2][0]]}${y + horse[2][1] + 1}`});
            }
            if (y + horse[3][1] >= 0 && x + horse[3][0] <= 7 && ((board[y + horse[3][1]][x + horse[3][0]] >= (side == 0 ? 1 : 11) && board[y + horse[3][1]][x + horse[3][0]] <= (side == 0 ? 6 : 16)) || board[y + horse[3][1]][x + horse[3][0]] == 0)) {
                const move = document.querySelector(`#${rowChars[x + horse[3][0]]}${y + horse[3][1] + 1}`);
                move.classList.add("moves");
                place.push({ "m": move, "s": `${rowChars[x + horse[3][0]]}${y + horse[3][1] + 1}`});
            }
            if (y + horse[4][1] <= 7 && x + horse[4][0] >= 0 && ((board[y + horse[4][1]][x + horse[4][0]] >= (side == 0 ? 1 : 11) && board[y + horse[4][1]][x + horse[4][0]] <= (side == 0 ? 6 : 16)) || board[y + horse[4][1]][x + horse[4][0]] == 0)) {
                const move = document.querySelector(`#${rowChars[x + horse[4][0]]}${y + horse[4][1] + 1}`);
                move.classList.add("moves");
                place.push({ "m": move, "s": `${rowChars[x + horse[4][0]]}${y + horse[4][1] + 1}`});
            }
            if (y + horse[5][1] <= 7 && x + horse[5][0] <= 7 && ((board[y + horse[5][1]][x + horse[5][0]] >= (side == 0 ? 1 : 11) && board[y + horse[5][1]][x + horse[5][0]] <= (side == 0 ? 6 : 16)) || board[y + horse[5][1]][x + horse[5][0]] == 0)) {
                const move = document.querySelector(`#${rowChars[x + horse[5][0]]}${y + horse[5][1] + 1}`);
                move.classList.add("moves");
                place.push({ "m": move, "s": `${rowChars[x + horse[5][0]]}${y + horse[5][1] + 1}`});
            }
            if (y + horse[6][1] <= 7 && x + horse[6][0] >= 0 && ((board[y + horse[6][1]][x + horse[6][0]] >= (side == 0 ? 1 : 11) && board[y + horse[6][1]][x + horse[6][0]] <= (side == 0 ? 6 : 16)) || board[y + horse[6][1]][x + horse[6][0]] == 0)) {
                const move = document.querySelector(`#${rowChars[x + horse[6][0]]}${y + horse[6][1] + 1}`);
                move.classList.add("moves");
                place.push({ "m": move, "s": `${rowChars[x + horse[6][0]]}${y + horse[6][1] + 1}`});
            }
            if (y + horse[7][1] <= 7 && x + horse[7][0] <= 7 && ((board[y + horse[7][1]][x + horse[7][0]] >= (side == 0 ? 1 : 11) && board[y + horse[7][1]][x + horse[7][0]] <= (side == 0 ? 6 : 16)) || board[y + horse[7][1]][x + horse[7][0]] == 0)) {
                const move = document.querySelector(`#${rowChars[x + horse[7][0]]}${y + horse[7][1] + 1}`);
                move.classList.add("moves");
                place.push({ "m": move, "s": `${rowChars[x + horse[7][0]]}${y + horse[7][1] + 1}`});
            }
        } else if (type - (side == 0 ? 10 : 0) == 5) {
            console.log("Rook");
        } else if (type - (side == 0 ? 10 : 0) == 6) {
            console.log("Pawn");
            if (y + pawn[0][1] >= 0 && x + pawn[0][0] >= 0 && board[y + pawn[0][1]][x + pawn[0][0]] >= (side == 0 ? 1 : 11) && board[y + pawn[0][1]][x + pawn[0][0]] <= (side == 0 ? 6 : 16)) {
                const move = document.querySelector(`#${rowChars[x + pawn[0][0]]}${y + pawn[0][1] + 1}`);
                move.classList.add("moves");
                place.push({ "m": move, "s": `${rowChars[x + pawn[0][0]]}${y + pawn[0][1] + 1}`});
            }
            if (y + pawn[1][1] >= 0 && x + pawn[1][0] <= 7  && board[y + pawn[1][1]][x + pawn[1][0]] >= (side == 0 ? 1 : 11) && board[y + pawn[1][1]][x + pawn[1][0]] <= (side == 0 ? 6 : 16)) {
                const move = document.querySelector(`#${rowChars[x + pawn[1][0]]}${y + pawn[1][1] + 1}`);
                move.classList.add("moves");
                place.push({ "m": move, "s": `${rowChars[x + pawn[1][0]]}${y + pawn[1][1] + 1}`});
            }
            if (y + pawn[2][1] >= 0 && board[y + pawn[2][1]][x] == 0) {
                const move = document.querySelector(`#${rowChars[x]}${y + pawn[2][1] + 1}`);
                move.classList.add("moves");
                place.push({ "m": move, "s": `${rowChars[x]}${y + pawn[2][1] + 1}`});
            }
            if (y == 6 && y + pawn[3][1] >= 0 && board[y + pawn[3][1]][x] == 0 && board[y + pawn[3][1] + 1][x] == 0) {
                const move = document.querySelector(`#${rowChars[x]}${y + pawn[3][1] + 1}`);
                move.classList.add("moves");
                place.push({ "m": move, "s": `${rowChars[x]}${y + pawn[3][1] + 1}`});
            }
        }
    }
}
