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
fill(255);

rect(40, 520, 50, 120);   // ファ
rect(90, 520, 50, 120);   // ソ
rect(140, 520, 50, 120);  // ラ
rect(190, 520, 50, 120);  // シ

rect(240, 520, 50, 120);  // ド
rect(290, 520, 50, 120);  // レ
rect(340, 520, 50, 120);  // ミ

rect(390, 520, 50, 120);  // ファ
rect(440, 520, 50, 120);  // ソ
rect(490, 520, 50, 120);  // ラ
rect(540, 520, 50, 120);  // シ


// 黒鍵
fill(0);

// ファソ
rect(75, 520, 30, 80);

// ソラ
rect(125, 520, 30, 80);

// ラシ
rect(175, 520, 30, 80);

// ドレ
rect(275, 520, 30, 80);

// レミ
rect(325, 520, 30, 80);

// ファソ
rect(425, 520, 30, 80);

// ソラ
rect(475, 520, 30, 80);

// ラシ
rect(525, 520, 30, 80);
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
