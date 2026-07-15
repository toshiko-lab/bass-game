let scoreYes = 0;
let scoreNo = 0;
let timer = 60;
let lastTime = 0;
let synth;

// ヘ音記号の範囲に合わせた14鍵盤（C2〜C4想定）
// y: 譜表上の座標, freq: 周波数, name: 音名
let notes = [
  { name: "C2", y: 320, freq: 65.41, isBlack: false }, { name: "C#2", y: 320, freq: 69.30, isBlack: true },
  { name: "D2", y: 300, freq: 73.42, isBlack: false }, { name: "D#2", y: 300, freq: 77.78, isBlack: true },
  { name: "E2", y: 280, freq: 82.41, isBlack: false },
  { name: "F2", y: 260, freq: 87.31, isBlack: false }, { name: "F#2", y: 260, freq: 92.50, isBlack: true },
  { name: "G2", y: 240, freq: 98.00, isBlack: false }, { name: "G#2", y: 240, freq: 103.83, isBlack: true },
  { name: "A2", y: 220, freq: 110.00, isBlack: false }, { name: "A#2", y: 220, freq: 116.54, isBlack: true },
  { name: "B2", y: 200, freq: 123.47, isBlack: false },
  { name: "C3", y: 180, freq: 130.81, isBlack: false }
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

function draw() {
  background(255);
  // タイマー
  if (millis() - lastTime > 1000 && timer > 0) { timer--; lastTime = millis(); }
  textSize(24); fill(0);
  text("Time: " + timer + " | Yes: " + scoreYes + " | No: " + scoreNo, 50, 50);

  // 五線譜（第1線がソ=240, 第4間がソ=100付近）
  stroke(0); strokeWeight(2);
  for (let i = 0; i < 5; i++) line(100, 200 + i * 20, 700, 200 + i * 20);
  
  // ヘ音記号
  textSize(50); noStroke(); fill(0);
  text("𝄢", 30, 230);

  // 全音符（透過）
  stroke(0); strokeWeight(2); noFill();
  ellipse(400, notes[currentNoteIndex].y, 25, 20);
  
  // 鍵盤描画
  let w = 50;
  for (let i = 0; i < 14; i++) {
    stroke(0); fill(notes[i].isBlack ? 0 : 255);
    rect(50 + i * w, 400, w, 150);
  }
}

function mousePressed() {
  if (getAudioContext().state !== 'running') getAudioContext().resume();
  if (mouseY > 400) {
    let keyIndex = floor((mouseX - 50) / 50);
    if (keyIndex >= 0 && keyIndex < 14) {
      playTone(notes[keyIndex].freq);
      if (keyIndex === currentNoteIndex) scoreYes++; else scoreNo++;
      newQuestion();
    }
  }
}

function playTone(freq) {
  synth.freq(freq); synth.amp(0.3, 0.02);
  setTimeout(() => { synth.amp(0, 0.05); }, 200);
}
