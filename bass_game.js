let scoreYes = 0;
let scoreNo = 0;
let timer = 60;
let lastTime = 0;
let synth;

// 先生の定義：ヘ音記号（ソ〜ソの範囲）に合わせて音を設定
// 鍵盤をクリックした時の音が正しくなるよう調整します
let notes = [
  { note: "F2", freq: 87.31 }, { note: "G2", freq: 98.00 },
  { note: "A2", freq: 110.00 }, { note: "B2", freq: 123.47 },
  { note: "C3", freq: 130.81 }, { note: "D3", freq: 146.83 },
  { note: "E3", freq: 164.81 }, { note: "F3", freq: 174.61 },
  { note: "G3", freq: 196.00 }, { note: "A3", freq: 220.00 }
];

function setup() {
  createCanvas(800, 600);
  synth = new p5.Oscillator('sine');
  synth.start();
  synth.amp(0);
}

function draw() {
  background(255);
  // UI：ヘ音記号と五線譜
  textSize(120); text("𝄢", 20, 260); // 第3線を挟む位置に調整
  stroke(0); strokeWeight(2);
  for (let i = 0; i < 5; i++) line(100, 180 + i * 20, 700, 180 + i * 20);
  
  // 鍵盤（白鍵10個分：ファ〜ラ）
  for (let i = 0; i < 10; i++) {
    stroke(0); fill(255);
    rect(50 + i * 70, 400, 70, 150);
  }
}

function mousePressed() {
  if (getAudioContext().state !== 'running') getAudioContext().resume();
  if (mouseY > 400) {
    let index = floor((mouseX - 50) / 70);
    if (index >= 0 && index < notes.length) {
      synth.freq(notes[index].freq);
      synth.amp(0.3, 0.05);
      setTimeout(() => { synth.amp(0, 0.05); }, 200);
    }
  }
}
