let scoreYes = 0;
let scoreNo = 0;
let currentNoteIndex = 0;

// 【先生の主軸】正しい音域の定義（F2〜A3）
const notes = [
  { note: "F2", y: 220, freq: 174.61 }, { note: "G2", y: 200, freq: 196.00 },
  { note: "A2", y: 180, freq: 220.00 }, { note: "B2", y: 160, freq: 246.94 },
  { note: "C3", y: 140, freq: 261.63 }, { note: "D3", y: 120, freq: 293.66 },
  { note: "E3", y: 100, freq: 329.63 }, { note: "F3", y: 80,  freq: 349.23 },
  { note: "G3", y: 60,  freq: 392.00 }, { note: "A3", y: 40,  freq: 440.00 }
];

function setup() {
  createCanvas(800, 600);
}

function draw() {
  background(255);
  
  // 五線譜
  stroke(0); strokeWeight(2);
  for (let i = 0; i < 5; i++) line(100, 200 + i * 20, 700, 200 + i * 20);
  
  // ヘ音記号
  textSize(80); noStroke(); fill(0);
  text("𝄢", 25, 220);

  // 全音符
  stroke(0); strokeWeight(2); noFill();
  ellipse(400, notes[currentNoteIndex].y, 25, 20);

  // 【鍵盤：先生の設計を固定】
  // 白鍵 14個の固定位置
  stroke(0); fill(255);
  for(let i=0; i<14; i++) rect(50 + i * 50, 400, 50, 150);
  
  // 黒鍵の固定位置（2つ・3つグループ）
  fill(0);
  let blacks = [1, 3, 6, 8, 10];
  for(let b of blacks) rect(50 + b * 50 - 15, 400, 30, 90);
}
