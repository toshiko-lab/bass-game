let scoreYes = 0;
let scoreNo = 0;
let timer = 60;
let lastTime = 0;
let synth;

// 先生のヘ音記号の音域（ソ〜ソ）の14音（黒鍵含）
let notes = [
  { name: "C2", y: 280, freq: 65.41, type: "white" }, { name: "C#2", x: 40, freq: 69.30, type: "black" },
  { name: "D2", y: 260, freq: 73.42, type: "white" }, { name: "D#2", x: 90, freq: 77.78, type: "black" },
  { name: "E2", y: 240, freq: 82.41, type: "white" },
  { name: "F2", y: 220, freq: 87.31, type: "white" }, { name: "F#2", x: 190, freq: 92.50, type: "black" },
  { name: "G2", y: 200, freq: 98.00, type: "white" }, { name: "G#2", x: 240, freq: 103.83, type: "black" },
  { name: "A2", y: 180, freq: 110.00, type: "white" }, { name: "A#2", x: 290, freq: 116.54, type: "black" },
  { name: "B2", y: 160, freq: 123.47, type: "white" },
  { name: "C3", y: 140, freq: 130.81, type: "white" }
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
  let whiteKeys = [0, 2, 4, 5, 7, 9, 11, 12];
  currentNoteIndex = whiteKeys[floor(random(whiteKeys.length))];
}

function draw() {
  background(255);
  if (millis() - lastTime > 1000 && timer > 0) { timer--; lastTime = millis(); }

  textSize(24); fill(0);
  text("Time " + timer + "   Yes " + scoreYes + "   No " + scoreNo, 50, 40);

  // 五線譜（位置調整）
  stroke(0); strokeWeight(2);
  for (let i = 0; i < 5; i++) line(100, 140 + i * 20, 700, 140 + i * 20);
  
  // ヘ音記号（サイズと位置を第2線〜第5線に接触するように調整）
  textSize(110); noStroke(); fill(0);
  text("𝄢", 25, 230);

  // 全音符
  stroke(0); strokeWeight(2); noFill();
  ellipse(400, notes[currentNoteIndex].y, 25, 20);
  
  // ピアノ鍵盤（白鍵8、黒鍵6の並び）
  let whiteW = 70;
  for (let i = 0; i < 8; i++) {
    stroke(0); fill(255);
    rect(50 + i * whiteW, 400, whiteW, 150);
  }
  fill(0);
  rect(50 + whiteW - 20, 400, 40, 90); rect(50 + 2 * whiteW - 20, 400, 40, 90);
  rect(50 + 4 * whiteW - 20, 400, 40, 90); rect(50 + 5 * whiteW - 20, 400, 40, 90); rect(50 + 6 * whiteW - 20, 400, 40, 90);
}

function mousePressed() {
  if (getAudioContext().state !== 'running') getAudioContext().resume();
  if (mouseY > 400) {
    // 簡易的なクリック判定
    let keyIndex = floor((mouseX - 50) / 70);
    let freqs = [65.41, 73.42, 82.41, 87.31, 98.00, 110.00, 123.47, 130.81];
    playTone(freqs[keyIndex]);
    if (keyIndex === [0, 2, 4, 5, 7, 9, 11, 12].indexOf(currentNoteIndex)) scoreYes++; else scoreNo++;
    newQuestion();
  }
}

function playTone(freq) {
  synth.freq(freq); synth.amp(0.3, 0.02);
  setTimeout(() => { synth.amp(0, 0.05); }, 200);
}
