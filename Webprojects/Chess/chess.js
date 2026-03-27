/** Used to load an image */
function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;

    img.onload = () => resolve(img);
    img.onerror = reject;
    console.log("Loaded");
  });
}

// All placing audio
const place1 = new Audio("../audio/place1.mp3");
const place2 = new Audio("../audio/place2.mp3");
const place3 = new Audio("../audio/place3.mp3");
const take1 = new Audio("../audio/take1.mp3");

// Piece sprite sheet
const spriteSheet = await loadImage("../images/chess/Chess_Pieces.png");
console.log("after");

// window.addEventListener("beforeunload", (event) => {
//   event.preventDefault();
// });

// Create board, moves, and pieces holder
const white = [];
const black = [];
const place = [];
const startRow = [5, 4, 3, 2, 1, 3, 4, 5];
const rowChars = ["A", "B", "C", "D", "E", "F", "G", "H"];
// const rowChars = ["H", "G", "F", "E", "D", "C", "B", "A"];
const board = [ [15, 14, 13, 12, 11, 13, 14, 15],
                [16, 16, 16, 16, 16, 16, 16, 16],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [6, 6, 6, 6, 6, 6, 6, 6],
                [5, 4, 3, 2, 1, 3, 4, 5], ]
const pawn = [[-1, -1], [1, -1], [0, -1], [0, -2]];
const bpawn = [[1, 1], [-1, 1], [0, 1], [0, 2]];
const horse = [[-1, -2], [1, -2], [-2, -1], [2, -1], [-2, 1], [2, 1], [-1, 2], [1, 2]];
let temp = 0;

// Start as black or white
if (Math.random() < .5) {
    console.log("Black");
    temp = 0;
} else {
    console.log("White");
    temp = 1;
}
const you = temp;
loadPieces(you);

/** Load all pieces on the board */
function loadPieces(start) {
    for (let i = 0; i < 8; i++) {
        const square1 = document.querySelector(`#${rowChars[i]}8`);
        const canvas1 = document.createElement("canvas");
        canvas1.classList.add("piece");
        const w = 213;
        const h = 213;
        canvas1.width = w;
        canvas1.height = h;
        const ctx1 = canvas1.getContext("2d");
        ctx1.drawImage(spriteSheet, w * (startRow[i] - 1), w + 1, w, h, 0, 0, w, h);
        square1.appendChild(canvas1);
        black.push({ "id": i, "c": canvas1, "t": startRow[i], "l": `${rowChars[i]}8`, "s": false});

        const square12 = document.querySelector(`#${rowChars[i]}1`);
        const canvas12 = document.createElement("canvas");
        canvas12.classList.add("piece");
        canvas12.width = w;
        canvas12.height = h;
        const ctx12 = canvas12.getContext("2d");
        ctx12.drawImage(spriteSheet, w * (startRow[i] - 1), 0, w, h, 0, 0, w, h);
        square12.appendChild(canvas12);
        white.push({ "id": i, "c": canvas12, "t": startRow[i], "l": `${rowChars[i]}1`, "s": false});

        const square2 = document.querySelector(`#${rowChars[i]}7`);
        const canvas2 = document.createElement("canvas");
        canvas2.classList.add("piece");
        canvas2.width = w;
        canvas2.height = h;
        const ctx2 = canvas2.getContext("2d");
        ctx2.drawImage(spriteSheet, w * 5, w + 1, w, h, 0, 0, w, h);
        square2.appendChild(canvas2);
        black.push({ "id": i + 8, "c": canvas2, "t": 6, "l": `${rowChars[i]}7`, "s": false});

        const square22 = document.querySelector(`#${rowChars[i]}2`);
        const canvas22 = document.createElement("canvas");
        canvas22.classList.add("piece");
        canvas22.width = w;
        canvas22.height = h;
        const ctx22 = canvas22.getContext("2d");
        ctx22.drawImage(spriteSheet, w * 5, 0, w, h, 0, 0, w, h);
        square22.appendChild(canvas22);
        white.push({ "id": i + 8, "c": canvas22, "t": 6, "l": `${rowChars[i]}2`, "s": false});
    }
    console.log(white);
    console.log(black);
    if (start == 0) {
       const div = document.querySelector(".board");
       div.classList.add("flipped");
    }
    for (let i = 0; i < 8; i++) {
        const div1 = document.querySelector(`#${start == 0 ? "H" : "A"}${start == 0 ? 8 - i : i + 1}`);
        const p1 = document.createElement("p");
        p1.textContent = start == 0 ? 8 - i : i + 1;
        p1.classList.add("locationy");
        div1.appendChild(p1);
        const div2 = document.querySelector(`#${rowChars[start == 0 ? 7 - i : i]}${start == 0 ? 8 : 1}`);
        const p2 = document.createElement("p");
        p2.textContent = rowChars[start == 0 ? 7 - i : i];
        p2.classList.add("locationx");
        div2.appendChild(p2);
    }
}

// Add a click listener for every square on the board
for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
        const div = document.querySelector(`#${rowChars[j]}${i + 1}`);
        div.addEventListener("click", () => handleChessClick(you, `${rowChars[j]}${i + 1}`, div));
    }
}

/** Handle clicking on an square on the board and interact with your chess pieces */
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

/** Move a given piece */
function move(side, move) {
    let p = [];
    if (side == 0) {
        p = black;
    } else {
        p = white;   
    }
    // isKingChecked(0);
    for (const b of p) {
        if (b.s) {
            const x1 = rowChars.indexOf(b.l[0]);
            const y1 = 8 - Number(b.l[1]);
            const x2 = rowChars.indexOf(move[0]);
            const y2 = 8 - Number(move[1]);
            console.log(`${y1}, ${x1}, ${y2}, ${x2}`);
            placeCheck("", 0, true);
            const div = document.querySelector(`#${b.l}`);
            div.classList.remove("selected");
            div.removeChild(b.c);
            b.s = false;
            if (board[y2][x2] >= (side == 0 ? 1 : 11) && board[y2][x2] <= (side == 0 ? 6 : 16)) {
                take1.volume = .8;
                take1.play();
                board[y1][x1] = 0;
                board[y2][x2] = side == 0 ? b.t + 10 : b.t;
                b.l = move;
                takePiece(side, move);
            } else {
                let num = Math.floor(Math.random() * 3);
                console.log(`Sound: ${num}`);
                if (num == 0) {
                    place1.play();
                } else if (num == 1) {
                    place2.play();
                } else {
                    place3.play();
                }
                board[y1][x1] = 0;
                board[y2][x2] = side == 0 ? b.t + 10 : b.t;
                b.l = move;
            }
            const last = document.querySelector(`#${move}`);
            last.appendChild(b.c);
            break;
        }
    }
    board.forEach(bo => {
        console.log(bo);
    });
}

/** Take an enemies piece */
function takePiece(side, take) {
    let p = [];
    if (side != 0) {
        p = black;
    } else {
        p = white;   
    }
    p.forEach((s , i) => {
        if (s.l == take) {
            p.splice(i, 1);
            const div = document.querySelector(`#${take}`);
            div.removeChild(s.c);
            console.log("TRY CHECK");
            // board.forEach(bo => {
            //     console.log(bo);
            // });
            if (isKingChecked(side == 0 ? 1 : 0)) {
                console.log("CHECK");
                if (isCheckmate(side == 0 ? 1 : 0)) {
                    console.log("MATE");
                } else {
                    console.log("not mate");
                }
            } else {
                console.log("no check");
            }
        }
    });
    console.log(p);
}

/** Check if a space is under attack */
function isBeingAttacked(space, attackColor) {
    console.log(`ATTACK COLOR: ${attackColor}`);
    let p = [];
    if (attackColor == 0) {
        p = black;
    } else {
        p = white;   
    }
    for (const piece of p) {
        const allMoves = findAllMoves(piece.l, attackColor);
        console.log(allMoves);
        for (let m of allMoves) {
            if (m == space) {
                return true;
            }
        }
    }
    return false;
    // for (let i = 0; i < 8; i++) {
    //     for (let j = 0; j < 8; j++) {
    //         let piece = board[i][j];
    //         if (piece == 0 || (piece >= (attackColor == 0 ? 1 : 11) && piece <= (attackColor == 0 ? 6 : 16))) {
    //             console.log(`FAILED: ${piece}`)
    //             continue;
    //         }
    //         console.log(`Piece ${piece} ${rowChars[j]}${i + 1} ${i} ${j}`);
    //         const allMoves = findAllMoves(`${rowChars[j]}${i + 1}`, attackColor);
    //         for (let m of allMoves) {
    //             if (m == space) {
    //                 return true;
    //             }
    //         }
    //     }
    // }
}

function isKingChecked(side) {
    let p = [];
    if (side == 0) {
        p = black;
    } else {
        p = white;   
    }
    const king = p.find(k => k.t == 1).l;
    console.log(`KING: ${king}`);
    return isBeingAttacked(king, side == 0 ? 1 : 0);
}

function isCheckmate(side) {
    let p = [];
    let p2 = [];
    if (side == 0) {
        p = black;
        p2 = white;
    } else {
        p = white;
        p2 = black;
    }
    const king = p.find(k => k.t == 1).l;
    console.log(`KING: ${king}`);

    if (!isBeingAttacked(king, side == 0 ? 1 : 0)) {
        return false;
    }

    for (const piece of p) {
        const allMoves = findAllMoves(piece.l, side);
        for (const m of allMoves) {
            const oldPos = piece.l;
            const x1 = rowChars.indexOf(piece.l[0]);
            const y1 = 8 - Number(piece.l[1]);
            const x2 = rowChars.indexOf(m[0]);
            const y2 = 8 - Number(m[1]);

            board[y1][x1] = 0;
            piece.l = m;
            const oldSpot = board[y2][x2];
            board[y2][x2] = side == 0 ? piece.t + 10 : piece.t;
            // const index = p2.findIndex(o => o.l == m);
            // const removed = p2.splice(index, 1)[0];
            let result = false;
            if (piece.t == 1) {
                console.log("KING MOVED!");
                result = isBeingAttacked(m, side == 0 ? 1 : 0);
            } else {
                result = isBeingAttacked(king, side == 0 ? 1 : 0);
            }
            if (!result) {
                console.log(`FAILED: ${y1} ${x1}, ${side} ${piece.l} ${m}`);
                console.log(piece);
                console.log(p);
                board.forEach(bo => {
                    console.log(bo);
                });
            }

            board[y1][x1] = side == 0 ? piece.t + 10 : piece.t;
            board[y2][x2] = oldSpot;
            piece.l = oldPos;
            // p2.push(removed);
            if (!result) {
                return false;
            }
        }
    }
    return true;
}

/** Find all spots a piece can move to */
function placeCheck(name, side, disable) {
    while (place.length > 0) {
        const r = place.pop().m;
        r.classList.remove("moves");
    }
    if (!disable) {
        const foundMoves = findAllMoves(name, side);
        console.log(foundMoves);
        for (const m of foundMoves) {
            const move = document.querySelector(`#${m}`);
            move.classList.add("moves");
            place.push({ "m": move, "s": `${m}`});
        }
    }
}

/** Find all pieces moves */
function findAllMoves(name, side) {
    const x = rowChars.indexOf(name[0]);
    const y = 8 - Number(name[1]);
    const type = board[y][x];
    console.log(`${y} ${x} ${type}`);
    if (type - (side == 0 ? 10 : 0) == 1) {
        console.log("King");
        return kingMoves(side, y, x);
    } else if (type - (side == 0 ? 10 : 0) == 2) {
        console.log("Queen");
        return queenMoves(side, y, x);
    } else if (type - (side == 0 ? 10 : 0) == 3) {
        console.log("Bishop");
        return bishopMoves(side, y, x);
    } else if (type - (side == 0 ? 10 : 0) == 4) {
        console.log("Horse");
        return horseMoves(side, y, x);
    } else if (type - (side == 0 ? 10 : 0) == 5) {
        console.log("Rook");
        return rookMoves(side, y, x);
    } else if (type - (side == 0 ? 10 : 0) == 6) {
        console.log("Pawn");
        return pawnMoves(side, y, x);
    }
    return [];
}

/** Find all king moves */
function kingMoves(side, y, x) {
    const foundMoves = [];
    if (y - 1 >= 0 && ((board[y - 1][x] >= (side == 0 ? 1 : 11) && board[y - 1][x] <= (side == 0 ? 6 : 16)) || board[y - 1][x] == 0)) {
        foundMoves.push(`${rowChars[x]}${9 - y}`);
    }
    if (y - 1 >= 0 && x + 1 <= 7 && ((board[y - 1][x + 1] >= (side == 0 ? 1 : 11) && board[y - 1][x + 1] <= (side == 0 ? 6 : 16)) || board[y - 1][x + 1] == 0)) {
        foundMoves.push(`${rowChars[x + 1]}${9 - y}`);
    }
    if (x + 1 <= 7 && ((board[y][x + 1] >= (side == 0 ? 1 : 11) && board[y][x + 1] <= (side == 0 ? 6 : 16)) || board[y][x + 1] == 0)) {
        foundMoves.push(`${rowChars[x + 1]}${8 - y}`);
    }
    if (x + 1 <= 7 && y + 1 <= 7 && ((board[y+ 1][x + 1] >= (side == 0 ? 1 : 11) && board[y + 1][x + 1] <= (side == 0 ? 6 : 16)) || board[y + 1][x + 1] == 0)) {
        foundMoves.push(`${rowChars[x + 1]}${7 - y}`);
    }
    if (y + 1 <= 7 && ((board[y + 1][x] >= (side == 0 ? 1 : 11) && board[y + 1][x] <= (side == 0 ? 6 : 16)) || board[y + 1][x] == 0)) {
        foundMoves.push(`${rowChars[x]}${7 - y}`);
    }
    if (y + 1 <= 7 && x - 1 >= 0 && ((board[y + 1][x - 1] >= (side == 0 ? 1 : 11) && board[y + 1][x - 1] <= (side == 0 ? 6 : 16)) || board[y + 1][x - 1] == 0)) {
        foundMoves.push(`${rowChars[x - 1]}${7 - y}`);
    }
    if (x - 1 >= 0 && ((board[y][x - 1] >= (side == 0 ? 1 : 11) && board[y][x - 1] <= (side == 0 ? 6 : 16)) || board[y][x - 1] == 0)) {
        foundMoves.push(`${rowChars[x - 1]}${8 - y}`);
    }
    if (x - 1 >= 0 && y - 1 >= 0 && ((board[y - 1][x - 1] >= (side == 0 ? 1 : 11) && board[y - 1][x - 1] <= (side == 0 ? 6 : 16)) || board[y - 1][x - 1] == 0)) {
        foundMoves.push(`${rowChars[x - 1]}${9 - y}`);
    }
    return foundMoves;
}

/** Find all queen moves */
function queenMoves(side, y, x) {
    return bishopMoves(side, y, x).concat(rookMoves(side, y, x));
}

/** Find all bishop moves */
function bishopMoves(side, y, x) {
    const foundMoves = [];
    let b1 = true;
    let b2 = true;
    let b3 = true;
    let b4 = true;
    for (let i = 0; i < 7; i++) {
        if (b1 && y - i - 1 >= 0 && x - i - 1 >= 0 && ((board[y - i - 1][x - i - 1] >= (side == 0 ? 1 : 11) && board[y - i - 1][x - i - 1] <= (side == 0 ? 6 : 16)) || board[y - i - 1][x - i - 1] == 0)) {
            if (board[y - i - 1][x - i - 1] >= (side == 0 ? 1 : 11) && board[y - i - 1][x - i - 1] <= (side == 0 ? 6 : 16)) {
                b1 = false;
            }
            foundMoves.push(`${rowChars[x - i - 1]}${9 - (y - i)}`);
        } else {
            b1 = false;
        }
        if (b2 && y + i + 1 <= 7 && x + i + 1 && ((board[y + i + 1][x + i + 1] >= (side == 0 ? 1 : 11) && board[y + i + 1][x + i + 1] <= (side == 0 ? 6 : 16)) || board[y + i + 1][x + i + 1] == 0)) {
            if (board[y + i + 1][x + i + 1] >= (side == 0 ? 1 : 11) && board[y + i + 1][x + i + 1] <= (side == 0 ? 6 : 16)) {
                b2 = false;
            }
            foundMoves.push(`${rowChars[x + i + 1]}${7 - (y + i)}`);
        } else {
            b2 = false;
        }
        if (b3 && x - i - 1 >= 0 && y + i + 1 <= 7 && ((board[y + i + 1][x - i - 1] >= (side == 0 ? 1 : 11) && board[y + i + 1][x - i - 1] <= (side == 0 ? 6 : 16)) || board[y + i + 1][x - i - 1] == 0)) {
            if (board[y + i + 1][x - i - 1] >= (side == 0 ? 1 : 11) && board[y + i + 1][x - i - 1] <= (side == 0 ? 6 : 16)) {
                b3 = false;
            }
            foundMoves.push(`${rowChars[x - i - 1]}${7 - (y + i)}`);
        } else {
            b3 = false;
        }
        if (b4 && x + i + 1 <= 7 && y - i - 1 >= 0 && ((board[y - i - 1][x + i + 1] >= (side == 0 ? 1 : 11) && board[y - i - 1][x + i + 1] <= (side == 0 ? 6 : 16)) || board[y - i - 1][x + i + 1] == 0)) {
            if (board[y - i - 1][x + i + 1] >= (side == 0 ? 1 : 11) && board[y - i - 1][x + i + 1] <= (side == 0 ? 6 : 16)) {
                b4 = false;
            }
            foundMoves.push(`${rowChars[x + i + 1]}${9 - (y - i)}`);
        } else {
            b4 = false;
        }
    }
    return foundMoves;
}

/** Find all horse moves */
function horseMoves(side, y, x) {
    const foundMoves = [];
    if (y + horse[0][1] >= 0 && x + horse[0][0] >= 0 && ((board[y + horse[0][1]][x + horse[0][0]] >= (side == 0 ? 1 : 11) && board[y + horse[0][1]][x + horse[0][0]] <= (side == 0 ? 6 : 16)) || board[y + horse[0][1]][x + horse[0][0]] == 0)) {
        foundMoves.push(`${rowChars[x + horse[0][0]]}${8 - (y + horse[0][1])}`);
    }
    if (y + horse[1][1] >= 0 && x + horse[1][0] <= 7 && ((board[y + horse[1][1]][x + horse[1][0]] >= (side == 0 ? 1 : 11) && board[y + horse[1][1]][x + horse[1][0]] <= (side == 0 ? 6 : 16)) || board[y + horse[1][1]][x + horse[1][0]] == 0)) {
        foundMoves.push(`${rowChars[x + horse[1][0]]}${8 - (y + horse[1][1])}`);
    }
    if (y + horse[2][1] >= 0 && x + horse[2][0] >= 0 && ((board[y + horse[2][1]][x + horse[2][0]] >= (side == 0 ? 1 : 11) && board[y + horse[2][1]][x + horse[2][0]] <= (side == 0 ? 6 : 16)) || board[y + horse[2][1]][x + horse[2][0]] == 0)) {
        foundMoves.push(`${rowChars[x + horse[2][0]]}${8 - (y + horse[2][1])}`);
    }
    if (y + horse[3][1] >= 0 && x + horse[3][0] <= 7 && ((board[y + horse[3][1]][x + horse[3][0]] >= (side == 0 ? 1 : 11) && board[y + horse[3][1]][x + horse[3][0]] <= (side == 0 ? 6 : 16)) || board[y + horse[3][1]][x + horse[3][0]] == 0)) {
        foundMoves.push(`${rowChars[x + horse[3][0]]}${8 - (y + horse[3][1])}`);
    }
    if (y + horse[4][1] <= 7 && x + horse[4][0] >= 0 && ((board[y + horse[4][1]][x + horse[4][0]] >= (side == 0 ? 1 : 11) && board[y + horse[4][1]][x + horse[4][0]] <= (side == 0 ? 6 : 16)) || board[y + horse[4][1]][x + horse[4][0]] == 0)) {
        foundMoves.push(`${rowChars[x + horse[4][0]]}${8 - (y + horse[4][1])}`);
    }
    if (y + horse[5][1] <= 7 && x + horse[5][0] <= 7 && ((board[y + horse[5][1]][x + horse[5][0]] >= (side == 0 ? 1 : 11) && board[y + horse[5][1]][x + horse[5][0]] <= (side == 0 ? 6 : 16)) || board[y + horse[5][1]][x + horse[5][0]] == 0)) {
        foundMoves.push(`${rowChars[x + horse[5][0]]}${8 - (y + horse[5][1])}`);
    }
    if (y + horse[6][1] <= 7 && x + horse[6][0] >= 0 && ((board[y + horse[6][1]][x + horse[6][0]] >= (side == 0 ? 1 : 11) && board[y + horse[6][1]][x + horse[6][0]] <= (side == 0 ? 6 : 16)) || board[y + horse[6][1]][x + horse[6][0]] == 0)) {
        foundMoves.push(`${rowChars[x + horse[6][0]]}${8 - (y + horse[6][1])}`);
    }
    if (y + horse[7][1] <= 7 && x + horse[7][0] <= 7 && ((board[y + horse[7][1]][x + horse[7][0]] >= (side == 0 ? 1 : 11) && board[y + horse[7][1]][x + horse[7][0]] <= (side == 0 ? 6 : 16)) || board[y + horse[7][1]][x + horse[7][0]] == 0)) {
        foundMoves.push(`${rowChars[x + horse[7][0]]}${8 - (y + horse[7][1])}`);
    }
    return foundMoves;
}

/** Find all rook moves */
function rookMoves(side, y, x) {
    const foundMoves = [];
    let r1 = true;
    let r2 = true;
    let r3 = true;
    let r4 = true;
    for (let i = 0; i < 7; i++) {
        if (r1 && y - i - 1 >= 0  && ((board[y - i - 1][x] >= (side == 0 ? 1 : 11) && board[y - i - 1][x] <= (side == 0 ? 6 : 16)) || board[y - i - 1][x] == 0)) {
            if (board[y - i - 1][x] >= (side == 0 ? 1 : 11) && board[y - i - 1][x] <= (side == 0 ? 6 : 16)) {
                r1 = false;
            }
            foundMoves.push(`${rowChars[x]}${9 - (y - i)}`);
        } else {
            r1 = false;
        }
        if (r2 && y + i + 1 <= 7  && ((board[y + i + 1][x] >= (side == 0 ? 1 : 11) && board[y + i + 1][x] <= (side == 0 ? 6 : 16)) || board[y + i + 1][x] == 0)) {
            if (board[y + i + 1][x] >= (side == 0 ? 1 : 11) && board[y + i + 1][x] <= (side == 0 ? 6 : 16)) {
                r2 = false;
            }
            foundMoves.push(`${rowChars[x]}${7 - (y + i)}`);
        } else {
            r2 = false;
        }
        if (r3 && x - i - 1 >= 0  && ((board[y][x - i - 1] >= (side == 0 ? 1 : 11) && board[y][x - i - 1] <= (side == 0 ? 6 : 16)) || board[y][x - i - 1] == 0)) {
            if (board[y][x - i - 1] >= (side == 0 ? 1 : 11) && board[y][x - i - 1] <= (side == 0 ? 6 : 16)) {
                r3 = false;
            }
            foundMoves.push(`${rowChars[x - i - 1]}${8 - y}`);
        } else {
            r3 = false;
        }
        if (r4 && x + i + 1 <= 7  && ((board[y][x + i + 1] >= (side == 0 ? 1 : 11) && board[y][x + i + 1] <= (side == 0 ? 6 : 16)) || board[y][x + i + 1] == 0)) {
            if (board[y][x + i + 1] >= (side == 0 ? 1 : 11) && board[y][x + i + 1] <= (side == 0 ? 6 : 16)) {
                r4 = false;
            }
            foundMoves.push(`${rowChars[x + i + 1]}${8 - y}`);
        } else {
            r4 = false;
        }
    }
    return foundMoves;
}

/** Find all pawn moves */
function pawnMoves(side, y, x) {
    const foundMoves = [];
    let p = pawn;
    if (side == 0) {
        p = bpawn;
        if (y + p[0][1] <= 7 && x + p[0][0] >= 0 && board[y + p[0][1]][x + p[0][0]] >= (side == 0 ? 1 : 11) && board[y + p[0][1]][x + p[0][0]] <= (side == 0 ? 6 : 16)) {
            foundMoves.push(`${rowChars[x + p[0][0]]}${8 - (y + p[0][1])}`)
        }
        if (y + p[1][1] <= 7 && x + p[1][0] <= 7  && board[y + p[1][1]][x + p[1][0]] >= (side == 0 ? 1 : 11) && board[y + p[1][1]][x + p[1][0]] <= (side == 0 ? 6 : 16)) {
            foundMoves.push(`${rowChars[x + p[1][0]]}${8 - (y + p[1][1])}`);
        }
        if (y + p[2][1] <= 7 && board[y + p[2][1]][x] == 0) {
            foundMoves.push(`${rowChars[x]}${8 - (y + p[2][1])}`);
        }
        if (y == 1 && y + p[3][1] <= 7 && board[y + p[3][1]][x] == 0 && board[y + p[3][1] + 1][x] == 0) {
            foundMoves.push(`${rowChars[x]}${8 - (y + p[3][1])}`);
        }
    } else {
        if (y + p[0][1] >= 0 && x + p[0][0] >= 0 && board[y + p[0][1]][x + p[0][0]] >= (side == 0 ? 1 : 11) && board[y + p[0][1]][x + p[0][0]] <= (side == 0 ? 6 : 16)) {
            foundMoves.push(`${rowChars[x + p[0][0]]}${8 - (y + p[0][1])}`)
        }
        if (y + p[1][1] >= 0 && x + p[1][0] <= 7  && board[y + p[1][1]][x + p[1][0]] >= (side == 0 ? 1 : 11) && board[y + p[1][1]][x + p[1][0]] <= (side == 0 ? 6 : 16)) {
            foundMoves.push(`${rowChars[x + p[1][0]]}${8 - (y + p[1][1])}`);
        }
        if (y + p[2][1] >= 0 && board[y + p[2][1]][x] == 0) {
            foundMoves.push(`${rowChars[x]}${8 - (y + p[2][1])}`);
        }
        if (y == 6 && y + p[3][1] >= 0 && board[y + p[3][1]][x] == 0 && board[y + p[3][1] + 1][x] == 0) {
            foundMoves.push(`${rowChars[x]}${8 - (y + p[3][1])}`);
        }
    }
    return foundMoves;
}
