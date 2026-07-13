let scoreYes = 0;
let scoreNo = 0;
let timer = 60;
let lastTime = 0;
let synth;

let notes = [
  { name: "G2", y: 220, freq: 98.0, isBlack: false },
  { name: "A2", y: 200, freq: 110.0, isBlack: false },
  { name: "B2", y: 180, freq: 123.5, isBlack: false },
  { name: "C3", y: 160, freq: 130.8, isBlack: false },
  { name: "D3", y: 140, freq: 146.8, isBlack: false },
  { name: "E3", y: 120, freq: 164.8, isBlack: false },
  { name: "F3", y: 100, freq: 174.6, isBlack: false },
  { name: "G3", y: 80,  freq: 196.0, isBlack: false }
];
let currentNoteIndex = 0;

function setup() {
  createCanvas(800, 600);
  synth = new p5.Oscillator('sine');
  synth.start();
  synth.amp(0);
  newQuestion();
}

function newQuestion() {
  currentNoteIndex = floor(random(notes.length));
}

/ 鍵盤描画部分（これをdraw()関数の最後に入れ替えてください）
function draw() {
  background(255);
  // タイマーとスコア
  if (millis() - lastTime > 1000 && timer > 0) { timer--; lastTime = millis(); }
  textSize(30); fill(0);
  text("Time: " + timer + "   Yes: " + scoreYes + "   No: " + scoreNo, 50, 50);

  // 五線譜
  stroke(0); strokeWeight(2);
  for (let i = 0; i < 5; i++) line(100, 200 + i * 20, 700, 200 + i * 20);
  text("𝄢", 30, 230); // ヘ音記号

  // 全音符
  stroke(0); strokeWeight(2); noFill();
  ellipse(400, notes[currentNoteIndex].y, 25, 20);
  
  // 鍵盤（ピアノの配置）
  for (let i = 0; i < 8; i++) {
    stroke(0); fill(255);
    rect(50 + i * 85, 400, 85, 150); // 白鍵
  }
  // 黒鍵（ピアノの2つ・3つの並びに修正）
  fill(0);
  // 1つ目のグループ(2つ)
  rect(50 + 85 - 20, 400, 40, 90); rect(50 + 2*85 - 20, 400, 40, 90);
  // 2つ目のグループ(3つ)
  rect(50 + 4*85 - 20, 400, 40, 90); rect(50 + 5*85 - 20, 400, 40, 90); rect(50 + 6*85 - 20, 400, 40, 90);
}
function playTone(freq) {
  synth.freq(freq); synth.amp(0.3, 0.02);
  setTimeout(() => { synth.amp(0, 0.05); }, 200);
}

function mousePressed() {
  if (getAudioContext().state !== 'running') getAudioContext().resume();
  if (mouseY > 400) {
    let keyIndex = floor((mouseX - 50) / 85);
    if (keyIndex >= 0 && keyIndex < 8) {
      playTone(notes[keyIndex].freq);
      if (keyIndex === currentNoteIndex) scoreYes++; else scoreNo++;
      newQuestion();
    }
  }
}
