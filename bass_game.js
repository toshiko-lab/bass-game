let baseY = 300;
let question = "G";
let result = "";
let startTime;
let timeLimit = 60;
let gameOver = false;
let gameStarted = false;
let score = 0;
let mistakes = 0;
let osc;
let clefImg;

let notes = [
  "E_low",
  "F",
  "G",
  "A",
  "B",
  "C",
  "D",
  "E_high"
];

let keys = [
  {note: "E_low", x: 140, w: 70},
  {note: "F", x: 210, w: 70},
  {note: "G", x: 280, w: 70},
  {note: "A", x: 350, w: 70},
  {note: "B", x: 420, w: 70},
  {note: "C", x: 490, w: 70},
  {note: "D", x: 560, w: 70},
  {note: "E_high", x: 630, w: 70}
];

let noteFreq = {
  "E_low": 165,
  "F": 175,
  "G": 196,
  "A": 220,
  "B": 247,
  "C": 262,
  "D": 294,
  "E_high": 330
};

function preload() {
  clefImg = loadImage("bass.png");
}
let blackKeys = [
  {note: "D#", x: 122.5, w: 35},

  {note: "F#", x: 262.5, w: 35},
  {note: "G#", x: 332.5, w: 35},
  {note: "A#", x: 402.5, w: 35},

  {note: "C#", x: 542.5, w: 35},
  {note: "D#", x: 612.5, w: 35}
];
function setup() {
  createCanvas(800, 600);

  osc = new p5.Oscillator();  // ←追加
  osc.start();                // ←追加
  osc.amp(0);                 // ←音を最初は0に

  newQuestion();
  startTime = millis();
}

function draw() {
  background(230);

  if (!gameStarted) {
    background(230);
    textAlign(CENTER, CENTER);
    textSize(32);
    fill(0);
    text("クリックでスタート", width/2, height/2);
    return;
  }

  drawStaff();
  drawNote();

  // 鍵盤
  for (let k of keys) {
    fill(255);
    stroke(0);
    rect(k.x, 450, k.w, 120);
   
  }

  // 黒鍵
  for (let b of blackKeys) {
    fill(0);
    noStroke();
    rect(b.x, 450, b.w, 80);
  }

  // 結果表示
  fill(0);
  textSize(32);
  textAlign(CENTER);
  text(result, 400, 100);

  // --- 時間表示 ---
  let elapsed = int((millis() - startTime) / 1000);
  let remaining = max(0, timeLimit - elapsed);

  fill(0);
  textSize(24);
  textAlign(LEFT);

  text("Time: " + remaining, 20, 40);
  text("せいかい: " + score, 180, 40);
  text("ミス: " + mistakes, 180, 70);

  if (remaining <= 0) {
    gameOver = true;
  }

  // ✅ ここに入れる
  if (gameOver) {
    textAlign(CENTER, CENTER);
    fill(0);

  // ★ 五線より上に固定
    let topY = baseY - 140;

    textSize(28);
    text("正解数: " + score, width/2 - 120, topY);
    text("ミス数: " + mistakes, width/2 + 120, topY);

    // ★ 中央（元スタート位置）
    textSize(36);
    text("終了！", width/2, height/2 + 60);

    // ★ 下にずらす（五線回避）
    textSize(24);
    text("クリックでリスタート", width/2, height/2 + 100);

    // コピーライト
    textSize(14);
    text("© 2026 松井音楽教室教材", width/2, height - 20);

    return;
  }
}
function resetGame() {
  score = 0;
  mistakes = 0;   // ←忘れやすい
  gameOver = false;
  result = "";
  startTime = millis();
  newQuestion();
}
function drawStaff() {
  stroke(0);

  for (let i = 0; i < 5; i++) {
    line(100, baseY - i * 20, 700, baseY - i * 20);
  }

  image(clefImg, 15, baseY - 108, 115, 115);
}

function drawNote() {

  let noteYMap = {
    "E_low": baseY - 50,   // 第3間
    "F": baseY - 60,       // 第4線
    "G": baseY - 70,       // 第4間
    "A": baseY - 80,       // 第5線
    "B": baseY - 90,       // 上第1間
    "C": baseY - 100,      // 上第1線
    "D": baseY - 110,      // 上第2間
    "E_high": baseY - 120  // 上第2線
  };

  let y = noteYMap[question];

  if (y === undefined) {
    return;
  }

  noFill();
  stroke(0);
  strokeWeight(2);

  ellipse(300, y, 26, 18);
 // 上第1線の加線
 if (
   question === "C" ||
   question === "D" ||
   question === "E_high"
 ) {
   line(285, baseY - 100, 315, baseY - 100);
 }

 // 上第2線の加線
 if (question === "E_high") {
   line(285, baseY - 120, 315, baseY - 120);
 }
}

function newQuestion() {
  let i = floor(random(notes.length));
  question = notes[i];
}
function touchStarted() {
  mousePressed();
  return false;
}

function mousePressed() {
  userStartAudio();
  getAudioContext().resume();

  if (!gameStarted) {
    resetGame();
    gameStarted = true;
    return;
  }

  if (gameOver) {
    gameStarted = false;
    return;
  }

  let answer = "";

  // 黒鍵
  for (let b of blackKeys) {
    if (
      mouseX > b.x &&
      mouseX < b.x + b.w &&
      mouseY > 450 &&
      mouseY < 530
    ) {
      answer = b.note;
    }
  }

  // 白鍵
  for (let k of keys) {
    if (
      mouseX > k.x &&
      mouseX < k.x + k.w &&
      mouseY > 450 &&
      mouseY < 570
    ) {
      answer = k.note;
    }
  }

  if (answer === question) {
    result = "せいかい";
    score++;
  } else {
    result = "ちがう";
    mistakes++;
  }

  // 音
  if (answer !== "" && noteFreq[answer] !== undefined) {
    osc.freq(noteFreq[answer]);
    osc.amp(0.5, 0.05);
    osc.amp(0, 0.2);
  }

  newQuestion();
}
