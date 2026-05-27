let startY = 250;
let gap = 20;

let clefImg;

let currentNote;
let noteY;

let keyWidth = 50;

let noteData = [
  {name: "G", y: startY + gap * 3.5},
  {name: "A", y: startY + gap * 3},
  {name: "B", y: startY + gap * 2.5},
  {name: "C", y: startY + gap * 2},
  {name: "D", y: startY + gap * 1.5},
  {name: "E", y: startY + gap},
  {name: "F", y: startY + gap * 0.5},
  {name: "G_high", y: startY}
];

let keys = [
  { name: "F_low", x: 30,  y: 520, w: 50, h: 120 },
  { name: "G",     x: 80,  y: 520, w: 50, h: 120 },
  { name: "A",     x: 130, y: 520, w: 50, h: 120 },
  { name: "B",     x: 180, y: 520, w: 50, h: 120 },
  { name: "C",     x: 230, y: 520, w: 50, h: 120 },
  { name: "D",     x: 280, y: 520, w: 50, h: 120 },
  { name: "E",     x: 330, y: 520, w: 50, h: 120 },
  { name: "F",     x: 380, y: 520, w: 50, h: 120 },
  { name: "G_high",x: 430, y: 520, w: 50, h: 120 },
  { name: "A_high",x: 480, y: 520, w: 50, h: 120 }
];
function preload() {
  clefImg = loadImage("treble.png");
}

function setup() {
  createCanvas(600, 760);
  newQuestion();
}

function draw() {
  background(255);

  textAlign(CENTER);
  textSize(30);
  fill(0);

  text("ト音記号 ト～1点ト", width / 2, 55);

  image(clefImg, 20, 210, 55, 110);

  drawStaff();
  drawNote();

  // 白鍵
  for (let k of keys) {
    fill(255);
    stroke(0);
    rect(k.x, k.y, k.w, k.h);
  }

// 黒鍵
fill(0);

rect(65, 520, 20, 70);   // ファ# 
rect(115, 520, 20, 70);  // ソ#

rect(265, 520, 20, 70);  // ド#
rect(315, 520, 20, 70);  // レ#

rect(415, 520, 20, 70);  // ファ#
rect(465, 520, 20, 70);  // ソ#
}  
function drawStaff() {
  stroke(0);

  for (let i = 0; i < 5; i++) {
    line(50, startY + i * gap, 550, startY + i * gap);
  }
}

function drawNote() {
  fill(255);
  stroke(0);
  strokeWeight(2);

  ellipse(200, noteY, 20, 15);
}
function newQuestion() {
  let current = random(noteData);
  currentNote = current.name;
  noteY = current.y;
}
