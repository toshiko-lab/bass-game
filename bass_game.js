// 音符のデータ（ここが config.js の代わりです）
const config = {
  timeLimit: 60,
  noteData: [
    { name: "G", y: 220 },      // 第1線の下
    { name: "A", y: 200 },      // 第1線
    { name: "B", y: 180 },      // 第2線
    { name: "C", y: 160 },      // 第3線
    { name: "D", y: 140 },      // 第4線
    { name: "E", y: 120 },      // 第5線
    { name: "F", y: 100 },      // 第5線の上
    { name: "G_high", y: 80 }   // 第5線よりさらに上
  ]
};
let gameState = "START";
let currentNote = "";
let resultMessage = "";
let scoreCorrect = 0;
let scoreWrong = 0;
let timer = 60;
let lastSeconds = 0;
let synth;
let keyboardImg; // 画像用

function preload() {
  keyboardImg = loadImage('keyboard.svg'); // 画像を読み込む
}

const whiteKeysData = [
  { note: "G", x: 100 }, { note: "A", x: 160 }, { note: "B", x: 220 },
  { note: "C", x: 280 }, { note: "D", x: 340 }, { note: "E", x: 400 },
  { note: "F", x: 460 }, { note: "G_high", x: 520 }, { note: "A_high", x: 580 }
];

const blackKeysData = [
  { name: "G#", x: 142 }, { name: "A#", x: 202 }, { name: "C#", x: 322 },
  { name: "D#", x: 382 }, { name: "F#", x: 502 }, { name: "G#2", x: 562 }
];

function setup() {
  createCanvas(800, 600);
  synth = new p5.Oscillator('sine');
  synth.amp(0);
  synth.start();
  newQuestion();
}

function draw() {
  background(220);
  if (gameState === "START") {
    textAlign(CENTER, CENTER); textSize(40); fill(0);
    text("クリックしてスタート", width / 2, height / 2);
  } else if (gameState === "PLAYING") {
    if (second() !== lastSeconds) {
      if (timer > 0) timer--; else gameState = "END";
      lastSeconds = second();
    }

    // 1. 五線譜描画
    stroke(0); strokeWeight(2);
    let baseLineY = 160; 
    for (let i = 0; i < 5; i++) {
      line(100, baseLineY + i * 20, width - 100, baseLineY + i * 20);
    }
    
   // 2. ヘ音記号の描画
    push();
    textAlign(LEFT, TOP);
    textSize(85); // 60から85へ大きくしました
    fill(0);
    text("𝄢", 110, baseLineY - 30); // 位置も少し微調整
    pop();

    // 3. 音符描画
    let noteObj = config.noteData.find(n => n.name === currentNote);
    if (noteObj) {
      noFill(); stroke(0); strokeWeight(3);
      ellipse(width / 2, noteObj.y, 28, 18);
    }
    
    // 4. 鍵盤画像の描画
    image(keyboardImg, 100, 430, 600, 140);

    // 5. テキスト表示
    textAlign(LEFT, TOP); textSize(24); fill(0);
    text("Time: " + timer, 50, 40);
    text("正解: " + scoreCorrect, 200, 40);
    text("まちがい: " + scoreWrong, 350, 40);

  } else if (gameState === "END") {
    textAlign(CENTER, CENTER); textSize(40); fill(250, 0, 0);
    text("終了！ 正解数: " + scoreCorrect, width / 2, height / 2);
  }
}

function newQuestion() {
  currentNote = config.noteData[floor(random(config.noteData.length))].name;
}

function playTone(noteName) {
  function playTone(noteName) {
  let frequencies = {
    "G": 196.00,      // 低いソ
    "A": 220.00,      // 低いラ
    "B": 246.94,      // 低いシ
    "C": 261.63,      // ド
    "D": 293.66,      // レ
    "E": 329.63,      // ミ
    "F": 349.23,      // ファ
    "G_high": 392.00  // 高いソ
  };
  synth.freq(frequencies[noteName] || 440);
  synth.amp(0.3, 0.05);
  setTimeout(() => { synth.amp(0, 0.1); }, 200);
}

function mousePressed() {
  if (getAudioContext().state !== 'running') getAudioContext().resume();
  if (gameState === "PLAYING") {
    // クリック判定（以前の座標のままです）
    for (let k of whiteKeysData) {
      if (mouseX > k.x && mouseX < k.x + 60 && mouseY > 430 && mouseY < 570) {
        playTone(k.note);
        if (k.note === currentNote) { scoreCorrect++; } else { scoreWrong++; }
        newQuestion(); break;
      }
    }
  } else if (gameState === "START" || gameState === "END") { gameState = "PLAYING"; timer = 60; }
}
