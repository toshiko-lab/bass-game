let config; 
let synth, clefImg;
let currentNote, noteY;
let gameStarted = false; // ★ここが重要です！

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
// --- マウス（PC）用の操作 ---
function mousePressed() {
  handleInteraction();
}

// --- タッチ（スマホ・iPad）用の操作 ---
function touchStarted() {
  handleInteraction();
  return false; // 画面のズームやスクロールを防ぐため
}

// --- 共通の操作ロジック ---
function handleInteraction() {
  // 1. まず音を有効にする
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
  }

  // 2. まだスタートしていなければ開始する
  if (gameStarted === false) {
    gameStarted = true;
    console.log("ゲームを開始しました");
    return;
  }

  // 3. 鍵盤をタッチした時の処理
  for (let k of config.keys) {
    if (mouseX > k.x && mouseX < k.x + k.w && mouseY > k.y && mouseY < k.y + k.h) {
      console.log("タッチした音: " + k.note);
      // ここに音を鳴らす関数などを追加してください
      return;
    }
  }
}

// 念のため、マウス用とタッチ用の両方に割り当て
function mousePressed() {
  handleInteraction();
}

function touchStarted() {
  handleInteraction();
  return false; 
}
