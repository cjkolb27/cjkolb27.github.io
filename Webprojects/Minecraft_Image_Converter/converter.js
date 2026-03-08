const pica = window.pica();

let output = Array.from({ length: 1 }, () => Array(1).fill(0));
let previous = null;
let checkboxes = {};
const cachedData = localStorage.getItem('iconSelections');

let selected = {};
let cached = false;
if (cachedData) {
    selected = JSON.parse(cachedData);
    cached = true;
}

const wood = document.getElementById("wood");
wood.addEventListener('click', function() {
    this.classList.toggle('is-open');
});

const ore = document.getElementById("ore");
ore.addEventListener('click', function() {
    this.classList.toggle('is-open');
});

const wool = document.getElementById("wool");
wool.addEventListener('click', function() {
    this.classList.toggle('is-open');
});

const complex = document.getElementById("complex");
complex.addEventListener('click', function() {
    this.classList.toggle('is-open');
});

const expensive = document.getElementById("expensive");
expensive.addEventListener('click', function() {
    this.classList.toggle('is-open');
});

const high_contrast = document.getElementById("high-contrast");
high_contrast.addEventListener('click', function() {
    this.classList.toggle('is-open');
});

const other = document.getElementById("other");
other.addEventListener('click', function() {
    this.classList.toggle('is-open');
});

const impossible = document.getElementById("impossible");
impossible.addEventListener('click', function() {
    this.classList.toggle('is-open');
});

const wrapper_wood = document.querySelector(".wrapper-wood");
wrapper_wood.addEventListener('click', (event) => {
    event.stopPropagation();
});

const wrapper_ore = document.querySelector(".wrapper-ore");
wrapper_ore.addEventListener('click', (event) => {
    event.stopPropagation();
});

const wrapper_wool = document.querySelector(".wrapper-wool");
wrapper_wool.addEventListener('click', (event) => {
    event.stopPropagation();
});

const wrapper_complex = document.querySelector(".wrapper-complex");
wrapper_complex.addEventListener('click', (event) => {
    event.stopPropagation();
});

const wrapper_expensive = document.querySelector(".wrapper-expensive");
wrapper_expensive.addEventListener('click', (event) => {
    event.stopPropagation();
});

const wrapper_high_contrast = document.querySelector(".wrapper-high-contrast");
wrapper_high_contrast.addEventListener('click', (event) => {
    event.stopPropagation();
});

const wrapper_other = document.querySelector(".wrapper-other");
wrapper_other.addEventListener('click', (event) => {
    event.stopPropagation();
});

const wrapper_impossible = document.querySelector(".wrapper-impossible");
wrapper_impossible.addEventListener('click', (event) => {
    event.stopPropagation();
});

const allWood = document.getElementById("all-check-wood");
allWood.addEventListener('click', (event) => {
    event.stopPropagation();
    noneWood.checked = !allWood.checked;
    makeAllOrNone("wood", allWood.checked);
});
const noneWood = document.getElementById("none-check-wood");
noneWood.addEventListener('click', (event) => {
    event.stopPropagation();
    allWood.checked = !noneWood.checked;
    makeAllOrNone("wood", !noneWood.checked);
});

const allOre = document.getElementById("all-check-ore");
allOre.addEventListener('click', (event) => {
    event.stopPropagation();
    noneOre.checked = !allOre.checked;
    makeAllOrNone("ore", allOre.checked);
});
const noneOre = document.getElementById("none-check-ore");
noneOre.addEventListener('click', (event) => {
    event.stopPropagation();
    allOre.checked = !noneOre.checked;
    makeAllOrNone("ore", !noneOre.checked);
});

const allWool = document.getElementById("all-check-wool");
allWool.addEventListener('click', (event) => {
    event.stopPropagation();
    noneWool.checked = !allWool.checked;
    makeAllOrNone("wool", allWool.checked);
});
const noneWool = document.getElementById("none-check-wool");
noneWool.addEventListener('click', (event) => {
    event.stopPropagation();
    allWool.checked = !noneWool.checked;
    makeAllOrNone("wool", !noneWool.checked);
});

const allComplex = document.getElementById("all-check-complex");
allComplex.addEventListener('click', (event) => {
    event.stopPropagation();
    noneComplex.checked = !allComplex.checked;
    makeAllOrNone("complex", allComplex.checked);
});
const noneComplex = document.getElementById("none-check-complex");
noneComplex.addEventListener('click', (event) => {
    event.stopPropagation();
    allComplex.checked = !noneComplex.checked;
    makeAllOrNone("complex", !noneComplex.checked);
});

const allExpensive = document.getElementById("all-check-expensive");
allExpensive.addEventListener('click', (event) => {
    event.stopPropagation();
    noneExpensive.checked = !allExpensive.checked;
    makeAllOrNone("expensive", allExpensive.checked);
});
const noneExpensive = document.getElementById("none-check-expensive");
noneExpensive.addEventListener('click', (event) => {
    event.stopPropagation();
    allExpensive.checked = !noneExpensive.checked;
    makeAllOrNone("expensive", !noneExpensive.checked);
});

const allHighContrast = document.getElementById("all-check-high-contrast");
allHighContrast.addEventListener('click', (event) => {
    event.stopPropagation();
    noneHighContrast.checked = !allHighContrast.checked;
    makeAllOrNone("high_contrast", allHighContrast.checked);
});
const noneHighContrast = document.getElementById("none-check-high-contrast");
noneHighContrast.addEventListener('click', (event) => {
    event.stopPropagation();
    allHighContrast.checked = !noneHighContrast.checked;
    makeAllOrNone("high_contrast", !noneHighContrast.checked);
});

const allOther = document.getElementById("all-check-other");
allOther.addEventListener('click', (event) => {
    event.stopPropagation();
    noneOther.checked = !allOther.checked;
    makeAllOrNone("other", allOther.checked);
});
const noneOther = document.getElementById("none-check-other");
noneOther.addEventListener('click', (event) => {
    event.stopPropagation();
    allOther.checked = !noneOther.checked;
    makeAllOrNone("other", !noneOther.checked);
});

const allImpossible = document.getElementById("all-check-impossible");
allImpossible.addEventListener('click', (event) => {
    event.stopPropagation();
    noneImpossible.checked = !allImpossible.checked;
    makeAllOrNone("impossible", allImpossible.checked);
});
const noneImpossible = document.getElementById("none-check-impossible");
noneImpossible.addEventListener('click', (event) => {
    event.stopPropagation();
    allImpossible.checked = !noneImpossible.checked;
    makeAllOrNone("impossible", !noneImpossible.checked);
});

const selectIcons = document.querySelector(".selectIcons");
const generateImage = document.getElementById('generateImage');
const imageInput = document.getElementById('mimage');
const previewImage = document.getElementById('previewImage');
const convertedImage = document.getElementById('convertedImage');
const minecraftImage = document.getElementById('minecraftImage');
const width = document.getElementById('width');
const height = document.getElementById('height');
async function previewSelectedImage() {
    const file = imageInput.files[0];
    if (!file && previous) {
        file = previous;
    }
    if (file) {
        previous = file;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function(e) {
            previewImage.src = e.target.result;
        }
        const bitmap = await createImageBitmap(file);
        console.log(width.value, height.value)
        const canvas = await resizeImage(bitmap, Number(width.value), Number(height.value));
        
        canvas.toBlob(blob => {
            convertedImage.src = URL.createObjectURL(blob);
        }, "image/png");

        const pixels = canvas.getContext("2d").getImageData(0, 0, canvas.width, canvas.height).data;
        console.log(pixels);

        output = Array.from({ length: Number(height.value) }, () => Array(Number(width.value)).fill(0));

        for (let i = 0; i < Number(height.value); i++) {
            const distance = i * Number(width.value);
            for (let j = 0; j < Number(width.value); j++) {
                const offset = (distance + j) * 4;
                const lab = chroma(`rgba(${pixels[offset]}, ${pixels[offset + 1]}, ${pixels[offset + 2]}, ${pixels[offset + 3] / 255})`).lab();
                const [l, a, b] = lab;
                const best = findClosestBlock(l, a, b);
                output[i][j] = best["id"];
            }
        }
        console.log(output);
        console.log(Number(width.value), Number(height.value));
        const minecraftCanvas = await stitchImages(blocks, Number(width.value), Number(height.value), output);
        console.log("Completed!");
        minecraftCanvas.toBlob(blob => {
            minecraftImage.src = URL.createObjectURL(blob);
        }, "image/png");
    }
}
imageInput.addEventListener('change', previewSelectedImage);
generateImage.addEventListener('click', previewSelectedImage);

/* Create the minecraft translated pixel art */
async function stitchImages(blocks, gridW, gridH, blueprint) {
  const TILE_SIZE = 16; // Based on your 16x16 PNGs
  
  // 1. Create the final high-res canvas
  const canvas = document.createElement('canvas');
  canvas.width = gridW * TILE_SIZE;
  canvas.height = gridH * TILE_SIZE;
  const ctx = canvas.getContext('2d');

  // 2. Create an ID-to-Block lookup Map for O(1) speed
  // This avoids searching the blocks array 400 times for every pixel
  const blockLookup = new Map(blocks.map(b => [b.id, b]));

  // 3. Loop through the 2D blueprint
  for (let y = 0; y < gridH; y++) {
    for (let x = 0; x < gridW; x++) {
      const blockId = blueprint[y][x];
      const block = blockLookup.get(blockId);

      if (block && block.img) {
        // Calculate pixel position
        const posX = x * TILE_SIZE;
        const posY = y * TILE_SIZE;

        // Draw the 16x16 tile
        ctx.drawImage(block.img, posX, posY, TILE_SIZE, TILE_SIZE);
      } else {
        console.warn(`Block ID ${blockId} not found or image not loaded.`);
      }
    }
  }

  // 4. Return as a high-quality PNG
  return canvas;
}

/* Fetch minecraft image data */
async function getData(link) {
    const res = await fetch(link);
    return res.json();
}

// Get all data about icons and color codes
const jsonData = await getData("data.json");
console.log(jsonData);
const blocks = jsonData.map(b => ({
    id: b.id,
    type: b.type,
    file: b.file,
    L: b.lab[0],
    a: b.lab[1],
    b: b.lab[2],
    img: null
}));

// Dowload all tiles and set status
const images = await downloadAllTiles(blocks.map(b => (b.file)));
await blocks.forEach(block => {
    block.img = images.get(`../${block.file}`);
    if (!cached) {
        selected[block.id] = { status: true };
    }
});
if (!cached) {
    localStorage.setItem('iconSelections', JSON.stringify(selected));
}

console.log(blocks);
console.log(selected);

/* Switch an icons check status */
function clickedIcon(id, type, checked) {
    console.log(`The ID: ${id} ${checked}`);
    selected[id] = checked;
    console.log(selected[id]);
    localStorage.setItem('iconSelections', JSON.stringify(selected));
    type.forEach(t => {
        checkForAllOrNone(t.replaceAll('-', '_'));
    });
}

// Create all tile icons on the page
blocks.forEach(block => {
    const container = document.createElement('div');
    container.className = 'selectIcon';

    // 2. Create the icon box
    const boxIcon = document.createElement('div');
    boxIcon.id = 'box-icon';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = 'myToggle';
    checkbox.checked = selected[block.id];
    checkbox.addEventListener('change', () => { clickedIcon(block.id, block.type, checkbox.checked); });
    checkboxes[block.id] = checkbox;

    const img = block.img.cloneNode(true);
    img.id = 'selectImages';

    // Assemble the box
    boxIcon.appendChild(checkbox);
    boxIcon.appendChild(img);

    // 3. Create the text label
    const p = document.createElement('p');
    p.id = 'centerText';
    p.textContent = block.id;

    // 4. Final Assembly
    container.appendChild(boxIcon);
    container.appendChild(p);

    block.type.forEach(t => {
        if (t == "wood") {
            wrapper_wood.appendChild(container)
        } else if (t == "ore") {
            wrapper_ore.appendChild(container)
        } else if (t == "wool") {
            wrapper_wool.appendChild(container)
        } else if (t == "complex") {
            wrapper_complex.appendChild(container)
        } else if (t == "expensive") {
            wrapper_expensive.appendChild(container)
        } else if (t == "high_contrast") {
            wrapper_high_contrast.appendChild(container)
        } else if (t == "other") {
            wrapper_other.appendChild(container)
        } else {
            wrapper_impossible.appendChild(container)
        }
    });
});
checkAll();

/* Download all tile icons */
async function downloadAllTiles(urls) {
  const tileCache = new Map();

  const uniqueUrls = [...new Set(urls)];

  const promises = uniqueUrls.map(url => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous"; 
      img.onload = () => {
        tileCache.set(`../${url}`, img);
        resolve();
      };
      img.onerror = () => reject(`Failed to load: ${url}`);
      img.src = `../${url}`;
    });
  });

  await Promise.all(promises);
  return tileCache;
}

/* Calculate color difference */
function labDistanceSq(L1, a1, b1, L2, a2, b2) {
    const dL = L1 - L2;
    const da = a1 - a2;
    const db = b1 - b2;
    return dL*dL + da*da + db*db;
}

/* Loops through every block and returns the minecraft black that is closest to the given pixel */
function findClosestBlock(L, a, b) {
    let best = blocks[0];
    let minDist = Infinity;

    for (const block of blocks) {
        if (selected[block.id]) {
            const d = labDistanceSq(
                L, a, b,
                block.L, block.a, block.b
            );
            if (d < minDist) {
                minDist = d;
                best = block;
            }
        }
    }
    return best;
}

/* Resizes an image to the given target width and height */
async function resizeImage(img, targetWidth, targetHeight) {
    if (
        !Number.isFinite(targetWidth) ||
        !Number.isFinite(targetHeight) ||
        targetWidth <= 0 ||
        targetHeight <= 0
    ) {
        throw new Error("Invalid resize dimensions");
    }
  
    const srcCanvas = document.createElement("canvas");
    console.log(img.width, img.height);
    srcCanvas.width = img.width;
    srcCanvas.height = img.height;
    srcCanvas.getContext("2d").drawImage(img, 0, 0);

    const dstCanvas = document.createElement("canvas");
    dstCanvas.width = targetWidth;
    dstCanvas.height = targetHeight;
    await pica.resize(srcCanvas, dstCanvas, {
        unsharpAmount: 100,
        unsharpRadius: 0.5,
        unsharpThreshold: 0
    });
    return dstCanvas;
}

function checkAll() {
    checkForAllOrNone("wood");
    checkForAllOrNone("ore");
    checkForAllOrNone("wool");
    checkForAllOrNone("complex");
    checkForAllOrNone("expensive");
    checkForAllOrNone("high_contrast");
    checkForAllOrNone("other");
    checkForAllOrNone("impossible");
}

/* Check if all checkboxes are checked or not */
function checkForAllOrNone(type) {
    let all = true;
    let none = true;
    blocks.forEach(block => {
        if (!all && !none) {
            const theCheckbox = document.getElementById(`all-check-${type.replaceAll('_', '-')}`);
            theCheckbox.checked = false;
            const theCheckbox2 = document.getElementById(`none-check-${type.replaceAll('_', '-')}`);
            theCheckbox2.checked = false;
            return;
        }
        if (block.type.includes(type)) {
            if (selected[block.id]) {
                none = false;
            } else {
                all = false;
            }
        }
    });

    if (all) {
        const theCheckbox = document.getElementById(`all-check-${type.replaceAll('_', '-')}`);
        theCheckbox.checked = true;
        const theCheckbox2 = document.getElementById(`none-check-${type.replaceAll('_', '-')}`);
        theCheckbox2.checked = false;
    } else if (none) {
        const theCheckbox = document.getElementById(`all-check-${type.replaceAll('_', '-')}`);
        theCheckbox.checked = false;
        const theCheckbox2 = document.getElementById(`none-check-${type.replaceAll('_', '-')}`);
        theCheckbox2.checked = true;
    }
}

/* Checks or unchecks all checkboxes of type type */
function makeAllOrNone(type, checked) {
    let ids = [];
    blocks.forEach(block => {
        if (block.type.includes(type)) {
            ids.push(block.id);
        }
    });
    console.log(ids);
    ids.forEach(id => {
        selected[id] = checked;
        checkboxes[id].checked = checked;
    });
    localStorage.setItem('iconSelections', JSON.stringify(selected));
}

const saveButton = document.getElementById("save-button");
saveButton.addEventListener('click', savePreset);
const loadButton = document.getElementById("load-button");
loadButton.addEventListener('click', loadPreset);
const saveInput = document.getElementById("save-input");
const saveSelect = document.getElementById("save-select");

let save = localStorage.getItem(`save`);
if (save) {
    save = JSON.parse(save); 
    save.forEach(s => {
        const newOption = document.createElement('option');
        newOption.text = s;
        newOption.value = s;
        saveSelect.add(newOption);
    });
} else {
    save = []
    localStorage.setItem('save', JSON.stringify(save));
}

function savePreset() {
    if (saveInput.value == "" && saveSelect.value != "") {
        localStorage.setItem(`save:${saveSelect.value}`, JSON.stringify(selected));
    } else if (saveInput.value != "") {
        console.log("New Save");
        localStorage.setItem(`save:${saveInput.value}`, JSON.stringify(selected));
        save.push(saveInput.value);
        localStorage.setItem(`save`, JSON.stringify(save));
        const newOption = document.createElement('option');
        newOption.text = saveInput.value;
        newOption.value = saveInput.value;
        saveSelect.add(newOption);
        saveSelect.value = saveInput.value;
        saveInput.value = "";
    }
}

function loadPreset() {
    saveInput.value = "";
    if (saveSelect.value != "") {
        let data = localStorage.getItem(`save:${saveSelect.value}`);
        if (data) {
            data = JSON.parse(data);
            selected = data;
            localStorage.setItem('iconSelections', JSON.stringify(selected));
            validateCheckboxes();
            checkAll();
        }
    }
}

function validateCheckboxes() {
    blocks.forEach(block => {
        checkboxes[block.id].checked = selected[block.id];
    });
}
