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

if (Math.random() < .5) {
    console.log("White");
    const you = 0;
} else {
    console.log("Black");
    const you = 1;
}
