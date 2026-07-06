const rows = ["", "", "", "", "", ""];

async function getData(link) {
    const res = await fetch(link);
    return res.json();
}

const validWords = await getData("valid_words.json");
const keyWords = await getData("key_words.json");

console.log(validWords);
console.log(keyWords);

let row = 0;
let decisions = [0, 0, 0, 0, 0]; // 0 = not in word, 1 = wrong spot, 2 = correct

const keys = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1];

let wordlyWord = getWordly(0);

const reset = document.querySelector(".reset");
reset.addEventListener('click', () => {
    wordlyWord = getWordly(1);
    resetBoard();
});

const rowDivs = [document.querySelector("#row1").children, document.querySelector("#row2").children, document.querySelector("#row3").children, document.querySelector("#row4").children, document.querySelector("#row5").children, document.querySelector("#row6").children];
console.log(rowDivs);

resetBoard();

for (let i = 0; i < 26; i++) {
    document.querySelector(`#k${i}`).addEventListener("click", () => {
        document.dispatchEvent(
            new KeyboardEvent("keydown", {
                key: String.fromCharCode("a".charCodeAt(0) + i),
                code: ("a".charCodeAt(0) + i),
                bubbles: true
            })
        );
    });
}

document.addEventListener("keydown", (event) => {
    if (row >= 6) {
        console.log("Game ended.");
        return;
    } else if (event.key == "Backspace" && rows[row].length > 0) {
        rows[row] = rows[row].substring(0, rows[row].length - 1);
        for (let i = 0; i < 5; i++) {
            if (i < rows[row].length) {
                rowDivs[row][i].textContent = rows[row][i];
            } else {
                rowDivs[row][i].textContent = "";
            }
        }
    } else if (/^[a-z]$/i.test(event.key) && rows[row].length < 5) {
        rows[row] = `${rows[row]}${event.key.toUpperCase()}`;
        for (let i = 0; i < 5; i++) {
            if (i < rows[row].length) {
                rowDivs[row][i].textContent = rows[row][i];
            } else {
                rowDivs[row][i].textContent = "";
            }
        }
    } else if (event.key == "Enter" && rows[row].length == 5) {
        if (validWords.includes(rows[row].toLowerCase()) || keyWords.includes(rows[row].toLowerCase())) {
            console.log("Valid word");
            checkPositions(row);
            row += 1;
            event.preventDefault();
        } else {
            console.log("Invalid word");
        }
    } else if (event.key == "Enter") {
        console.log("Not enough characters.");
    }
});

function resetBoard() {
    rowDivs.forEach(d => {
        d[0].textContent = "";
        d[1].textContent = "";
        d[2].textContent = "";
        d[3].textContent = "";
        d[4].textContent = "";
    });
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 5; j++) {
            rowDivs[i][j].classList.remove("wrong");
            rowDivs[i][j].classList.remove("close");
            rowDivs[i][j].classList.remove("correct");
        }
    }
    rows[0] = "";
    rows[1] = "";
    rows[2] = "";
    rows[3] = "";
    rows[4] = "";
    for (let i = 0; i < 26; i++) {
        keys[i] = -1;
        document.querySelector(`#k${i}`).classList.remove("wrong");
        document.querySelector(`#k${i}`).classList.remove("close");
        document.querySelector(`#k${i}`).classList.remove("correct");
    }
    row = 0;
}

function checkPositions(r) {
    const word = rows[r].toLowerCase();
    if (wordlyWord == word) {
        decisions = [2, 2, 2, 2, 2];
        row = 11;
    } else {
        const left = [];
        for (let i = 0; i < 5; i++) {
            if (word[i] == wordlyWord[i]) {
                decisions[i] = 2;
            } else {
                left.push(wordlyWord[i]);
            }
        }
        for (let i = 0; i < 5; i++) {
            if (decisions[i] != 2 && left.includes(word[i])) {
                const index = left.indexOf(word[i]);
                decisions[i] = 1;
                left.splice(index, 1);
            }
        }
    }
    console.log(decisions);
    for (let i = 0; i < 5; i++) {
        if (decisions[i] == 0) {
            rowDivs[r][i].classList.add("wrong");
        } else if (decisions[i] == 1) {
            rowDivs[r][i].classList.add("close");
        } else {
            rowDivs[r][i].classList.add("correct");
        }
    }
    for (let i = 0; i < 26; i++) {
        for (let j = 0; j < 5; j++) {
            if (("a".charCodeAt(0) + i) == word.charCodeAt(j) && keys[i] == -1) {
                if (decisions[j] == 0) {
                    keys[i] = 0;
                    document.querySelector(`#k${i}`).classList.add("wrong");
                } else if (decisions[j] == 1) {
                    keys[i] = 1;
                    document.querySelector(`#k${i}`).classList.add("close");
                } else if (decisions[j] == 2) {
                    keys[i] = 2;
                    document.querySelector(`#k${i}`).classList.add("correct");
                }
            } else if (("a".charCodeAt(0) + i) == word.charCodeAt(j) && keys[i] == 1 && decisions[j] == 2) {
                keys[i] = 2;
                document.querySelector(`#k${i}`).classList.add("correct");
            }
        }
    }
    decisions = [0, 0, 0, 0, 0];
}

function hashString(str) {
    let hash = 0;

    for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) - hash) + str.charCodeAt(i);
        hash |= 0;
    }

    return Math.abs(hash);
}

function hash(x) {
    x = ((x >>> 16) ^ x) * 0x45d9f3b;
    x = ((x >>> 16) ^ x) * 0x45d9f3b;
    x = (x >>> 16) ^ x;
    return x >>> 0;
}

function getWordly(type) {
    if (type == 0) {
        let daysToAdvance = 11;
        const day = Math.floor((Date.now() + daysToAdvance * 86400000) / 86400000);
        const answer = keyWords[day % keyWords.length];
        console.log(answer);
        return answer;
    } else {
        const answer = keyWords[(Math.floor(Math.random() * 4294967296)) % keyWords.length];
        console.log(answer);
        return answer;
    }
}

