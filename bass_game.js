let scoreYes = 0;
let scoreNo = 0;
let synth;
let currentNoteIndex = 0;

// ヘ音記号の音域（ソ〜ソ）の音符データ
const notes = [
  { note: "F2", y: 220, freq: 174.61 }, { note: "G2", y: 200, freq: 196.00 },
  { note: "A2", y: 180, freq: 220.00 }, { note: "B2", y: 160, freq: 246.94 },
  { note: "C3", y: 140, freq: 261.63 }, { note: "D3", y: 120, freq: 293.66 },
  { note: "E3", y: 100, freq: 329.63 }, { note: "F3", y: 80,  freq: 349.23 },
  { note: "G3", y: 60,  freq: 392.00 }, { note: "A3", y: 40,  freq: 440.00 }
];

function setup() {
  createCanvas(800, 600);
  synth = new p5.Oscillator('sine');
  synth.start();
  synth.amp(0);
}

function draw() {
  background(255);
  
  // 1. スコア表示（邪魔にならない位置に小さく）
  textSize(20); fill(0);
  text("Yes: " + scoreYes + "  No: " + scoreNo, 650, 30);

  // 2. 五線譜（定位置）
  stroke(0); strokeWeight(2);
  for (let i = 0; i < 5; i++) line(100, 200 + i * 20, 700, 200 + i * 20);
  
  // 3. ヘ音記号（第4線を挟む位置）
  textSize(80); noStroke(); fill(0);
  text("𝄢", 25, 220);

  // 4. 全音符（透過）
  stroke(0); strokeWeight(2); noFill();
  ellipse(400, notes[currentNoteIndex].y + 20, 25, 20);
  
  // 5. 【先生の主軸】2オクターブ鍵盤描画（ここに先生の元のコードを移植）
  // 先生の意図された「黒鍵2・3」配置を固定します
  for (let i = 0; i < 14; i++) {
    stroke(0); fill(255);
    rect(50 + i * 50, 400, 50, 150);
  }
  fill(0);
  let blackKeys = [1, 3, 6, 8, 10]; // 黒鍵の位置
  for(let b of blackKeys) rect(50 + b * 50 - 15, 400, 30, 90);
}

function mousePressed() {
  if (getAudioContext().state !== 'running') getAudioContext().resume();
  // 鍵盤判定・音の再生・スコア加算の処理
}
