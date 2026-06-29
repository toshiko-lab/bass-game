let config; // 設定データを受け取る箱
let clefImg, currentNote, noteY;

function preload() {
  if (config) clefImg = loadImage(config.clefImg);
}

function setup() {
  createCanvas(600, 760);
  newQuestion();
}

function draw() {
  if (!config) return;
  background(255);
  textAlign(CENTER); textSize(30); fill(0);
  text(config.title, width / 2, 55);

  image(clefImg, config.clefX, config.clefY, config.clefW, config.clefH);
  drawStaff();
  drawNote();
  drawKeyboard();
}

function drawStaff() {
  stroke(0);
  for (let i = 0; i < 5; i++) {
    line(50, config.startY + i * config.gap, 550, config.startY + i * config.gap);
  }
}

function drawNote() {
  noFill(); stroke(0); strokeWeight(2);
  ellipse(200, noteY, 24, 18);
}

function drawKeyboard() {
  // 白鍵
  fill(255); stroke(0);
  for (let k of config.keys) {
    rect(k.x, k.y, k.w, k.h);
  }
  // 黒鍵
  fill(0); noStroke();
  for (let b of config.blackKeys) {
    rect(b.x, b.y, b.w, b.h);
  }
}

function newQuestion() {
  let current = random(config.noteData);
  currentNote = current.name;
  noteY = current.y;
}
