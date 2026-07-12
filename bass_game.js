let gameState = "START";
let currentNote = "";
let scoreCorrect = 0;
let scoreWrong = 0;
let timer = 60;
let synth;
let keyboardImg;

function preload() {
  keyboardImg = loadImage('keyboard.svg');
}

const config = {
  noteData: [
    { name: "G", y: 240 }, // 第1線の下
    { name: "A", y: 220 }, // 第1線
    { name: "B", y: 200 }, // 第2線
    { name: "C", y: 180 }, // 第3線
    { name: "D", y: 160 }, // 第4線
    { name: "E", y: 140 }, // 第5線
    { name: "F", y: 120 }, // 第5線の上
    { name: "G_high", y: 100 }
  ]
};

function setup() {
  createCanvas(800, 600);
  synth = new p5.Oscillator('sine');
  synth.start();
  newQuestion();
}

function draw() {
  background(255); // 白背景に統一
  if (gameState === "PLAYING") {
    // 五線譜（Y座標を調整）
    stroke(0); strokeWeight(2);
    let topLineY = 200;
    for (let i = 0; i < 5; i++) line(150, topLineY + i * 20, 650, topLineY + i * 20);
    
    // ヘ音記号（テキスト描画を修正）
    textSize(70); fill(0); noStroke();
    text("𝄢", 100, 215); // 第4間に頭が来る位置へ調整
    
    // 音符（configのyに合わせて描画）
    let noteObj = config.noteData.find(n => n.name === currentNote);
    if (noteObj) {
      ellipse(400, noteObj.y + 40, 25, 20);
    }
    
    // 鍵盤画像（HTMLではなくここで描画）
    image(keyboardImg, 100, 400, 600, 150);
  }
}

function newQuestion() {
  currentNote = config.noteData[floor(random(config.noteData.length))].name;
}

function mousePressed() {
  if (getAudioContext().state !== 'running') getAudioContext().resume();
  if (gameState === "START") gameState = "PLAYING";
}
