let scoreYes = 0;
let scoreNo = 0;
let synth;
let currentNoteIndex = 0;

// 【先生の主軸：2オクターブの正しい鍵盤配置と音域】
// 0:ド, 1:ド#, 2:レ, 3:レ#, 4:ミ, 5:ファ, 6:ファ#, 7:ソ, 8:ソ#, 9:ラ, 10:ラ#, 11:シ, 12:ド...
const keys = [
  { note: "C2", freq: 65.41, type: "white" }, { note: "C#2", freq: 69.30, type: "black" },
  { note: "D2", freq: 73.42, type: "white" }, { note: "D#2", freq: 77.78, type: "black" },
  { note: "E2", freq: 82.41, type: "white" },
  { note: "F2", freq: 87.31, type: "white" }, { note: "F#2", freq: 92.50, type: "black" },
  { note: "G2", freq: 98.00, type: "white" }, { note: "G#2", freq: 103.83, type: "black" },
  { note: "A2", freq: 110.00, type: "white" }, { note: "A#2", freq: 116.54, type: "black" },
  { note: "B2", freq: 123.47, type: "white" },
  { note: "C3", freq: 130.81, type: "white" }, { note: "C#3", freq: 138.59, type: "black" },
  { note: "D3", freq: 146.83, type: "white" }
];

// 音符のY座標（第1線ソ=220, 第4間ソ=100を基準に調整）
const noteYPositions = [220, 210, 200, 190, 180, 170, 160, 150, 140, 130];

function setup() {
  createCanvas(800, 600);
  synth = new p5.Oscillator('sine');
  synth.start();
  synth.amp(0);
}

function draw() {
  background(255);
  // 五線譜・ヘ音記号（第4線を挟む位置）
  stroke(0); strokeWeight(2);
  for (let i = 0; i < 5; i++) line(100, 200 + i * 20, 700, 200 + i * 20);
  textSize(80); text("𝄢", 25, 230);

  // 全音符（透過）
  stroke(0); noFill();
  ellipse(400, noteYPositions[currentNoteIndex], 25, 20);

  // 鍵盤描画（先生の2オクターブ構成）
  let whiteCount = 0;
  for (let i = 0; i < 15; i++) {
    if (keys[i].type === "white") {
      stroke(0); fill(255);
      rect(50 + whiteCount * 50, 400, 50, 150);
      whiteCount++;
    }
  }
  whiteCount = 0;
  for (let i = 0; i < 15; i++) {
    if (keys[i].type === "white") whiteCount++;
    else {
      fill(0);
      rect(50 + whiteCount * 50 - 15, 400, 30, 90);
    }
  }
}

function mousePressed() {
  if (getAudioContext().state !== 'running') getAudioContext().resume();
  // 鍵盤判定など
}
