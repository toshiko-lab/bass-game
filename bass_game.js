let scoreYes = 0;
let scoreNo = 0;
let timer = 60;
let lastTime = 0;
let synth;

// ヘ音記号の範囲（F2〜F3の14音＝白鍵8＋黒鍵6）
// 先生の理想の並び：ド(C)から始まり、2オクターブへ
let notes = [
  { name: "C2", y: 280, freq: 65.41, type: "white" }, { name: "C#2", y: 0, freq: 69.30, type: "black" },
  { name: "D2", y: 260, freq: 73.42, type: "white" }, { name: "D#2", y: 0, freq: 77.78, type: "black" },
  { name: "E2", y: 240, freq: 82.41, type: "white" },
  { name: "F2", y: 220, freq: 87.31, type: "white" }, { name: "F#2", y: 0, freq: 92.50, type: "black" },
  { name: "G2", y: 200, freq: 98.00, type: "white" }, { name: "G#2", y: 0, freq: 103.83, type: "black" },
  { name: "A2", y: 180, freq: 110.00, type: "white" }, { name: "A#2", y: 0, freq: 116.54, type: "black" },
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
  // 白鍵のインデックス（0, 2, 4, 5, 7, 9, 11, 12）からランダムに選ぶ
  let whiteKeys = [0, 2, 4, 5, 7, 9, 11, 12];
  currentNoteIndex = whiteKeys[floor(random(whiteKeys.length))];
}

function draw() {
  background(255);
  if (millis() - lastTime > 1000 && timer > 0) { timer--; lastTime = millis(); }

  // UIをシンプルに
  textSize(30); fill(0);
  text("Time " + timer + "    Yes " + scoreYes + "    No " + scoreNo, 50, 50);

  // 五線譜（位置を固定）
  stroke(0); strokeWeight(2);
  for (let i = 0; i < 5; i++) line(100, 200 + i * 20, 700, 200 + i * 20);
  
  // ヘ音記号（サイズと位置を調整）
  textSize(80); noStroke(); fill(0);
  text("𝄢", 20, 250);

  // 全音符（指定位置へ）
  stroke(0); strokeWeight(2); noFill();
  ellipse(400, notes[currentNoteIndex].y, 25, 20);
  
  // 2オクターブ鍵盤描画
  let w = 50;
  for (let i = 0; i < 13; i++) {
    stroke(0); fill(notes[i].type === "white" ? 255 : 0);
    rect(50 + i * w, 400, w, notes[i].type === "white" ? 150 : 90);
  }
}

function mousePressed() {
  if (getAudioContext().state !== 'running') getAudioContext().resume();
  if (mouseY > 400) {
    let keyIndex = floor((mouseX - 50) / 50);
    if (keyIndex >= 0 && keyIndex < 13) {
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
