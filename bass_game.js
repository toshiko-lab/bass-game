let scoreYes = 0;
let scoreNo = 0;
let timer = 60;
let lastTime = 0;
let synth;

// 10音（ファ・ソ・ラ・シ・ド・レ・ミ・ファ・ソ・ラ）
// y座標: 第1線(G2)から第4間(G3)まで20ずつ刻んでいます
let noteSettings = [
  { note: "F2", y: 260, freq: 174.61, type: "white" },
  { note: "G2", y: 240, freq: 196.00, type: "white" },
  { note: "A2", y: 220, freq: 220.00, type: "white" },
  { note: "B2", y: 200, freq: 246.94, type: "white" },
  { note: "C3", y: 180, freq: 261.63, type: "white" },
  { note: "D3", y: 160, freq: 293.66, type: "white" },
  { note: "E3", y: 140, freq: 329.63, type: "white" },
  { note: "F3", y: 120, freq: 349.23, type: "white" },
  { note: "G3", y: 100, freq: 392.00, type: "white" },
  { note: "A3", y: 80,  freq: 440.00, type: "white" }
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
  currentNoteIndex = floor(random(noteSettings.length));
}

function draw() {
  background(255);
  if (millis() - lastTime > 1000 && timer > 0) { timer--; lastTime = millis(); }
  
  textSize(30); fill(0);
  text("Time " + timer + "   Yes " + scoreYes + "   No " + scoreNo, 50, 40);

  // 五線譜
  stroke(0); strokeWeight(2);
  for (let i = 0; i < 5; i++) line(100, 160 + i * 20, 700, 160 + i * 20);
  
  // ヘ音記号（第4線を挟む位置）
  textSize(80); noStroke(); fill(0);
  text("𝄢", 25, 225);

  // 全音符
  stroke(0); strokeWeight(2); noFill();
  // 一旦、数字を直接入れて音符がどこに出るか確認します
  ellipse(400, 220, 25, 20);
  
  // 鍵盤（白鍵と黒鍵）
  let w = 70;
  for (let i = 0; i < 10; i++) {
    stroke(0); fill(255);
    rect(50 + i * w, 400, w, 150);
  }
  // 黒鍵
  fill(0);
  rect(50 + w - 20, 400, 40, 90); rect(50 + 2 * w - 20, 400, 40, 90);
  rect(50 + 4 * w - 20, 400, 40, 90); rect(50 + 5 * w - 20, 400, 40, 90); rect(50 + 6 * w - 20, 400, 40, 90);
}

function mousePressed() {
  if (getAudioContext().state !== 'running') getAudioContext().resume();
  if (mouseY > 400) {
    let index = floor((mouseX - 50) / 70);
    if (index >= 0 && index < 10) {
      synth.freq(noteSettings[index].freq);
      synth.amp(0.3, 0.05);
      setTimeout(() => { synth.amp(0, 0.05); }, 200);
      if (index === currentNoteIndex) scoreYes++; else scoreNo++;
      newQuestion();
    }
  }
}
