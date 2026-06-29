let config; 
let synth, clefImg;
let currentNote, noteY;
let gameStarted = false; 

function preload() {
  if (config) clefImg = loadImage(config.clefImg);
}

function setup() {
  createCanvas(600, 760);
  // newQuestion(); // スタートボタンを押してから呼ぶためにここでは呼ばない
}

function draw() {
  if (!config) return;
  background(255);

  // ★ここを追加：ゲーム開始前なら「クリックでスタート」を表示する
  if (!gameStarted) {
    textAlign(CENTER, CENTER);
    textSize(40);
    fill(0);
    text("クリックでスタート", width/2, height/2);
    return; // ここで描画を止めるので、楽譜などはまだ出ない
  }

  // 以下はゲーム中の描画
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
  fill(255); stroke(0);
  for (let k of config.keys) rect(k.x, k.y, k.w, k.h);
  fill(0); noStroke();
  for (let b of config.blackKeys) rect(b.x, b.y, b.w, b.h);
}

function newQuestion() {
  let current = random(config.noteData);
  currentNote = current.name;
  noteY = current.y;
}

// --- 操作系（重複を削除し、簡潔にまとめました） ---
function mousePressed() {
  handleInteraction();
}

function touchStarted() {
  handleInteraction();
  return false; 
}

function handleInteraction() {
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
  }

  if (!gameStarted) {
    gameStarted = true;
    newQuestion(); // ★ここで初めて問題を出す
    return;
  }

  // 鍵盤判定
  for (let k of config.keys) {
    if (mouseX > k.x && mouseX < k.x + k.w && mouseY > k.y && mouseY < k.y + k.h) {
      console.log("タッチした音: " + k.note);
      // ここに音を鳴らす処理を後で追加しましょう
      return;
    }
  }
}
