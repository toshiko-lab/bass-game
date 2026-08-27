let startY = 250;
let gap = 20;
let currentNote;
let clefImg;
let noteY;
let activeKey = null;
let startTime;
let timeLimit = 60;
let started = false;
let gameOver = false;
let correctCount = 0;
let missCount = 0;
let resultText = "";
let keyWidth = 50;
let keyboardOffset = 0;
let keyboardDragging = false;
let keyboardMoved = false;
let dragStartX = 0;
let offsetStart = 0;
let osc;
// ===== レベル設定 =====
const GAME = {
  title: "Treble Clef ⑤ G2-G3",
  clefImage: "treble.png",
  firstNote: "G2",
  lastNote: "G3"
};
// ===========================
// 共通音データ
// ===========================
let allNotes = [
  { name: "G2", freq: 98, y: startY + gap * 6.375 },
  { name: "A2", freq: 110, y: startY + gap * 6 },
  { name: "B2", freq: 123, y: startY + gap * 5.5 },
  { name: "C3", freq: 131, y: startY + gap * 5 },
  { name: "D3", freq: 147, y: startY + gap * 4.5 },
  { name: "E3", freq: 165, y: startY + gap * 4 },
  { name: "F3", freq: 175, y: startY + gap * 3.5 },
  { name: "G3", freq: 196, y: startY + gap * 3 }
];
// ===========================
// 共通関数
// ===========================
function getFreq(note) {

  const keyboardFreq = {
    C2: 130.81,
    D2: 146.83,
    E2: 164.81,
    F2: 174.61,
    G2: 196.00,
    A2: 220.00,
    B2: 246.94,

    C3: 261.63,
    D3: 293.66,
    E3: 329.63,
    F3: 349.23,
    G3: 392.00,
    A3: 440.00,
    B3: 493.88,

    C4: 523.25
  };

  return keyboardFreq[note] || 523.25;
}

function getNoteIndex(name) {
  return allNotes.findIndex(note => note.name === name);
}
let noteData = allNotes;
// ===========================
// 共通鍵盤
// ===========================
let keyboardLayout = [
  "C","D","E","F","G","A","B",
  "C","D","E","F","G","A","B",
  "C"
];
let keys = [];

function createKeys(firstOctave) {

  keys = [];

  for (let i = 0; i < keyboardLayout.length; i++) {

    let octave = firstOctave;

    if (i >= 7) octave = firstOctave + 1;
    if (i == 14) octave = firstOctave + 2;
    keys.push
    ({
 　　 label: keyboardLayout[i],
 　　 name: keyboardLayout[i] + octave,
　　  x: 50 + i * keyWidth,
 　　 y: 520,
 　　 w: keyWidth,
 　　 h: 120
　　});
  }
}

// ===========================
// 共通処理
// ===========================

function preload() {
  clefImg = loadImage(GAME.clefImage);
}

function setup() {
  createCanvas(600, 760);

  osc = new p5.Oscillator();
  osc.start();
  osc.amp(0);
  osc.setType('triangle');

 createKeys(2);   // ←追加

  newQuestion();
}

function draw() {
  background(200);
  textAlign(CENTER);
  textSize(30);
  fill(0);
  text(GAME.title, width / 2, 40);

  stroke(120);
  line(60, 60, 540, 60);
  let centerX = 250 + keyWidth / 2;
  let whiteY = 520;
  let blackY = 520;

  let elapsed = started ? int((millis() - startTime) / 1000) : 0;
  let remaining = started ? max(0, timeLimit - elapsed) : timeLimit;

  // ⭐ここ追加（これが重要）
  if (remaining <= 0) {
    gameOver = true;
  }

  // スコア
  textAlign(LEFT); // ←ここに入れる！
  {
    textSize(22);
  fill(0);

  textAlign(LEFT);
  text("Correct: " + correctCount, 40, 120);

  textAlign(CENTER);
  text("Miss: " + missCount, 300, 120);

  textAlign(RIGHT);
  text("Time: " + remaining, width - 40, 120);
  }

  // 五線
  image(clefImg, 40, startY - 45, 65, 160);
  drawStaff();
  drawNote();

  drawKeyboard();

  // 結果
  textSize(30);
  fill(0);
  textAlign(CENTER);
  textSize(42);

  if (resultText === "YES!") {
    fill(0, 150, 0);
  } else {
    fill(200, 0, 0);
  }

  text(resultText, width / 2, 180);

  textAlign(CENTER);

  // ⭐スタート前
  if (!started) {
    textSize(30);
    text("Click to Start", centerX, 560);
}
  if (gameOver) {
    textAlign(CENTER);

    textSize(40);
    fill(255, 0, 0);
    text("終了！", centerX, 500);

    textSize(30);
    fill(0);
    textSize(28);
    text("クリックでスタート", centerX, 430);
  
   return;
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

  // C3（ド）：下第1線
  if (currentNote === "C3") {
    line(185, startY + gap * 5, 215, startY + gap * 5);
  }

  // B2（シ）：下第1線
  if (currentNote === "B2") {
    line(185, startY + gap * 5, 215, startY + gap * 5);
  }

  // A2（ラ）：下第1線＋下第2線
if (currentNote === "A2") {
  line(185, startY + gap * 5, 215, startY + gap * 5);
  line(185, startY + gap * 6, 215, startY + gap * 6);
}

  // G2（ソ）：下第1線＋下第2線
  if (currentNote === "G2") {
    line(185, startY + gap * 5, 215, startY + gap * 5);
    line(185, startY + gap * 6, 215, startY + gap * 6);
  }

  // 全音符（透過）
  ellipse(200, noteY, 20, 15);
}

function drawKeyboard() {

  const whiteY = 520;
  const blackY = 520;

  // 白鍵
  for (let k of keys) {
    fill(255);
    stroke(0);
    rect(
      k.x + keyboardOffset,
      whiteY,
      k.w,
      k.h
    );
  }

  // 黒鍵の位置
  const blackIndex = [0, 1, 3, 4, 5, 7, 8, 10, 11, 12];

  for (let i of blackIndex) {

    let x = keys[i].x + keyWidth - keyWidth * 0.3 + keyboardOffset;

    fill(0);
    rect(
      x,
      blackY,
      keyWidth * 0.6,
      80
    );
  }
}

function newQuestion() {

  let first = getNoteIndex(GAME.firstNote);
  let last  = getNoteIndex(GAME.lastNote);

  let index = floor(random(first, last + 1));
  let current = allNotes[index];

  currentNote = current.name;
  noteY = current.y;
  activeKey = null;
}
function mousePressed() {

  userStartAudio();

  // ゲーム終了後
  if (gameOver) {
    gameOver = false;
    started = true;
    startTime = millis();
    correctCount = 0;
    missCount = 0;
    resultText = "";
    newQuestion();
    return;
  }

  // 最初のスタート
  if (!started) {
    started = true;
    startTime = millis();
    correctCount = 0;
    missCount = 0;
    resultText = "";
    return;
  }

  // 鍵盤の上を押したか確認
  if (
    mouseY >= 520 &&
    mouseY <= 640
  ) {
    keyboardDragging = true;
    keyboardMoved = false;
    dragStartX = mouseX;
    offsetStart = keyboardOffset;
    return;
  }
}
function mouseDragged() {

  if (!keyboardDragging) return;

  let dx = mouseX - dragStartX;

  if (abs(dx) > 5) {
    keyboardMoved = true;
  }

  keyboardOffset = offsetStart + dx;

  // 左右の動きすぎを防ぐ
  let minOffset = width - (50 + 15 * keyWidth);
  let maxOffset = 0;

  keyboardOffset = constrain(
    keyboardOffset,
    minOffset,
    maxOffset
  );
}
function mouseReleased() {

  if (!keyboardDragging) return;

  // 動かしていなければ「鍵盤を押した」と判断
  if (!keyboardMoved) {

    for (let k of keys) {

      if (
        mouseX > k.x + keyboardOffset &&
        mouseX < k.x + keyboardOffset + k.w &&
        mouseY > k.y &&
        mouseY < k.y + k.h
      ) {

        // 音
        let freq = getFreq(k.name);

        console.log("押した鍵盤:", k.name);
        console.log("鳴らす周波数:", freq);

        osc.freq(freq);
        osc.amp(0.5, 0.05);
        osc.amp(0, 0.3);

        // 正解判定

        if (k.name === currentNote) {

        resultText = "YES!";
        correctCount++;

      } else {

        resultText = "NO!";
        missCount++;

      }

        newQuestion();

        break;
      }
    }
  }

  keyboardDragging = false;
  keyboardMoved = false;
}