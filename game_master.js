let config;
let clefImg, currentNote, noteY;
let gameStarted = false, gameOver = false;
let startTime, score = 0, mistakes = 0;

function preload() { if (config) clefImg = loadImage(config.clefImg); }

function setup() {
  createCanvas(800, 600);
}

function draw() {
  if (!config) return;
  background(230);

  if (!gameStarted) {
    textAlign(CENTER, CENTER); textSize(32); fill(0);
    text("クリックでスタート", width/2, height/2);
    return;
  }

  // 時間計算
  let elapsed = int((millis() - startTime) / 1000);
  let remaining = max(0, config.timeLimit - elapsed);
  if (remaining <= 0) gameOver = true;

  if (gameOver) {
    textAlign(CENTER, CENTER); textSize(36); fill(0);
    text("終了！ 正解: " + score + " ミス: " + mistakes, width/2, height/2);
    return;
  }

  // 描画処理
  drawStaff(); drawNote(); drawKeyboard();
  
  // スコア表示
  fill(0); textSize(24); textAlign(LEFT);
  text("Time: " + remaining, 50, 50);
  text("正解数: " + score, 250, 50);
  text("ミス数: " + mistakes, 450, 50);
}

// 以下、共通の描画関数
function drawStaff() {
  stroke(0);
  for (let i = 0; i < 5; i++) { line(width*0.12, config.startY - i*20, width*0.88, config.startY - i*20); }
  image(clefImg, config.clefX, config.clefY, config.clefW, config.clefH);
}

function drawNote() {
  noFill(); stroke(0); strokeWeight(2);
  ellipse(300, noteY, 26, 18);
}

function drawKeyboard() {
  for (let k of config.keys) { fill(255); stroke(0); rect(k.x, 450, k.w, 120); }
  for (let b of config.blackKeys) { fill(0); noStroke(); rect(b.x, 450, b.w, 80); }
}

function newQuestion() {
  let current = random(config.noteData);
  currentNote = current.name;
  noteY = current.y;
}

// 操作系（マウスとタッチ対応）
function mousePressed() { handleInteraction(); }
function touchStarted() { handleInteraction(); return false; }

function handleInteraction() {
  if (getAudioContext().state !== 'running') getAudioContext().resume();
  
  if (!gameStarted) { gameStarted = true; startTime = millis(); newQuestion(); return; }
  if (gameOver) { score = 0; mistakes = 0; gameOver = false; startTime = millis(); newQuestion(); return; }

  // 判定ロジック
  let answer = "";
  for (let b of config.blackKeys) if (mouseX > b.x && mouseX < b.x+b.w && mouseY > 450 && mouseY < 530) answer = b.note;
  for (let k of config.keys) if (mouseX > k.x && mouseX < k.x+k.w && mouseY > 450 && mouseY < 570) answer = k.note;

  if (answer !== "") {
    if (answer === currentNote) score++; else mistakes++;
    newQuestion();
  }
}
