let scoreYes = 0;
let scoreNo = 0;
let timer = 60;
let lastTime = 0;
let synth;

// 14音（2オクターブ）の設定
let notes = [
  { name: "C2", y: 320, freq: 65.41 }, { name: "D2", y: 300, freq: 73.42 },
  { name: "E2", y: 280, freq: 82.41 }, { name: "F2", y: 260, freq: 87.31 },
  { name: "G2", y: 240, freq: 98.00 }, { name: "A2", y: 220, freq: 110.00 },
  { name: "B2", y: 200, freq: 123.47 }, { name: "C3", y: 180, freq: 130.81 },
  { name: "D3", y: 160, freq: 146.83 }, { name: "E3", y: 140, freq: 164.81 },
  { name: "F3", y: 120, freq: 174.61 }, { name: "G3", y: 100, freq: 196.00 },
  { name: "A3", y: 80,  freq: 220.00 }, { name: "B3", y: 60,  freq: 246.94 }
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
  if (millis() - lastTime > 1000 && timer > 0) { timer--; lastTime = millis(); }
  
  textSize(30); fill(0);
  text("Time: " + timer + "   Yes: " + scoreYes + "   No: " + scoreNo, 50, 50);

  // 五線譜（位置を中央へ）
  stroke(0); strokeWeight(2);
  for (let i = 0; i < 5; i++) line(100, 200 + i * 20, 700, 200 + i * 20);
  
  textSize(50); noStroke(); fill(0);
  text("𝄢", 30, 235);

  // 全音符（透過）
  stroke(0); strokeWeight(2); noFill();
  ellipse(400, notes[currentNoteIndex].y, 25, 20);
  
  // 2オクターブ（14白鍵）の描画
  let keyWidth = 50;
  for (let i = 0; i < 14; i++) {
    stroke(0); fill(255);
    rect(50 + i * keyWidth, 400, keyWidth, 150);
  }
}

function playTone(freq) {
  synth.freq(freq); synth.amp(0.3, 0.02);
  setTimeout(() => { synth.amp(0, 0.05); }, 200);
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
