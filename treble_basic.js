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
let osc;

// 音データ
function getFreq(note) {
  if (note === "C") return 523;
  if (note === "D") return 587;
  if (note === "E") return 659;
  if (note === "F") return 698;
  if (note === "G") return 784;
  if (note === "A") return 880;
  if (note === "B") return 987;
  if (note === "HighC") return 1046;

  return 523;
}

let noteData = [
  {name: "C", y: startY + gap * 1.5}, // 第3間
  {name: "D", y: startY + gap},       // 第4線
  {name: "E", y: startY + gap * 0.5}, // 第4間
  {name: "F", y: startY},             // 第5線
  {name: "G", y: startY - gap * 0.5}, // 第5間
  {name: "A", y: startY - gap},       // 上第1線
  {name: "B", y: startY - gap * 1.5}, // 上第1間
  {name: "HighC", y: startY - gap * 2} // 上第2線
]

let keys = [
  { name: "C", x: 100, y: 520, w: keyWidth, h: 120 },
  { name: "D", x: 150, y: 520, w: keyWidth, h: 120 },
  { name: "E", x: 200, y: 520, w: keyWidth, h: 120 },
  { name: "F", x: 250, y: 520, w: keyWidth, h: 120 },
  { name: "G", x: 300, y: 520, w: keyWidth, h: 120 },
  { name: "A", x: 350, y: 520, w: keyWidth, h: 120 },
  { name: "B", x: 400, y: 520, w: keyWidth, h: 120 },
  { name: "HighC", x: 450, y: 520, w: keyWidth, h: 120 }
];;
function preload() {
  clefImg = loadImage("treble.png");
}

function setup() {
  createCanvas(600, 760);

  osc = new p5.Oscillator();
  osc.start();
  osc.amp(0);
  osc.setType('triangle');
  newQuestion();
}

function draw() {
  background(200);
  textAlign(CENTER);
  textSize(30);
  fill(0);
  text("ト音記号② 2点ハ～3点ハ", width / 2, 55);

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
  text("せいかい: " + correctCount, 40, 120);

  textAlign(CENTER);
  text("ミス: " + missCount, width / 2, 120);

  textAlign(RIGHT);
  text("Time: " + remaining, width - 40, 120);
  }

  // 五線
  image(clefImg, 40, startY - 45, 65, 160);
  drawStaff();
  drawNote();

  // 鍵盤
  for (let k of keys) {
    fill(255);
    stroke(0);
    rect(k.x, whiteY, keyWidth, 120);
  }
  
  // 黒鍵
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

 // 高いド#
 rect(
   keys[0].x + 7.72 * keyWidth,
   blackY,
   keyWidth * 0.6,
   80
 );

  // 結果
  textSize(30);
  fill(0);
  textAlign(CENTER);
  textSize(42);

  if (resultText === "せいかい！") {
    fill(0, 150, 0);
  } else {
    fill(200, 0, 0);
  }

  text(resultText, width / 2, 180);

  textAlign(CENTER);

  // ⭐スタート前
  if (!started) {
    textSize(30);
    text("クリックでスタート", centerX, 560);
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

  ellipse(200, noteY, 20, 15);

  // ラ
  if (currentNote === "A") {
    line(185, noteY, 215, noteY);
  }

  // シ
  if (currentNote === "B") {
    line(185, noteY + gap * 0.5, 215, noteY + gap * 0.5);
  }

  // 上のド
  if (currentNote === "HighC") {
    line(185, noteY + gap, 215, noteY + gap);
    line(185, noteY, 215, noteY);
  }
}

function newQuestion() {
  let current = random(noteData);
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

  // 鍵盤判定
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
      osc.amp(0, 0.3);

      // 正解判定
      if (k.name === currentNote) {
        resultText = "せいかい！";
        correctCount++;
      } else {
        resultText = "ちがう！";
        missCount++;
      }

      // 次の問題
      newQuestion();

      return;
    }
  }
}
