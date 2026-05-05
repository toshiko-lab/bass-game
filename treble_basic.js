let startY = 130;
let gap = 20;
let currentNote;
let clefImg;
let noteY;

let startTime;
let timeLimit = 60;
let started = false;
let gameOver = false;

let correctCount = 0;
let missCount = 0;
let resultText = "";

let keyWidth = 50;
let osc;

// 音データ
function getFreq(note) {
  if (note === "C_low") return 261;
  if (note === "D_low") return 294;
  if (note === "E") return 329;
  if (note === "F") return 349;
  if (note === "G") return 392;
  if (note === "A") return 440;
  if (note === "B") return 493;
  if (note === "C") return 523;
}

let noteData = [
  {name: "C_low", y: startY + gap * 5},
  {name: "D_low", y: startY + gap * 4.4},
  {name: "E", y: startY + gap * 4},
  {name: "F", y: startY + gap * 3.5},
  {name: "G", y: startY + gap * 3},
  {name: "A", y: startY + gap * 2.5},
  {name: "B", y: startY + gap * 2},
  {name: "C", y: startY + gap * 1.5}
];

let keys = [
  { name: "C_low", x: 100, y: 440, w: keyWidth, h: 120 },
  { name: "D_low", x: 150, y: 440, w: keyWidth, h: 120 },
  { name: "E", x: 200, y: 440, w: keyWidth, h: 120 },
  { name: "F", x: 250, y: 440, w: keyWidth, h: 120 },
  { name: "G", x: 300, y: 440, w: keyWidth, h: 120 },
  { name: "A", x: 350, y: 440, w: keyWidth, h: 120 },
  { name: "B", x: 400, y: 440, w: keyWidth, h: 120 },
  { name: "C", x: 450, y: 440, w: keyWidth, h: 120 }
];

function preload() {
  clefImg = loadImage("treble.png");
}

function setup() {
  createCanvas(600, 600);

  osc = new p5.Oscillator();
  osc.start();
  osc.amp(0);

  newQuestion();
}

function draw() {
  background(200);
   // 👇 ここに追加
  let centerX = 250 + keyWidth / 2; 
  let whiteY = 440;
  let blackY = 440;
  let elapsed = started ? int((millis() - startTime) / 1000) : 0;
  let remaining = started ? max(0, timeLimit - elapsed) : timeLimit;

  // Time
  textSize(20);
  fill(0);
  text("Time: " + remaining, 450, 50);

  // スコア
  text("せいかい: " + correctCount, 50, 50);
  text("ミス: " + missCount, 50, 80);

  // 五線
  image(clefImg, 40, startY - 45, 65, 160);
  drawNote();
  drawStaff();

  // 鍵盤
  for (let k of keys) {
  fill(255);
  stroke(0);
  rect(k.x, whiteY, keyWidth, 120);
  }
  // 黒鍵（共通）
let blackPositions = [0.75, 1.75, 3.75, 4.75, 5.75];

for (let o of blackPositions) {
  fill(0);
  rect(
    keys[0].x + o * keyWidth - (keyWidth * 0.09),
    blackY,
    keyWidth * 0.6,
    80
  );
}

// 右端
rect(
  keys[0].x + 7.8 * keyWidth - (keyWidth * 0.09),
  blackY,
  keyWidth * 0.6,
  80
);
  // 結果
  textSize(30);
  text(resultText, 220, 120);

  // スタート前
  if (!started) {
    textSize(30);
    text("クリックでスタート", 170, 420);
    textSize(40);
    fill(255, 0, 0);
    text("終了！", 220, 380);
  }

  // 終了
  if (remaining === 0) {
    gameOver = true;

    let centerX = 250 + keyWidth / 2; // ファの中心

    textAlign(CENTER);

    textSize(40);
    fill(255, 0, 0);
    text("終了！", centerX, 380);

    textSize(25);
    fill(0);
    text("クリックでスタート", centerX, 420);

    noStroke();
    textSize(14);
    text("2026 松井音楽教室教材", centerX, 595);
  }
}

function mousePressed() {
  userStartAudio();

  if (!started) {
    started = true;
    startTime = millis();
    correctCount = 0;
    missCount = 0;
    resultText = "";
    return;
  }

  for (let k of keys) {
    if (
      mouseX > k.x &&
      mouseX < k.x + k.w &&
      mouseY > k.y &&
      mouseY < k.y + k.h
    ) {

      // 音
      let freq = getFreq(k.name);
      osc.freq(freq);
      osc.amp(0.5, 0.05);
      osc.amp(0, 0.2);

      // 判定
      if (k.name === currentNote) {
        resultText = "せいかい！";
        correctCount++;
      } else {
        resultText = "ちがう！";
        missCount++;
      }

      setTimeout(newQuestion, 500);
    }
  }
}

function drawStaff() {
  stroke(0);
  for (let i = 0; i < 5; i++) {
    line(50, startY + i * gap, 550, startY + i * gap);
  }
}

function drawNote() {
  noFill();
  stroke(0);
  strokeWeight(2);
  ellipse(200, noteY, 20, 15);

  if (currentNote === "C_low") {
    line(185, noteY, 215, noteY);
  }
}

function newQuestion() {
  let current = random(noteData);
  currentNote = current.name;
  noteY = current.y;
}