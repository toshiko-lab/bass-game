let scoreYes = 0;
let scoreNo = 0;
let synth;
let currentNoteIndex = 0;

// 先生の2オクターブ鍵盤（14鍵盤）をそのまま活かします
// 音域をヘ音記号の範囲に固定
const notes = [
  { note: "F2", y: 220, freq: 174.61 }, { note: "G2", y: 200, freq: 196.00 },
  { note: "A2", y: 180, freq: 220.00 }, { note: "B2", y: 160, freq: 246.94 },
  { note: "C3", y: 140, freq: 261.63 }, { note: "D3", y: 120, freq: 293.66 },
  { note: "E3", y: 100, freq: 329.63 }, { note: "F3", y: 80,  freq: 349.23 },
  { note: "G3", y: 60,  freq: 392.00 }, { note: "A3", y: 40,  freq: 440.00 },
  { note: "B3", y: 20,  freq: 493.88 }, { note: "C4", y: 0,   freq: 523.25 }
];

function setup() {
  createCanvas(800, 600);
  synth = new p5.Oscillator('sine');
  synth.start();
  synth.amp(0);
  newQuestion();
}

function newQuestion() {
  currentNoteIndex = floor(random(8)); // 第1線〜第4間の範囲
}

function draw() {
  background(255);
  // 五線譜（定位置）
  stroke(0); strokeWeight(2);
  for (let i = 0; i < 5; i++) line(100, 200 + i * 20, 700, 200 + i * 20);
  
  // ヘ音記号（第4線を挟む位置）
  textSize(80); noStroke(); fill(0);
  text("𝄢", 25, 220);

  // 全音符（五線譜内）
  stroke(0); strokeWeight(2); noFill();
  ellipse(400, notes[currentNoteIndex].y + 20, 25, 20);
  
  // 先生の2オクターブ鍵盤を描画
  // 白鍵14個の描画と黒鍵の配置（先生の作られたものを反映）
  for (let i = 0; i < 14; i++) {
    stroke(0); fill(255);
    rect(50 + i * 50, 400, 50, 150);
  }
  // 黒鍵配置
  fill(0);
  let blackKeys = [1, 3, 6, 8, 10];
  for(let b of blackKeys) rect(50 + b * 50 - 15, 400, 30, 90);
}

function mousePressed() {
  if (getAudioContext().state !== 'running') getAudioContext().resume();
  if (mouseY > 400) {
    let i = floor((mouseX - 50) / 50);
    if (i >= 0 && i < 14) {
      synth.freq(notes[i].freq);
      synth.amp(0.3, 0.05);
      setTimeout(() => { synth.amp(0, 0.05); }, 200);
      if (i === currentNoteIndex) scoreYes++; else scoreNo++;
      newQuestion();
    }
  }
}
