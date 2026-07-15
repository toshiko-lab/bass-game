let scoreYes = 0;
let scoreNo = 0;
let synth;
let currentNoteIndex = 0;

// 先生の音域：ファ〜ラ（10音）
// y: 譜表上の位置(220=第1線), freq: 正しい周波数
const notes = [
  { note: "F2", y: 230, freq: 174.61 }, { note: "G2", y: 210, freq: 196.00 },
  { note: "A2", y: 190, freq: 220.00 }, { note: "B2", y: 170, freq: 246.94 },
  { note: "C3", y: 150, freq: 261.63 }, { note: "D3", y: 130, freq: 293.66 },
  { note: "E3", y: 110, freq: 329.63 }, { note: "F3", y: 90,  freq: 349.23 },
  { note: "G3", y: 70,  freq: 392.00 }, { note: "A3", y: 50,  freq: 440.00 }
];

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
  // 五線譜（定位置）
  stroke(0); strokeWeight(2);
  for (let i = 0; i < 5; i++) line(100, 210 + i * 20, 700, 210 + i * 20);
  
  // ヘ音記号（第4線を挟む位置へ固定）
  textSize(100); noStroke(); fill(0);
  text("𝄢", 25, 235);

  // 音符
  stroke(0); strokeWeight(2); noFill();
  ellipse(400, notes[currentNoteIndex].y, 25, 20);
  
  // 2オクターブ鍵盤（白鍵・黒鍵）
  for (let i = 0; i < 10; i++) {
    stroke(0); fill(255);
    rect(50 + i * 70, 400, 70, 150);
  }
  // 黒鍵配置
  fill(0);
  rect(85, 400, 40, 90); rect(155, 400, 40, 90); 
  rect(295, 400, 40, 90); rect(365, 400, 40, 90); rect(435, 400, 40, 90);
}

function mousePressed() {
  if (getAudioContext().state !== 'running') getAudioContext().resume();
  if (mouseY > 400) {
    let i = floor((mouseX - 50) / 70);
    if (i >= 0 && i < 10) {
      synth.freq(notes[i].freq);
      synth.amp(0.3, 0.05);
      setTimeout(() => { synth.amp(0, 0.05); }, 200);
      if (i === currentNoteIndex) scoreYes++; else scoreNo++;
      newQuestion();
    }
  }
}
