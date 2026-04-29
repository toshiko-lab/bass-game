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

let notes = ["G","A","B","C","D","E","F","G_high"];

let keys = [
  {note: "G", x: 100, w: 70},
  {note: "A", x: 170, w: 70},
  {note: "B", x: 240, w: 70},
  {note: "C", x: 310, w: 70},
  {note: "D", x: 380, w: 70},
  {note: "E", x: 450, w: 70},
  {note: "F", x: 520, w: 70},
  {note: "G_high", x: 590, w: 70}
];
let noteFreq = {
  "G": 196,
  "A": 220,
  "B": 247,
  "C": 262,
  "D": 294,
  "E": 330,
  "F": 349,
  "G_high": 392
};

function preload() {
  clefImg = loadImage("bass.png");
}
let blackKeys = [
  {note: "F#", x: 100 - 9, w: 20},   // 下ソの左（半分）
  {note: "G#", x: 100 + 70 - 20, w: 40},
  {note: "A#", x: 170 + 70 - 20, w: 40},
  {note: "C#", x: 310 + 70 - 20, w: 40},
  {note: "D#", x: 380 + 70 - 20, w: 40},
  {note: "F#_high", x: 590 + 70 - 11 , w: 20} // 上ソの右（半分）
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
  text("Time: " + remaining, 50, 50);

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

  image(clefImg, 50, baseY - 115, 80, 135);
}

function drawNote() {

  let noteYMap = {
    "G": baseY + 0,
    "A": baseY - 10,
    "B": baseY - 20,
    "C": baseY - 30,
    "D": baseY - 40,
    "E": baseY - 50,
    "F": baseY - 60,
    "G_high": baseY - 70
  };

  let y = noteYMap[question];
  if (y === undefined) return;
   noFill();     // ←中を白に
   stroke(0);    // ←枠だけ黒
   strokeWeight(2);
   ellipse(300, y, 26, 18);
  }

function newQuestion() {
  let i = floor(random(notes.length));
  question = notes[i];
}

function mousePressed() {
  userStartAudio();  // ←これ必須（iPad対策）

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

  // 黒鍵（先に！）
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

// 音は鍵盤だけ
if (answer !== "" && noteFreq[answer] !== undefined) {
  osc.freq(noteFreq[answer]);
  osc.amp(0.5, 0.05);
  osc.amp(0, 0.2);
}

newQuestion();
}